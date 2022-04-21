import { Subscription } from 'rxjs';
import { IMusic } from 'src/app/interfaces/IMusic';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { newMusic } from 'src/app/common/factories';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { PlayerService } from 'src/app/services/player/player.service';

@Component({
  selector: 'app-list-music',
  templateUrl: './list-music.component.html',
  styleUrls: ['./list-music.component.scss']
})
export class ListMusicComponent implements OnInit, OnDestroy {

  bannerImage = ''
  bannerText = ''

  songs: IMusic[] = []
  currentSong: IMusic = newMusic()
  playIcon = faPlay
  title = ''

  subscriptions: Subscription[] = []

  constructor(
    private activedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.getSongs()
    this.getCurrentSong()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  getSongs() {
    const subscriptions =  this.activedRoute.paramMap.subscribe(async params => {
      const type = params.get('type')
      const id = params.get('id')

      await this.getParamsPage(type, id)
    })

    this.subscriptions.push(subscriptions)
  }

  async getParamsPage(type: string, id: string) {
    if(type === 'playlist') {
      await this.getPlaylistData(id)
    } else {
      await this.getArtistData(id)
    }
  }

  async getPlaylistData(playlistId: string) {
    const playlistSongs = await this.spotifyService.getSongsByPlaylistId(playlistId);

    this.setPageData(
      playlistSongs.name,
      playlistSongs.imageUrl,
      playlistSongs.songs
    )
    this.title = 'Musicas Palylist: ' + playlistSongs.name
  }

  async getArtistData(artistId: string) {

  }

  setPageData(bannerText: string, bannerImage: string, songs: IMusic[]) {
    this.bannerImage = bannerImage;
    this.bannerText = bannerText;
    this.songs = songs;
  }

  async playSong(song: IMusic) {
    await this.spotifyService.execMusic(song.id)
    this.playerService.setCurrentSong(song)
  }

  getArtistsName(music: IMusic) {
    return music.artists.map(artist => artist.name).join(', ')
  }

  getCurrentSong() {
    const subscribe = this.playerService.currentSong.subscribe(currentSong => {
      this.currentSong = currentSong
    })

    this.subscriptions.push(subscribe)
  }
}

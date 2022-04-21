import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusic } from 'src/app/common/factories';
import { IMusic } from 'src/app/interfaces/IMusic';
import { PlayerService } from 'src/app/services/player/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  songs: IMusic[] = []
  currentSong: IMusic = newMusic()

  subscribes: Subscription[] = []

  playIcon = faPlay

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.getMusics()
    this.getCurrentSong()
  }

  ngOnDestroy(): void {
    this.subscribes.forEach(subscription => subscription.unsubscribe())
  }

  async getMusics() {
    this.songs = await this.spotifyService.getSongs()
  }

  getArtistsName(music: IMusic) {
    return music.artists.map(artist => artist.name).join(', ')
  }

  async playSong(song: IMusic) {
    await this.spotifyService.execMusic(song.id)
    this.playerService.setCurrentSong(song)
  }

  getCurrentSong() {
    const subscribe = this.playerService.currentSong.subscribe(currentSong => {
      this.currentSong = currentSong
    })

    this.subscribes.push(subscribe)
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-aside-player',
  templateUrl: './aside-player.component.html',
  styleUrls: ['./aside-player.component.scss']
})
export class AsidePlayerComponent implements OnInit {

  menuSelected = 'Home'

  playlists: IPlaylist[] = []

  homeIcon = faHome;
  searchIcon = faSearch
  artistIcon = faGuitar
  playlistIcon = faMusic

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getPlaylistFromUser()
  }

  handleChangeMenu(menuSelected: string) {
    this.menuSelected = menuSelected
    this.router.navigateByUrl('player/home')
  }

  async getPlaylistFromUser() {
    this.playlists = await this.spotifyService.getSpotifyPlaylist()
  }

  navigateToPlaylist(playlistId: string) {
    this.menuSelected = playlistId;
    this.router.navigateByUrl(`player/lista/playlist/${playlistId}` )
  }

}

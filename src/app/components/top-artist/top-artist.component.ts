import { IArtist } from './../../interfaces/IArtist';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { newArtist } from 'src/app/common/factories';

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.scss']
})
export class TopArtistComponent implements OnInit {

  topArtist: IArtist = newArtist()

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    this.getArtist()
  }

  async getArtist() {
    const artists = await this.spotifyService.getHightlightArtists(1)

    if(!!artists) {
      this.topArtist = artists.pop()
    }
  }

}

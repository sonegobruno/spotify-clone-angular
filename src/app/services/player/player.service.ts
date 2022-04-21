import { IMusic } from 'src/app/interfaces/IMusic';
import { Injectable } from '@angular/core';
import { newMusic } from 'src/app/common/factories';
import { BehaviorSubject } from 'rxjs';
import { SpotifyService } from '../spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  currentSong = new BehaviorSubject<IMusic>(newMusic())
  timerId: any = null

  constructor(
    private spotifyService: SpotifyService
  ) {
    this.getCurrentSongFromSpotify()
  }

  async getCurrentSongFromSpotify() {
    clearTimeout(this.timerId)

    const currentSong = await this.spotifyService.getCurrentSong()
    this.setCurrentSong(currentSong)

    this.timerId = setInterval(async () => {
      await this.getCurrentSongFromSpotify()
    }, 3000)
  }

  setCurrentSong(song: IMusic) {
    this.currentSong.next(song)
  }

  async previousSong() {
    await this.spotifyService.previousSong()
  }

  async nextSong() {
    await this.spotifyService.nextSong()
  }
}

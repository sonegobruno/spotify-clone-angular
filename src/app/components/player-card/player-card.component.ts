import { IMusic } from 'src/app/interfaces/IMusic';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { newMusic } from 'src/app/common/factories';
import { PlayerService } from 'src/app/services/player/player.service';
import { faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  currentSong: IMusic = newMusic();

  //icons
  backSongIcon = faStepBackward;
  nextSongIcon = faStepForward;

  //subs
  subscription: Subscription[] = []

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.getCurrentSong()
  }

  ngOnDestroy() {
    this.subscription.forEach(subscription => subscription.unsubscribe )
  }

  getCurrentSong() {
    const subscription = this.playerService.currentSong.subscribe(song => {
      this.currentSong = song;
    })

    this.subscription.push(subscription)
  }

  previousSong() {
    this.playerService.previousSong()
  }

  nextSong() {
    this.playerService.nextSong()
  }

}

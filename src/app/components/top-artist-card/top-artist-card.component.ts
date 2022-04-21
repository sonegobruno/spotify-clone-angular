import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-top-artist-card',
  templateUrl: './top-artist-card.component.html',
  styleUrls: ['./top-artist-card.component.scss']
})
export class TopArtistCardComponent implements OnInit {

  @Input()
  avatarImg = ''

  @Output()
  click = new EventEmitter<void>()

  constructor(
  ) { }

  ngOnInit(): void {
  }

  onClick() {
    this.click.emit()
  }



}

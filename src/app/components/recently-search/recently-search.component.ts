import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recently-search',
  templateUrl: './recently-search.component.html',
  styleUrls: ['./recently-search.component.scss']
})
export class RecentlySearchComponent implements OnInit {

  recentlySearchs = [
    'Top Brasil',
    'Top Global',
    'Esquenta Rock n roll',
    'Funk hits',
    'Pagodeira'
  ]

  search = ''

  constructor() { }

  ngOnInit(): void {
  }

  setSearchOfSugestion(sugestion: string) {
    this.search = sugestion
  }

  searchSong() {
    console.log(this.search)
  }

}

import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { newUser } from 'src/app/common/factories';
import { IUser } from 'src/app/interfaces/IUser';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-footer-menu',
  templateUrl: './footer-menu.component.html',
  styleUrls: ['./footer-menu.component.scss']
})
export class FooterMenuComponent implements OnInit {

  signOutIcon = faSignOutAlt
  user: IUser = newUser()

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    this.user = this.spotifyService.user || newUser();
  }

  logout() {
    this.spotifyService.logout()
  }
}

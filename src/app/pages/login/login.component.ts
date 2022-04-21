import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUrl = ''

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkTokenUrlCallback()
    this.loginUrl = this.spotifyService.getLoginUrl()
  }

  checkTokenUrlCallback() {
    const token = this.spotifyService.getCallbackToken()

    if(!!token) {
      this.spotifyService.setAccessToken(token)
      this.router.navigate(['/player/home'])
    }
  }

}

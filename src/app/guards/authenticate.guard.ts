import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SPOTIFY_TOKEN } from 'src/shared/keys';
import { SpotifyService } from '../services/spotify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuard implements CanLoad {
  constructor(
    private router: Router,
    private spotifyService: SpotifyService
  ){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem(SPOTIFY_TOKEN)

    if(!token) {
      this.handleNotAuthenticate()
    }

    return new Promise(async (resolve) => {
      const user = await this.spotifyService.checkIfUserIsAuthenticate()

      if(!!user) {
        resolve(true)
      } else {
        resolve(this.handleNotAuthenticate())
      }
    })

    return true;
  }

  handleNotAuthenticate() {
    localStorage.clear()
    this.router.navigate(['/login'])
    return false
  }
}

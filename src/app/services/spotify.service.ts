import { IMusic } from './../interfaces/IMusic';
import { Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js'

import { SPOTIFY_CONFIGURATION } from 'src/environments/environment';
import { SPOTIFY_TOKEN } from 'src/shared/keys';
import { IUser } from 'src/app/interfaces/IUser';
import { parseSpotifyPlaylist, parseSpotifyPlaylistSingle, parseSpotifySongs, parseSpotifyTopArtists, parseSpotifyUser } from '../common/spotifyHelper';
import { IPlaylist } from '../interfaces/IPlaylist';
import { Router } from '@angular/router';
import { IArtist } from '../interfaces/IArtist';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  user: IUser

  constructor(
    private router: Router
  ) {
    this.spotifyApi = new Spotify()
  }

  getLoginUrl() {
    const authEndpoint = `${SPOTIFY_CONFIGURATION.authEndpoint}?`
    const clientId = `client_id=${SPOTIFY_CONFIGURATION.clientId}&`
    const redirectUri = `redirect_uri=${SPOTIFY_CONFIGURATION.redirectUri}&`
    const scopes = `scope=${SPOTIFY_CONFIGURATION.scopes.join('%20')}&`
    const responseType = `response_type=token&show_dialog=true`

    return authEndpoint + clientId + redirectUri + scopes + responseType
  }

  getCallbackToken() {
    if(!window.location.hash) {
      return ''
    }

    const params = window.location.hash.substring(1).split('&')
    return params[0].split('=')[1]
  }

  setAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);

    localStorage.setItem(SPOTIFY_TOKEN, token)
  }

  async checkIfUserIsAuthenticate() {
    if(!!this.user) {
      return true
    }

    const token = localStorage.getItem(SPOTIFY_TOKEN);

    if(!token) {
      return false
    }

    try {
      this.setAccessToken(token)
      this.user = await this.getSpotifyUser()

      return !!this.user
    } catch(err) {
      return false
    }
  }

  async getSpotifyUser() {
    const userInfo = await this.spotifyApi.getMe();

    return parseSpotifyUser(userInfo)
  }

  async getSpotifyPlaylist(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.user.id, {
      limit,
      offset
    })

    return playlists.items.map(parseSpotifyPlaylist)
  }

  async getHightlightArtists(limit = 10): Promise<IArtist[]> {
    const artists = await this.spotifyApi.getMyTopArtists({
      limit
    })

    return artists.items.map(parseSpotifyTopArtists)
  }

  async getSongs(offset = 0, limit = 50): Promise<IMusic[]> {
    const musics = await this.spotifyApi.getMySavedTracks({ offset, limit })
    return musics.items.map(item => parseSpotifySongs(item.track))
  }

  async execMusic(songId: string) {
    await this.spotifyApi.queue(songId);
    await this.spotifyApi.skipToNext()
  }

  async getCurrentSong(): Promise<IMusic> {
    const currentSong = await this.spotifyApi.getMyCurrentPlayingTrack()
    return parseSpotifySongs(currentSong.item)
  }

  async previousSong() {
    await this.spotifyApi.skipToPrevious()
  }

  async nextSong() {
    await this.spotifyApi.skipToNext()
  }

  async getSongsByPlaylistId(playlistId: string, offset = 0, limit = 50) {
    const paylistSpotify = await this.spotifyApi.getPlaylist(playlistId)

    if(!paylistSpotify) {
      return null
    }

    const playlist = parseSpotifyPlaylistSingle(paylistSpotify)

    const spotifySongs = this.spotifyApi.getPlaylistTracks(playlistId, { offset, limit })

    playlist.songs = (await spotifySongs).items.map(item => parseSpotifySongs(item.track as SpotifyApi.TrackObjectFull))

    return playlist
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }

}

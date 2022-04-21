import { addMilliseconds, format } from "date-fns";
import { IUser } from "src/app/interfaces/IUser";
import { IArtist } from "../interfaces/IArtist";
import { IMusic } from "../interfaces/IMusic";
import { IPlaylist } from "../interfaces/IPlaylist";
import { newMusic, newPlaylist } from "./factories";

export function parseSpotifyUser(user: SpotifyApi.CurrentUsersProfileResponse): IUser {
  return {
    id: user.id,
    name: user.display_name,
    avatarUrl: user.images.pop().url
  }
}

export function parseSpotifyPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
  return {
    id: playlist.id,
    imageUrl: playlist.images.pop().url,
    name: playlist.name
  }
}

export function parseSpotifyPlaylistSingle(playlist: SpotifyApi.SinglePlaylistResponse): IPlaylist {
  if(!playlist) {
    return newPlaylist()
  }

  return {
    id: playlist.id,
    imageUrl: playlist.images.shift().url,
    name: playlist.name
  }
}

export function parseSpotifyTopArtists(artist: SpotifyApi.ArtistObjectFull): IArtist {
  return {
    id: artist.id,
    avatarUrl: artist.images.sort((a,b) => a.width - b.width).pop().url,
    name: artist.name
  }
}

export function parseSpotifySongs(music: SpotifyApi.TrackObjectFull): IMusic {
  if(!music) {
    return newMusic();
  }

  const parseMSToMinutes = (ms: number) => {
    const data = addMilliseconds(new Date(0), ms)

    return format(data, 'mm:ss')
  }

  return {
    id: music.uri,
    title: music.name,
    album: {
      id: music.album.id,
      imageUrl: music.album.images.shift().url,
      name: music.album.name
    },
    artists: music.artists.map(artist => ({
      id: artist.id,
      name: artist.name
    })),
    time: parseMSToMinutes(music.duration_ms)
  }
}

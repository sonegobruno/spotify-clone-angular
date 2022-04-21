import { IArtist } from "../interfaces/IArtist";
import { IMusic } from "../interfaces/IMusic";
import { IPlaylist } from "../interfaces/IPlaylist";
import { IUser } from "../interfaces/IUser";

export function newArtist(): IArtist {
  return {
    id: '',
    avatarUrl: '',
    name: '',
    songs: []
  }
}

export function newMusic(): IMusic {
  return {
    id: '',
    album: {
      id: '',
      imageUrl: '',
      name: ''
    },
    artists: [],
    time: '',
    title: ''
  }
}

export function newUser(): IUser {
  return {
    id: '',
    avatarUrl: '',
    name: ''
  }
}

export function newPlaylist(): IPlaylist {
  return {
    id: '',
    imageUrl: '',
    name: '',
    songs: []
  }
}

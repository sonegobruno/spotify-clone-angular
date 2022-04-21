export interface IMusic {
  id: string
  title: string
  artists: Artist[]
  album: Album,
  time: string
}

type Artist = {
  id: string
  name: string
}

type Album = {
  id: string
  name: string
  imageUrl: string
}

import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ListMusicComponent } from '../list-music/list-music.component';
import { PlayerComponent } from './player.component';

export const PlayerRoutes: Routes = [
  {
    path: '',
    component: PlayerComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'lista/:type/:id',
        component: ListMusicComponent,
      }
    ]
  }
]

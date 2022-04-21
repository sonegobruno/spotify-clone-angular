import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { PlayerRoutes } from './player.routes';

import { AsidePlayerComponent } from './../../components/aside-player/aside-player.component';
import { MenuButtonComponent } from './../../components/menu-button/menu-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterMenuComponent } from 'src/app/components/footer-menu/footer-menu.component';
import { HomeComponent } from '../home/home.component';
import { TopArtistComponent } from 'src/app/components/top-artist/top-artist.component';
import { RightMenuComponent } from 'src/app/components/right-menu/right-menu.component';
import { RecentlySearchComponent } from 'src/app/components/recently-search/recently-search.component';
import { FormsModule } from '@angular/forms';
import { TopArtistsComponent } from 'src/app/components/top-artists/top-artists.component';
import { TopArtistCardComponent } from 'src/app/components/top-artist-card/top-artist-card.component';
import { PlayerCardComponent } from 'src/app/components/player-card/player-card.component';
import { ListMusicComponent } from '../list-music/list-music.component';
import { BannerComponent } from 'src/app/components/banner/banner.component';

@NgModule({
  declarations: [
    PlayerComponent,
    AsidePlayerComponent,
    MenuButtonComponent,
    FooterMenuComponent,
    HomeComponent,
    TopArtistComponent,
    RightMenuComponent,
    RecentlySearchComponent,
    TopArtistsComponent,
    TopArtistCardComponent,
    PlayerCardComponent,
    ListMusicComponent,
    BannerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PlayerRoutes),
    FontAwesomeModule,
    FormsModule
  ]
})
export class PlayerModule { }

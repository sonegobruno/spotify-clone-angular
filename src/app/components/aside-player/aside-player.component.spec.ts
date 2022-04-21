import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify.service';
import { FooterMenuComponent } from '../footer-menu/footer-menu.component';
import { MenuButtonComponent } from '../menu-button/menu-button.component';
import { PlayerCardComponent } from '../player-card/player-card.component';

import { AsidePlayerComponent } from './aside-player.component';

type MockRouter = Pick<Router, 'navigateByUrl'>

const mockedPlaylist: IPlaylist[] = [
  {
    id: 'fake-id',
    name: 'fake-song',
    imageUrl: 'fake-image'
  }
]

describe('AsidePlayerComponent', () => {
  let component: AsidePlayerComponent;
  let fixture: ComponentFixture<AsidePlayerComponent>;
  let mockSpotifyService: jasmine.SpyObj<SpotifyService>
  let mockRouter: jasmine.SpyObj<MockRouter>

  beforeEach(async () => {
    mockSpotifyService = jasmine.createSpyObj<SpotifyService>(['getSpotifyPlaylist'])
    mockSpotifyService.getSpotifyPlaylist.and.returnValue(Promise.resolve(mockedPlaylist))
    mockRouter = jasmine.createSpyObj(['navigateByUrl'])

    await TestBed.configureTestingModule({
      declarations: [ AsidePlayerComponent, FooterMenuComponent, PlayerCardComponent, MenuButtonComponent ],
      imports: [
        RouterTestingModule,
        FontAwesomeModule
      ],
      providers: [
        { provide: SpotifyService, useValue: mockSpotifyService },
        { provide: Router, useValue: mockRouter },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsidePlayerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load playlists', (done: DoneFn) => {
    const compiled = fixture.nativeElement as HTMLElement;

    mockSpotifyService.getSpotifyPlaylist().then(() => {
      fixture.detectChanges();
      const span = compiled.querySelector('.playlist-scroll app-menu-button button span')
      expect(span.textContent).toContain(mockedPlaylist[0].name);
      done()
    })
  });

  it('should menu is active when selected', (done: DoneFn) => {
    const compiled = fixture.nativeElement as HTMLElement;

    const allMenuButtons = compiled.querySelectorAll('app-menu-button')
    let findedMenuButton: Element;

    allMenuButtons.forEach(menuButton => {
      if(menuButton.getAttribute('title') === component.menuSelected) {
        findedMenuButton = menuButton
      }
    })

    const button = findedMenuButton?.querySelector('button')

    expect(findedMenuButton).toBeTruthy()
    expect(button).toHaveClass('is-selected')
    done()
  });

  it('should select menu when it have been clicked', (done: DoneFn) => {
    const compiled = fixture.nativeElement as HTMLElement;

    const allMenuButtons = compiled.querySelectorAll('app-menu-button')
    let HomeMenuButton: Element;
    let SearchMenuButton: Element;

    allMenuButtons.forEach(menuButton => {
      if(menuButton.getAttribute('title') === 'Home') {
        HomeMenuButton = menuButton
      }

      if(menuButton.getAttribute('title') === 'Pesquisar') {
        SearchMenuButton = menuButton
      }
    })

    const searchButton = SearchMenuButton?.querySelector('button')
    const homeButton = HomeMenuButton?.querySelector('button')

    searchButton.click()

    fixture.detectChanges();

    expect(homeButton).not.toHaveClass('is-selected')
    expect(searchButton).toHaveClass('is-selected')
    done()
  });

  it('should navigate to playlist', (done: DoneFn) => {
    const compiled = fixture.nativeElement as HTMLElement;

    mockSpotifyService.getSpotifyPlaylist().then(() => {
      fixture.detectChanges();

      const button: HTMLButtonElement = compiled.querySelector('.playlist-scroll app-menu-button button')

      button.click()

      fixture.detectChanges();
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(`player/lista/playlist/${mockedPlaylist[0].id}`);
      expect(button).toHaveClass('is-selected');
      done();
    })
  });
});

import { IMusic } from 'src/app/interfaces/IMusic';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { PlayerCardComponent } from "./player-card.component";
import { PlayerService } from 'src/app/services/player/player.service';
import { BehaviorSubject } from 'rxjs';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

const mockSong = new BehaviorSubject<IMusic>({
  title: 'fake-title',
  id: '',
  artists: [],
  time: '',
  album: {
    id: 'fake-id',
    imageUrl: 'fake-image',
    name: 'fake-album-name'
  },
})

describe('Player Card Component', () => {
  let component: PlayerCardComponent;
  let fixture: ComponentFixture<PlayerCardComponent>;
  let mockPlayerService: jasmine.SpyObj<PlayerService>

  beforeEach(() => {
    mockPlayerService = jasmine.createSpyObj<PlayerService>(['currentSong', 'previousSong', 'nextSong'], {
      currentSong: mockSong
    })


    TestBed.configureTestingModule({
      declarations: [PlayerCardComponent],
      imports: [RouterTestingModule, FontAwesomeModule],
      providers: [
        { provide: PlayerService, useValue: mockPlayerService },
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerCardComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  })

  it('should render correctly', () => {
    expect(component).toBeTruthy();
  })

  it('should render current song', () => {
    const span = document.querySelector('.controls span')

    expect(span.textContent).toContain('fake-title');
  })

  // it('should destroy all subscriptions', () => {
  //   fixture.destroy();
  //   fixture.detectChanges();

  //   expect(component.subscription.length).toBeLessThanOrEqual(0);
  // })

  it('should call next song', () => {
    const button: HTMLButtonElement = document.querySelector('.next-song')

    button.click()

    expect(mockPlayerService.nextSong).toHaveBeenCalled();
  })

  it('should call prev song', () => {
    const button: HTMLButtonElement = document.querySelector('.prev-song')

    button.click()

    expect(mockPlayerService.previousSong).toHaveBeenCalled();
  })

})

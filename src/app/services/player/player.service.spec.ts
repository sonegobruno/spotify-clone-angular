import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { PlayerService } from './player.service';
import { BehaviorSubject } from 'rxjs';
import { IMusic } from 'src/app/interfaces/IMusic';
import { SpotifyService } from '../spotify.service';

const mockSong: IMusic = {
  title: 'fake-title',
  id: '',
  artists: [],
  time: '',
  album: {
    id: 'fake-id',
    imageUrl: 'fake-image',
    name: 'fake-album-name'
  },
}

describe('PlayerService', () => {
  let service: PlayerService;
  let mockSpotifyService: jasmine.SpyObj<SpotifyService>

  beforeEach(() => {
    mockSpotifyService = jasmine.createSpyObj<SpotifyService>(['getCurrentSong'])

    mockSpotifyService.getCurrentSong.and.returnValue(Promise.resolve(mockSong))


    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        { provide: SpotifyService, useValue: mockSpotifyService },
      ]
    });
    service = TestBed.inject(PlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with current song', () => {
    service.currentSong.subscribe(song => {
      expect(song.title).toEqual(mockSong.title)
    })
  });
});

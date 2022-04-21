import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpotifyService } from 'src/app/services/spotify.service';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';

type MockRouter = Pick<Router, 'navigate'>

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockSpotifyService: jasmine.SpyObj<SpotifyService>
  let mockRouter: jasmine.SpyObj<MockRouter>

  describe('user is not logged', () => {
    beforeEach(async () =>  {
      mockSpotifyService = jasmine.createSpyObj<SpotifyService>(['getLoginUrl', 'getCallbackToken', 'setAccessToken'])

      mockSpotifyService.getLoginUrl.and.returnValue('fake-url')
      mockSpotifyService.getCallbackToken.and.returnValue(null)
      mockRouter = jasmine.createSpyObj(['navigate'])

      await TestBed.configureTestingModule({
        declarations: [ LoginComponent ],
        imports: [RouterTestingModule],
        providers: [
          { provide: SpotifyService, useValue: mockSpotifyService },
          { provide: Router, useValue: mockRouter },
        ]
      })
      .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('Should render spotify url', async () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('a').href).toContain('fake-url');
    })

    it('Should not redirect when user is not logged', async () => {
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    })
  })

  describe('user is logged', () => {
    beforeEach(async () =>  {
      mockSpotifyService = jasmine.createSpyObj<SpotifyService>(['getLoginUrl', 'getCallbackToken', 'setAccessToken'])

      mockSpotifyService.getLoginUrl.and.returnValue('fake-url')
      mockSpotifyService.getCallbackToken.and.returnValue('fake-token')
      mockRouter = jasmine.createSpyObj(['navigate'])

      await TestBed.configureTestingModule({
        declarations: [ LoginComponent ],
        imports: [RouterTestingModule],
        providers: [
          { provide: SpotifyService, useValue: mockSpotifyService },
          { provide: Router, useValue: mockRouter },
        ]
      })
      .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
    });

    it('Should redirect when user is logged', async () => {
      expect(mockRouter.navigate).toHaveBeenCalled();
    })
  })
});

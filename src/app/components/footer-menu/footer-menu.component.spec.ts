import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IUser } from "src/app/interfaces/IUser";
import { SpotifyService } from "src/app/services/spotify.service";
import { FooterMenuComponent } from "./footer-menu.component"

const mockUser: IUser = {
  id: 'fake-id',
  name: 'fake-name',
  avatarUrl: 'fake-avatar'
}

type MockRouter = Pick<Router, 'navigate'>

describe('Footer Menu Component', () => {
  let component: FooterMenuComponent;
  let fixture: ComponentFixture<FooterMenuComponent>;
  let mockSpotifyService: jasmine.SpyObj<SpotifyService>
  let mockRouter: jasmine.SpyObj<MockRouter>

  beforeEach(() => {
    mockSpotifyService = jasmine.createSpyObj<SpotifyService>(['user', 'logout'], {
      user: mockUser
    })
    mockRouter = jasmine.createSpyObj(['navigate'])
    mockSpotifyService.logout.and.callFake(() => mockRouter.navigate(['login']))

    TestBed.configureTestingModule({
      declarations: [FooterMenuComponent],
      imports: [RouterTestingModule, FontAwesomeModule],
      providers: [
        { provide: SpotifyService, useValue: mockSpotifyService },
        { provide: Router, useValue: mockRouter },
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterMenuComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  })

  it('should render correctly', () => {
    expect(component).toBeTruthy();
  })

  it('should render user information', () => {
    const img = document.querySelector('img');
    const span = document.querySelector('span#user-name');

    expect(img.getAttribute('src')).toEqual(mockUser.avatarUrl);
    expect(span.textContent).toEqual(mockUser.name);
  })

  it('should logout user', () => {
    const logoutButton: HTMLButtonElement = document.querySelector('.icon');

    logoutButton.click();

    expect(mockRouter.navigate).toHaveBeenCalled();
  })

})

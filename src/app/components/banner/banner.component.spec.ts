import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { BannerComponent } from "./banner.component";

describe('Banner Component', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerComponent ],
      imports: [
        RouterTestingModule,
      ],
    })
    .compileComponents();
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should render correctly', () => {
    expect(component).toBeTruthy()
  })

  it('should render correctly with inputs', () => {
    component.text = 'fake-text';
    component.imageUrl = 'fake-imageUrl';
    fixture.detectChanges();

    const text = document.querySelector('.title-bg')
    const banner = document.querySelector('.image')

    expect(text.textContent).toContain('fake-text')
    expect(banner.getAttribute('style')).toContain('fake-imageUrl')
  })
})

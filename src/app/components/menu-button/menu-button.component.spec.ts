import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MenuButtonComponent } from "./menu-button.component";

describe('Menu Button Component', () => {
  let component: MenuButtonComponent;
  let fixture: ComponentFixture<MenuButtonComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [MenuButtonComponent],
      imports: [RouterTestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuButtonComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  })

  it('should render correctly', () => {
    component.title = 'fake-title'
    fixture.detectChanges();

    const span = document.querySelector('button span')
    const button = document.querySelector('button')

    expect(component).toBeTruthy();
    expect(span.textContent).toContain('fake-title');
    expect(button).not.toHaveClass('is-selected');
  })

  it('should render with button selected', () => {
    component.isSelected = true
    fixture.detectChanges();

    const button = document.querySelector('button')

    expect(button).toHaveClass('is-selected');
  })
})

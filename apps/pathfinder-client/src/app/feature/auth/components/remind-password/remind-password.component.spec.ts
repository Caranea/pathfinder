import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemindPasswordComponent } from './remind-password.component';

describe('RemindPasswordComponent', () => {
  let component: RemindPasswordComponent;
  let fixture: ComponentFixture<RemindPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemindPasswordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RemindPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

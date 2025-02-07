import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChangeDataComponent } from './form-change-data.component';

describe('FormChangeDataComponent', () => {
  let component: FormChangeDataComponent;
  let fixture: ComponentFixture<FormChangeDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormChangeDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormChangeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

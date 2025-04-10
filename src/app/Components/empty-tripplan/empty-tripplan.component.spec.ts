import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyTripplanComponent } from './empty-tripplan.component';

describe('EmptyTripplanComponent', () => {
  let component: EmptyTripplanComponent;
  let fixture: ComponentFixture<EmptyTripplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyTripplanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyTripplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

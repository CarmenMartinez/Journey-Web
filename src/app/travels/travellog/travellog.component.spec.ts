import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellogComponent } from './travellog.component';

describe('TravellogComponent', () => {
  let component: TravellogComponent;
  let fixture: ComponentFixture<TravellogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravellogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

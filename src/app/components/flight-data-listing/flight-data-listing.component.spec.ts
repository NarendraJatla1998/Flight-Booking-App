import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDataListingComponent } from './flight-data-listing.component';

describe('FlightDataListingComponent', () => {
  let component: FlightDataListingComponent;
  let fixture: ComponentFixture<FlightDataListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightDataListingComponent]
    });
    fixture = TestBed.createComponent(FlightDataListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

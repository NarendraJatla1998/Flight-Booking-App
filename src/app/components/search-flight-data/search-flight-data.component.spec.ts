import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFlightDataComponent } from './search-flight-data.component';

describe('SearchFlightDataComponent', () => {
  let component: SearchFlightDataComponent;
  let fixture: ComponentFixture<SearchFlightDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFlightDataComponent]
    });
    fixture = TestBed.createComponent(SearchFlightDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

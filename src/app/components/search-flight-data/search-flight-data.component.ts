import { Component, Output, Input, ViewChild, EventEmitter, OnInit } from '@angular/core';
import { FilterDropDownModel } from '../models/dropDown.model';
import { FlightListingData } from '../models/flightListingData.model';
import { Subject, debounceTime } from 'rxjs';
import { FlightDataListingComponent } from '../flight-data-listing/flight-data-listing.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search-flight-data',
  templateUrl: './search-flight-data.component.html',
  styleUrls: ['./search-flight-data.component.css']
})
export class SearchFlightDataComponent implements OnInit {

  @Input() flightFilterList: FilterDropDownModel[] = [];
  public inputSubject =  new Subject();
  public search: string = '';
  @ViewChild(FlightDataListingComponent) flightListDataComponent!: FlightDataListingComponent;
  @Output() searchText: EventEmitter<any> = new EventEmitter();
  @Output() filterSelect: EventEmitter<any> = new EventEmitter();

  constructor(    private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
      this.searchData();
  }

  filterUsingTypeandAirLines(filterValue: string) {
   this.filterSelect.emit(filterValue);
  }
  
  searchData() {
    this.spinner.show();
    this.inputSubject.pipe(debounceTime(500)).subscribe((res) => {
      this.searchText.emit(this.search);
      this.spinner.hide();
    });
  }

  triggerSearch() {
    this.inputSubject.next(true);
  }

  loadFlightsList() {
    this.flightListDataComponent.loadFlightsList();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightServiceService } from '../services/flight-service.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeaderModel } from '../models/header.model';
import { FilterDropDownModel } from '../models/dropDown.model';
import { FlightListingData } from '../models/flightListingData.model';

@Component({
  selector: 'app-flight-data-listing',
  templateUrl: './flight-data-listing.component.html',
  styleUrls: ['./flight-data-listing.component.css'],
})
export class FlightDataListingComponent implements OnInit, OnDestroy {
  public flightsData: FlightListingData[] = [];
  public cols: HeaderModel[] = [];
  public search: string = '';
  public flightFilterList: FilterDropDownModel[] = [];
  public subscriptions: Subscription[] = [];
  public responseData: FlightListingData[] = [];
  public filteredFlights: FlightListingData[] = [];

  constructor(
    private flightService: FlightServiceService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.onLoad();
  }

  public onLoad() {
    this.loadFlightsList();
    this.loadHeaderMenu();
  }

  public loadHeaderMenu() {
    const subs = this.flightService.getHeaderName().subscribe((response) => {
      if (response) {
        this.cols = response;
      }
    });
    this.subscriptions.push(subs);
  }

  filterUsingTypeandAirLines(filterValue: string) {
    if (filterValue) {
      this.filteredFlights = this.responseData.filter(
        (flight) =>
          flight.aircraft === filterValue || flight.airline === filterValue
      );
      this.flightsData = this.filteredFlights;
    }
  }

  searchFlightData(search: string) {
    if (search) {
      this.spinner.show();
      const filteredFlights = this.responseData.filter((flight) => {
        return (
          flight.arrivalTime.toLowerCase().includes(search.toLowerCase()) ||
          flight.departureTime.toLowerCase().includes(search.toLowerCase())
        );
      });
      this.spinner.hide();
      this.flightsData = filteredFlights;
    } else {
      this.loadFlightsList();
    }
  }

  loadFlightsList() {
    this.spinner.show();
    const subs = this.flightService
      .getFlightDetails()
      .subscribe((response: FlightListingData[]) => {
        this.spinner.hide();
        this.flightsData = response;
        this.responseData = response;
        const airLinesName = response.map((flight: any) => ({
          name: flight?.airline,
        }));
        //Finding the Unique Names of the AIR LINES
        const setUniqueAirLinesNames = new Set<string>();
        airLinesName.forEach((obj) => setUniqueAirLinesNames.add(obj.name));
        const filterUniqueAirLinesNames = Array.from(setUniqueAirLinesNames);
        const filteredUniqueAirLinesNames = filterUniqueAirLinesNames.map(
          (name) => ({ name: name })
        );

        //Finding the Unique Names of the Flight Types
        const flightTypeData = response.map((flight: any) => ({
          name: flight.aircraft,
        }));
        const setUniqueFlightTypesNames = new Set<string>();
        flightTypeData.forEach((obj) =>
          setUniqueFlightTypesNames.add(obj.name)
        );
        const filterUniqueFlightTypeNames = Array.from(
          setUniqueFlightTypesNames
        );
        const filteredUniqueTypesNames = filterUniqueFlightTypeNames.map(
          (name) => ({ name: name })
        );

        //Concating both the Arrays into single Array
        this.flightFilterList = filteredUniqueTypesNames.concat(
          filteredUniqueAirLinesNames
        );
      });
    this.subscriptions.push(subs);
  }

  ngOnDestroy(): void {
    // Unsuscribing all the services call once after navigating to any where
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }
}

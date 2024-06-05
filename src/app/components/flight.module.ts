import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TableModule } from 'primeng/table';
import { FlightDataListingComponent } from './flight-data-listing/flight-data-listing.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { SearchFlightDataComponent } from './search-flight-data/search-flight-data.component';

@NgModule({
  declarations: [
    FlightDataListingComponent,
    SearchFlightDataComponent
  ],
  imports: [
    BrowserModule,
    TableModule,
    HttpClientModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    TooltipModule
  ],
  exports: [
    FlightDataListingComponent,
    SearchFlightDataComponent
  ]
})
export class FlightModule { }

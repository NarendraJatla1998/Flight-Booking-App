import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiHandler} from './api.handler'
import env from 'src/env';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlightServiceService {

  constructor(private apiHandler: ApiHandler, private htp: HttpClient) { }

  private handleError(error: any) {
    return of(error.error);
  }

  getFlightDetails() {
    return this.apiHandler.get(`${env?.baseURL}`).pipe(
      map((response) => {
        if (response) {
          return response
        } else {
          return null;
        }
      })
    ).pipe(catchError(this.handleError));
  }

  getHeaderName() {
    return this.htp.get<any>('assets/flight-tableHeadr.json');
  }

}

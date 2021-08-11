import { environment } from './../../environments/environment.prod';
import { IVehicle } from './../models/vehicle.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  constructor(private http: HttpClient) {}

  getVehicles(): Observable<IVehicle[]> {
    return this.http
      .get<IVehicle[]>(environment.urlService)
      .pipe(catchError(this.handleError));
  }

  registerVehicle(body: IVehicle) {
    return this.http
      .post(environment.urlService, body)
      .pipe(catchError(this.handleError));
  }

  editVehicle(chassiId: string | undefined, color: string) {
    return this.http
      .put(environment.urlService + `/${chassiId}`, { color: color })
      .pipe(catchError(this.handleError));
  }

  deleteVehicle(chassiId: string) {
    return this.http
      .delete(environment.urlService + `/${chassiId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    const msgError =
      err.error.message || err.statusText || 'Error internal server';
    console.error(
      `Error occurred, message - > ${msgError}, status code -> ${err.status}`
    );
    return throwError(msgError);
  }
}

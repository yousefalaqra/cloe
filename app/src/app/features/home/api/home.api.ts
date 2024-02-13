import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppointmentModel } from '../models/appointment.model';
import { AppointmentResource } from '../resources/appointment.resource';

@Injectable()
export class HomeApi {
  private readonly API = `${environment.api}/Appointment`;
  constructor(private _http: HttpClient) {}

  getAll(time = 24): Observable<Array<AppointmentResource>> {
    return this._http
      .get(this.API, { params: { time: `${time}` } })
      .pipe(map((res: any) => res.result));
  }

  carate(
    clientId: string,
    model: AppointmentModel
  ): Observable<AppointmentResource> {
    return this._http
      .post(`${this.API}/${clientId}`, model)
      .pipe(map((res: any) => res.result));
  }

  update(id: number, model: AppointmentModel): Observable<AppointmentResource> {
    return this._http
      .put(`${this.API}/${id}`, model)
      .pipe(map((res: any) => res.result));
  }

  delete(id: number): Observable<boolean> {
    return this._http
      .delete(`${this.API}/${id}`)
      .pipe(map((res: any) => res.result));
  }
}

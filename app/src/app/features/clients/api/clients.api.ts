import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientResource } from '../resources/client.resource';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { ClientModel } from '../models/client.model';
import { ClientObservationModel } from '../models/client-observation.model';
import { MeasurementModel } from '../models/mesaurement.model';
import { SubscriptionResource } from '../../subscription/resources/subscription.resource';
import { AppointmentResource } from '../../home/resources/appointment.resource';
import { AppointmentModel } from '../../home/models/appointment.model';

const BaseUrl = environment.api + '/Client';
const SubscriptionUrl = environment.api + '/Subscription';

@Injectable()
export class ClientApi {
  private readonly API = environment.api + '/Client';
  private readonly sub = 'subscription​';
  private readonly APIV2 = `${environment.api}/Appointment`;

  constructor(private _http: HttpClient) {}

  getAll(
    workplaceId = 0,
    searchKey: string = ''
  ): Observable<Array<ClientResource>> {
    return this._http
      .get(BaseUrl, {
        params: { workplaceId: `${workplaceId}`, searchKey: searchKey },
      })
      .pipe(map((res: any) => res.result));
  }

  getClient(id: string): Observable<ClientResource> {
    return this._http
      .get(`${BaseUrl}/${id}`)
      .pipe(map((x: any) => x.result));
  }

  addClient(model: ClientModel): Observable<ClientResource> {
    return this._http
      .post(`${BaseUrl}`, model)
      .pipe(map((res: any) => res.result));
  }

  checkPhoneNumber(phoneNumber: string): Observable<boolean> {
    return this._http.get<boolean>(BaseUrl + '/ValidNumber/' + phoneNumber);
  }

  updateClient(
    clientId: string,
    model: ClientModel
  ): Observable<ClientResource> {
    return this._http
      .put(`${BaseUrl}/${clientId}`, model)
      .pipe(map((res: any) => res.result));
  }

  addTag(clientId: string, tag: string): Observable<ClientResource> {
    return this._http
      .patch(`${BaseUrl}/${clientId}/${tag}`, {})
      .pipe(map((res: any) => res.result));
  }

  removeTag(clientId: string, tagId: number): Observable<ClientResource> {
    return this._http
      .delete(`${BaseUrl}/${clientId}/${tagId}`, {})
      .pipe(map((res: any) => res.result));
  }

  addDisease(clientId: string, disease: string): Observable<ClientResource> {
    return this._http
      .patch(`${BaseUrl}/${clientId}/disease/${disease}`, {})
      .pipe(map((res: any) => res.result));
  }

  removeDisease(
    clientId: string,
    diseaseId: number
  ): Observable<ClientResource> {
    return this._http
      .delete(`${BaseUrl}/${clientId}/disease/${diseaseId}`, {})
      .pipe(map((res: any) => res.result));
  }

  addMedication(
    clientId: string,
    medication: string
  ): Observable<ClientResource> {
    return this._http
      .patch(`${BaseUrl}/${clientId}/medication/${medication}`, {})
      .pipe(map((res: any) => res.result));
  }

  removeMedication(
    clientId: string,
    medicationId: number
  ): Observable<ClientResource> {
    return this._http
      .delete(`${BaseUrl}/${clientId}/medication/${medicationId}`, {})
      .pipe(map((res: any) => res.result));
  }

  addObservation(
    clientId: string,
    model: ClientObservationModel
  ): Observable<ClientResource> {
    return this._http
      .patch(`${BaseUrl}/${clientId}/observation`, model)
      .pipe(map((res: any) => res.result));
  }

  updateObservation(
    clientId: string,
    observationId: number,
    model: ClientObservationModel
  ): Observable<ClientResource> {
    return this._http
      .patch(`${BaseUrl}/${clientId}/observation/${observationId}`, model)
      .pipe(map((res: any) => res.result));
  }

  addMeasurement(
    clientId: string,
    model: MeasurementModel
  ): Observable<ClientResource> {
    return this._http
      .post(`${BaseUrl}/${clientId}/measurement`, model)
      .pipe(map((res: any) => res.result));
  }

  updateMeasurement(
    clientId: string,
    measurementId: number,
    model: MeasurementModel
  ): Observable<ClientResource> {
    return this._http
      .put(`${BaseUrl}/${clientId}/measurement/${measurementId}`, model)
      .pipe(map((res: any) => res.result));
  }

  removeMeasurement(
    clientId: string,
    measurementId: number
  ): Observable<ClientResource> {
    return this._http
      .delete(`${BaseUrl}/${clientId}/measurement/${measurementId}`)
      .pipe(map((res: any) => res.result));
  }

  removeObservation(
    clientId: string,
    observationId: number
  ): Observable<ClientResource> {
    return this._http
      .delete(`${BaseUrl}/${clientId}/observation/${observationId}`, {})
      .pipe(map((res: any) => res.result));
  }

  addSubscription(
    clientId: string,
    subscriptionId: number
  ): Observable<ClientResource> {
    return this._http
      .post(`${this.API}/subscription/${clientId}/${subscriptionId}`, {})
      .pipe(map((res: any) => res.result));
  }

  pauseSubscription(
    clientId: string,
    subscriptionId: number,
    clientSubId: number
  ): Observable<ClientResource> {
    return this._http
      .patch(
        `${BaseUrl}/${clientId}​/${this.sub}/${subscriptionId}/${clientSubId}`,
        {}
      )
      .pipe(map((res: any) => res.result));
  }

  RemoveSubscription(
    clientId: string,
    clientSubId: number
  ): Observable<ClientResource> {
    return this._http
      .delete(`${this.API}/subscription/${clientId}/${clientSubId}`)
      .pipe(map((res: any) => res.result));
  }

  removeClient(clientId: string): Observable<boolean> {
    return this._http
      .delete(`${BaseUrl}/${clientId}`)
      .pipe(map((res: any) => res.result));
  }

  getAllSubscriptions(): Observable<Array<SubscriptionResource>> {
    return this._http
      .get(SubscriptionUrl, { params: { active: 'true' } })
      .pipe(map((res: any) => res.result));
  }

  addPayment(clientId: string, amount: number): Observable<ClientResource> {
    return this._http
      .post(`${this.API}/payment/${clientId}`, { amount: amount })
      .pipe(map((res: any) => res.result));
  }

  updatePayment(
    clientId: string,
    paymentId: number,
    amount: number
  ): Observable<ClientResource> {
    return this._http
      .patch(`${this.API}/payment/${clientId}/${paymentId}`, { amount: amount })
      .pipe(map((res: any) => res.result));
  }

  deletePayment(
    clientId: string,
    paymentId: number
  ): Observable<ClientResource> {
    return this._http
      .delete(`${this.API}/payment/${clientId}/${paymentId}`)
      .pipe(map((res: any) => res.result));
  }

  addClientAppointment(
    clientId: string,
    model: AppointmentModel
  ): Observable<AppointmentResource> {
    return this._http
      .put(`${this.APIV2}/Appointment/Appointment/${clientId}`, model)
      .pipe(map((res: any) => res.result));
  }
}

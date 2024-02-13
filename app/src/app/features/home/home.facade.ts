import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClientApi } from '../clients/api/clients.api';
import { ClientFacade } from '../clients/clients.facade';
import { ClientResource } from '../clients/resources/client.resource';
import { HomeApi } from './api/home.api';
import { AppointmentModel } from './models/appointment.model';
import { AppointmentResource } from './resources/appointment.resource';
import { AppointmentState } from './state/appointment.state';

@Injectable()
export class HomeFacade {
  constructor(
    private _appointmentState: AppointmentState,
    private _clientFacade: ClientFacade,
    private _api: HomeApi,
    private _clientApi: ClientApi
  ) {}

  get appointments$(): Observable<Array<AppointmentResource>> {
    return this._appointmentState.getAppointments();
  }

  get loading$(): Observable<boolean> {
    return this._appointmentState.getLoading();
  }

  get modalState$(): Observable<0 | 1 | 2> {
    return this._appointmentState.getModalState();
  }

  get clinet$(): Observable<Array<ClientResource>> {
    return this._clientFacade.clients$;
  }

  get clientsLoading$(): Observable<boolean> {
    return this._clientFacade.loading$;
  }

  get selectedClient$(): Observable<ClientResource>{
      return this._appointmentState.getSelectedClient()
  }

  get modalTaps$(): Observable<
    Array<{ id: number; title: string; active: boolean }>
  > {
    return this._appointmentState.getModalTaps();
  }

  get selectedAppointment$(): Observable<AppointmentResource>{
    return this._appointmentState.getSelectedAppointment()
  }

  loadAppointments(timeFilter = 24): Observable<any> {
    this._appointmentState.setLoading(true);

    return this._api.getAll(timeFilter).pipe(
      tap(
        (res) => {
          this._appointmentState.setLoading(false);
          this._appointmentState.setAppointments(res);
        },
        (res) => {
          this._appointmentState.setLoading(false);
        }
      )
    );
  }

  loadClients(searchKey = ''): Observable<any> {
    return this._clientFacade.loadClients(0, searchKey);
  }

  addAppointment(clientId: string, model: AppointmentModel): Observable<any> {
    this._appointmentState.setLoading(true);

    return this._api.carate(clientId, model).pipe(
      tap(
        (res) => {
          this._appointmentState.addAppointment(res);
          this._appointmentState.setLoading(false);
        },
        (res) => {
          this._appointmentState.setLoading(false);
        }
      )
    );
  }

  updateAppointment(id: number, model: AppointmentModel): Observable<any> {
    this._appointmentState.setLoading(true);

    return this._api.update(id, model).pipe(
      tap(
        (res) => {
          this._appointmentState.updateAppointment(id, res);
          this._appointmentState.setLoading(false);
        },
        (res) => {
          this._appointmentState.setLoading(false);
        }
      )
    );
  }

  deleteAppointment(id: number): Observable<any> {
    this._appointmentState.setLoading(true);

    return this._api.delete(id).pipe(
      tap(
        (res) => {
          this._appointmentState.deleteAppointment(id);
          this._appointmentState.setLoading(false);
        },
        (res) => {
          this._appointmentState.setLoading(false);
        }
      )
    );
  }

  setModalState(data: 0 | 1 | 2): void {
    this._appointmentState.setModalState(data);
  }

  setSelectedAppointment(data): void{
    this._appointmentState.setSelectedAppointment(data);
  }

  setActiveTap(data: number): void {
    this._appointmentState.setActiveTap(data);
  }

  selectClient(client: ClientResource): void {
    this._appointmentState.setSelectedClient(client);
  }
}

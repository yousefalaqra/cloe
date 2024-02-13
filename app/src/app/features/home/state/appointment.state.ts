import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClientResource } from '../../clients/resources/client.resource';
import { AppointmentResource } from '../resources/appointment.resource';

@Injectable()
export class AppointmentState {
  private appointments = new BehaviorSubject<Array<AppointmentResource>>([]);
  private loading = new BehaviorSubject<boolean>(false);

  private taps = new BehaviorSubject<
    Array<{ id: number; title: string; active: boolean }>
  >([
    { id: 0, title: 'حدد العميل', active: true },
    { id: 1, title: 'تأكيد معلومات الجدولة', active: false },
  ]);

  private modalState = new BehaviorSubject<0 | 1 | 2>(0);
  private selectedAppointment = new BehaviorSubject<AppointmentResource>(null);

  private selectedclient = new BehaviorSubject<ClientResource>(null);

  getAppointments(): Observable<Array<AppointmentResource>> {
    return this.appointments.asObservable();
  }

  getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  getModalState(): Observable<0 | 1 | 2> {
    return this.modalState.asObservable();
  }

  getSelectedClient(): Observable<ClientResource> {
    return this.selectedclient.asObservable();
  }

  getModalTaps(): Observable<
    Array<{ id: number; title: string; active: boolean }>
  > {
    return this.taps.asObservable();
  }

  getSelectedAppointment(): Observable<AppointmentResource>{
    return this.selectedAppointment.asObservable()
  }

  setAppointments(data: Array<AppointmentResource>): void {
    this.appointments.next(data);
  }

  setLoading(data: boolean): void {
    this.loading.next(data);
  }

  setModalState(data: 0 | 1 | 2): void {
    this.modalState.next(data);
  }

  setSelectedClient(client: ClientResource): void {
    this.selectedclient.next(client);
  }

  setActiveTap(id: number): void {
    let value = this.taps.getValue();

    let newTaps = value.map((x) =>
      x.id == id ? { ...x, active: true } : { ...x, active: false }
    );

    this.taps.next(newTaps);
  }

  addAppointment(data: AppointmentResource): void {
    let current = this.appointments.getValue();

    this.appointments.next([...current, data]);
  }

  updateAppointment(id: number, data: AppointmentResource): void {
    let current = this.appointments.getValue();
    let newAppointments = current.map((x) => (x.id == id ? data : x));
    this.appointments.next(newAppointments);
  }

  deleteAppointment(id: number): void {
    let current = this.appointments.getValue();
    let newAppointments = current.filter((x) => x.id != id);
    this.appointments.next(newAppointments);
  }

  setSelectedAppointment(data: AppointmentResource): void{
    this.selectedAppointment.next(data);
  }
}

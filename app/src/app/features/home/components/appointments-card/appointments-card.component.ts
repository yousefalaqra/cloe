import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeFacade } from '../../home.facade';
import { AppointmentResource } from '../../resources/appointment.resource';

@Component({
  selector: 'appointments-card',
  templateUrl: './appointments-card.component.html',
  styleUrls: ['./appointments-card.component.scss'],
})
export class AppointmentsCardComponent implements OnInit, OnDestroy {
  subscriptions$: Array<Subscription> = [];

  loading: boolean;
  appointments: Array<AppointmentResource>;

  showAddModal: boolean = true;

  timeFilter: '0' | '24' | '168' | '730' = '24';
  constructor(private _homeFacade: HomeFacade, private _router: Router) {}

  ngOnInit() {
    this.subscriptions$.push(
      this._homeFacade.loading$.subscribe((x) => (this.loading = x)),
      this._homeFacade.appointments$.subscribe((x) => (this.appointments = x)),
      this._homeFacade.loadAppointments().subscribe()
    );
  }

  onAdd(): void {
    this._homeFacade.setModalState(1);
  }

  isToday(a) {
    let date = new Date(a);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  onDeleteAppointment(id: number) {
    this.subscriptions$.push(
      this._homeFacade.deleteAppointment(id).subscribe()
    );
  }

  onCheckProfile(date: AppointmentResource): void {
    this._router.navigate([
      `client/profile/${date.client.clientId}/${date.client.templateId}`,
    ]);
  }

  onRefresh(): void {
    this.subscriptions$.push(
      this._homeFacade.loadAppointments(Number(this.timeFilter)).subscribe()
    );
  }

  onFilterChanges(data): void {
    this.subscriptions$.push(
      this._homeFacade.loadAppointments(Number(this.timeFilter)).subscribe()
    );
  }

  onEdit(data: AppointmentResource): void {
    this._homeFacade.setSelectedAppointment(data);
    this._homeFacade.setModalState(2);
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }
}

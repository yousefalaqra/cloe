import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClientResource } from 'src/app/features/clients/resources/client.resource';
import { HomeFacade } from '../../home.facade';
import { AppointmentModel } from '../../models/appointment.model';

@Component({
  selector: 'appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.scss'],
})
export class AppointmentModalComponent implements OnInit, OnDestroy {
  showModal: boolean;

  date: Array<Date>;
  status: '0' | '1' | '2' = '0';
  // confirmed = 0,
  // pending  = 1,
  // canceled = 2

  subscriptions$: Array<Subscription> = [];
  clientsLoading: boolean;
  clients: Array<ClientResource>;

  taps: Array<{ id: number; title: string; active: boolean }>;
  activeTap: { id: number; title: string; active: boolean };

  searchControl = new FormControl('');

  selectedClient: ClientResource;

  constructor(private _homeFacade: HomeFacade) {}

  ngOnInit() {
    this.subscriptions$.push(
      this._homeFacade.selectedClient$.subscribe(
        (x) => (this.selectedClient = x)
      ),
      this.searchControl.valueChanges.subscribe((x) => {
        if (x == '')
          this.subscriptions$.push(this._homeFacade.loadClients().subscribe());
      }),
      this._homeFacade.modalTaps$.subscribe((x) => {
        this.taps = x;
        this.activeTap = x.find((x) => x.active == true);
      }),
      this._homeFacade.clientsLoading$.subscribe(
        (x) => (this.clientsLoading = x)
      ),
      this._homeFacade.clinet$.subscribe((x) => (this.clients = x)),
      this._homeFacade.loadClients().subscribe(),
      this._homeFacade.modalState$.subscribe((x) => {
        if (x == 1) {
          this.showModal = true;
        } else {
          this.showModal = false;
        }
      })
    );
  }

  onActivateTap(id: number): void {
    if (id == 1 && !this.selectedClient) return;
    this._homeFacade.setActiveTap(id);
  }

  onCancel(): void {
    this._homeFacade.setModalState(0);
    this._homeFacade.selectClient(null);
  }

  searchClients(): void {
    let value = this.searchControl.value;
    if (value)
      this.subscriptions$.push(this._homeFacade.loadClients(value).subscribe());
  }

  onSelectClient(client: ClientResource): void {
    this._homeFacade.selectClient(client);
    this._homeFacade.setActiveTap(1);
  }

  onDateChange(dat): void {
    console.log('date: ', dat);
  }

  onAddAppointment(): void {
    let startTime = this.date[0];
    let endTime = this.date[1];

    let status = Number(this.status);

    let model: AppointmentModel = {
      endTime: endTime,
      startTime: startTime,
      status: status,
    };

    this.subscriptions$.push(
      this._homeFacade
        .addAppointment(this.selectedClient.clientId, model)
        .subscribe()
    );

    this.onCancel();
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }
}

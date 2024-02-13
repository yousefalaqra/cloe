import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClientFacade } from 'src/app/features/clients/clients.facade';
import { ClientResource } from 'src/app/features/clients/resources/client.resource';

@Component({
  selector: 'observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss'],
})
export class ObservationsComponent implements OnInit, OnDestroy {
  client: ClientResource;

  showModal: boolean = false;
  isUpdate: boolean = false;
  observeDate: Date = new Date(Date.now());
  observationFromControl = '';
  observationId: number;

  subscriptions$: Array<Subscription> = [];
  constructor(private _clientFacade: ClientFacade) {}

  ngOnInit() {
    this.subscriptions$.push(
      this._clientFacade.selectedClient$.subscribe((x) => (this.client = x))
    );
  }

  onAdd(): void {
    this.showModal = true;
  }

  onSaveObservation(): void {
    if (this.observationFromControl != '' && this.observeDate) {
      if (!this.isUpdate) {
        this.subscriptions$.push(
          this._clientFacade
            .addClientObservation(this.client.clientId, {
              observation: this.observationFromControl,
              observationDate: this.observeDate,
            })
            .subscribe()
        );
      } else {
        this.subscriptions$.push(
          this._clientFacade
            .updateClientObservation(this.client.clientId, this.observationId, {
              observation: this.observationFromControl,
              observationDate: this.observeDate,
            })
            .subscribe()
        );
      }
    }

    this.observationFromControl = '';
    this.isUpdate = false;
    this.showModal = false;
  }

  handleModelCancel(): void {
    this.showModal = false;
  }

  onRemoveObservation(): void {
    this.subscriptions$.push(
      this._clientFacade
        .removeClientObservation(this.client.clientId, this.observationId)
        .subscribe()
    );
    this.showModal = false;
    this.isUpdate = false;
    this.observationFromControl = '';
  }

  onSelectObservation(date: Date, observation: string, observationId: number) {
    this.isUpdate = true;
    this.observeDate = date;
    this.observationFromControl = observation;
    this.observationId = observationId;

    this.showModal = true;
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }
}

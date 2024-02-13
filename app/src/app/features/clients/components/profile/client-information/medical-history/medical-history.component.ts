import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClientFacade } from 'src/app/features/clients/clients.facade';
import { ClientResource } from 'src/app/features/clients/resources/client.resource';
import { PresenterComponent } from 'src/app/shared/joI/src/data-presenter/presenter/presenter.component';

@Component({
  selector: 'medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.scss'],
})
export class MedicalHistoryComponent implements OnInit, OnDestroy {
  subscriptions$: Array<Subscription> = [];

  client: ClientResource;

  @ViewChild('diseasesPresenter') diseasesPresenter: PresenterComponent;
  diseasesEditMode: boolean = false;
  diseasesFormControl: FormControl;

  @ViewChild('medicationPresenter') medicationPresenter: PresenterComponent;
  medicationPresenterEditMode: boolean = false;
  medicationPresenterFormControl: FormControl;

  constructor(private _clientFacade: ClientFacade) {}

  ngOnInit() {
    this.diseasesFormControl = new FormControl('', Validators.required);
    this.diseasesFormControl.disable();

    this.medicationPresenterFormControl = new FormControl('', Validators.required);
    this.medicationPresenterFormControl.disable();

    this.subscriptions$.push(
      this._clientFacade.selectedClient$.subscribe((x) => {
        console.log(x);

        this.client = x;
      })
    );
  }

  requestDiseasesEdit(e: boolean): void {
    this.diseasesEditMode = e;
    this.diseasesPresenter.toggleEdit(e);
    if (e) this.diseasesFormControl.enable();
    if (!e) {
      this.diseasesFormControl.disable();
      this.diseasesFormControl.setValue('');
    }
  }

  onSaveDiseases(e): void {
    if (this.diseasesFormControl.valid) {
      this.subscriptions$.push(
        this._clientFacade
          .addClientDisease(
            this.client.clientId,
            this.diseasesFormControl.value
          )
          .subscribe()
      );
    }
    this.diseasesEditMode = false;
    this.diseasesPresenter.toggleEdit(false);
    this.diseasesFormControl.disable();
    this.diseasesFormControl.setValue('');
  }

  onDeleteDisease(id: number): void {
    this.subscriptions$.push(
      this._clientFacade
        .removeClientDisease(this.client.clientId, id)
        .subscribe()
    );
  }

  requestMedicationEdit(e: boolean): void {
    this.medicationPresenterEditMode = e;
    this.medicationPresenter.toggleEdit(e);
    if (e) this.medicationPresenterFormControl.enable();
    if (!e) {
      this.medicationPresenterFormControl.disable();
      this.medicationPresenterFormControl.setValue('');
    }
  }

  onSaveMedication(e): void {
    if (this.medicationPresenterFormControl.valid) {
      this.subscriptions$.push(
        this._clientFacade
          .addClientMedication(
            this.client.clientId,
            this.medicationPresenterFormControl.value
          )
          .subscribe()
      );
    }
    this.medicationPresenterEditMode = false;
    this.medicationPresenter.toggleEdit(false);
    this.medicationPresenterFormControl.disable();
    this.medicationPresenterFormControl.setValue('');
  }

  onDeleteMedication(id: number): void {
    this.subscriptions$.push(
      this._clientFacade
        .removeClientMedication(this.client.clientId, id)
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }
}

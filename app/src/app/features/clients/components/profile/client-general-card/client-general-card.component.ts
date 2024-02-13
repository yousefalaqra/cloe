import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { Subscription } from 'rxjs';
import { PresenterComponent } from 'src/app/shared/joI/src/data-presenter/presenter/presenter.component';
import { ClientFacade } from '../../../clients.facade';
import { ClientResource } from '../../../resources/client.resource';

@Component({
  selector: 'client-general-card',
  templateUrl: './client-general-card.component.html',
  styleUrls: ['./client-general-card.component.scss'],
})
export class ClientGeneralCardComponent implements OnInit, OnDestroy {
  @Input() client: ClientResource;
  clientGender = '1';
  genderSelectOpen = false;
  genderEditMode = false;
  @ViewChild('genderPresenter') genderPresenter: PresenterComponent;

  birthDate: Date;
  birthDateSelectOpen = false;
  birthDateEditMode = false;
  @ViewChild('birthDatePicker') endDatePicker: NzDatePickerComponent;
  @ViewChild('birthDatePresenter') birthDatePresenter: PresenterComponent;

  clientPhoneNumberControl: FormControl;
  phoneNumberEditMode = false;
  @ViewChild('phoneNumberPresenter') phoneNumberPresenter: PresenterComponent;

  @ViewChild('workplacePresenter') workplacePresenter: PresenterComponent;
  clientWorkplaces: Array<string>;
  workplacesSelectOpen = false;
  workplacesEditMode = false;

  subscriptions$: Array<Subscription> = [];

  constructor(private _clientFacde: ClientFacade) {}

  ngOnInit() {
    this.clientPhoneNumberControl = new FormControl(this.client?.phoneNumber);
    this.birthDate = this.client?.birthDate;
    this.clientGender = this.client?.gender?.toString();

    this.clientWorkplaces = [
      ...this.client.workPLacesIds.map((x) => x.toString()),
    ];
  }

  onGender(value: string) {
    let newGender = Number(value);

    this.subscriptions$.push(
      this._clientFacde
        .updateClientGender(this.client.clientId, newGender)
        .subscribe()
    );

    this.genderEditMode = false;
    this.genderSelectOpen = false;
    this.genderPresenter.toggleEdit(false);
  }

  requestGenderEdit(e: boolean): void {
    this.genderSelectOpen = e;
    this.genderEditMode = e;
    this.genderPresenter.toggleEdit(e);
  }

  requestBirthDateEdit(e: boolean): void {
    if (e) {
      this.endDatePicker.open();
    } else {
      this.endDatePicker.close();
    }
    this.birthDateEditMode = e;
    this.birthDatePresenter.toggleEdit(e);
  }

  requestPhoneNumberEdit(e: boolean): void {
    this.phoneNumberPresenter.toggleEdit(e);
    this.phoneNumberEditMode = e;

    if (e == true) {
      this.clientPhoneNumberControl.enable();
    } else {
      this.clientPhoneNumberControl.disable();
    }
  }

  onSavePhoneNumber(): void {
    this.subscriptions$.push(
      this._clientFacde
        .updateClientPhone(
          this.client.clientId,
          this.clientPhoneNumberControl.value
        )
        .subscribe()
    );
    this.phoneNumberPresenter.toggleEdit(false);
    this.phoneNumberEditMode = false;
    this.clientPhoneNumberControl.disable();
  }

  onUpdateBirthDate(): void {
    this.subscriptions$.push(
      this._clientFacde
        .updateClientBirthDate(this.client.clientId, this.birthDate)
        .subscribe()
    );

    this.endDatePicker.close();
    this.birthDateEditMode = false;
    this.birthDatePresenter.toggleEdit(false);
  }

  requestWorkplaceEdit(e: boolean): void {
    this.workplacesSelectOpen = e;
    this.workplacesEditMode = e;
    this.workplacePresenter.toggleEdit(e);
  }

  onWorkplaceChange(value: Array<string>) {
    let ids = value.filter((x) => typeof x == 'string').map((x) => Number(x));

    this.subscriptions$.push(
      this._clientFacde
        .updateClientWorkplaces(this.client.clientId, ids)
        .subscribe()
    );
    this.workplacesSelectOpen = false;
    this.workplacesEditMode = false;
    this.workplacePresenter.toggleEdit(false);
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }
}

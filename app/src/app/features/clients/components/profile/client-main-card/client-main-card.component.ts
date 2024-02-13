import { taggedTemplate } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClientFacade } from '../../../clients.facade';
import { ClientResource } from '../../../resources/client.resource';

@Component({
  selector: 'client-main-card',
  templateUrl: './client-main-card.component.html',
  styleUrls: ['./client-main-card.component.scss'],
})
export class ClientMainCardComponent implements OnInit, OnDestroy {
  @Input() client: ClientResource;

  clientNameFormControl: FormControl;
  isUpdate: boolean = false;

  clientTagFormControl: FormControl;
  isShowAddTagFrom: boolean = false;

  subscriptions$: Array<Subscription> = [];

  constructor(
    private _clientFacade: ClientFacade,
  ) {}

  ngOnInit() {
    this.clientNameFormControl = new FormControl(
      this.client.fullName,
      Validators.required
    );

    this.clientTagFormControl = new FormControl('', Validators.required);
  }

  onEditName(): void {
    this.isUpdate = true;
  }

  onFullNameFocusOut(): void {
    this.isUpdate = false;

    if (
      this.client.fullName != this.clientNameFormControl.value ||
      this.clientNameFormControl.valid
    )
      this.subscriptions$.push(
        this._clientFacade
          .updateClientFullName(
            this.client.clientId,
            this.clientNameFormControl.value
          )
          .subscribe()
      );
  }

  onAddTag(): void {
    this.isShowAddTagFrom = true;
  }

  onTagFocusOut(): void {
    this.isShowAddTagFrom = false;

    if (this.clientTagFormControl.valid) {
      this.subscriptions$.push(
        this._clientFacade
          .addClientTag(this.client.clientId, this.clientTagFormControl.value)
          .subscribe()
      );
    }
  }

  onDeleteTag(tagId: number): void {
    this.subscriptions$.push(
      this._clientFacade
        .removeClientTag(this.client.clientId, tagId)
        .subscribe()
    );
  }

  confirmDelete(): void {
    this.subscriptions$.push(
      this._clientFacade.removeClient(this.client.clientId).subscribe()
    );
  }
  

  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }
}

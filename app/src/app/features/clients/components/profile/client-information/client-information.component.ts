import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PresenterComponent } from 'src/app/shared/joI/src/data-presenter/presenter/presenter.component';
import { ClientFacade } from '../../../clients.facade';
import { ClientResource } from '../../../resources/client.resource';

@Component({
  selector: 'client-information',
  templateUrl: './client-information.component.html',
  styleUrls: ['./client-information.component.scss'],
})
export class ClientInformationComponent implements OnInit, OnDestroy {
  subscriptions$: Array<Subscription> = [];

  client: ClientResource;

  constructor(private _clientFacade: ClientFacade) {}

  ngOnInit() {
    this.subscriptions$.push(
      this._clientFacade.selectedClient$.subscribe((x) => {
        this.client = x;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }
}

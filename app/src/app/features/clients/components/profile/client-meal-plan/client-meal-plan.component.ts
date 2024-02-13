import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ClientFacade } from '../../../clients.facade';
import { ClientResource } from '../../../resources/client.resource';

@Component({
  selector: 'client-meal-plan',
  templateUrl: './client-meal-plan.component.html',
  styleUrls: ['./client-meal-plan.component.scss'],
})
export class ClientMealPlanComponent implements OnInit, OnDestroy {
  subscriptions$: Array<Subscription> = [];

  selectedClient: ClientResource;

  constructor(private _clientFacade: ClientFacade) {}

  ngOnInit() {
    this.subscriptions$.push(
      this._clientFacade.selectedClient$.subscribe(
        (x) => (this.selectedClient = x)
      )
    );
  }
  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }
}

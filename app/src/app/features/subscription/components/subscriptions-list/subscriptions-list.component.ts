import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubscriptionResource } from '../../resources/subscription.resource';
import { SubscriptionsFacade } from '../../subscription.faceade';

@Component({
  selector: 'subscriptions-list',
  templateUrl: './subscriptions-list.component.html',
  styleUrls: ['./subscriptions-list.component.scss'],
})
export class SubscriptionsListComponent implements OnInit, OnDestroy {
  subscriptions: Array<SubscriptionResource>;
  loading: boolean;

  observablesSubscriptions$: Array<Subscription> = [];

  constructor(private _subscriptionFacade: SubscriptionsFacade) {}

  ngOnInit() {
    this.observablesSubscriptions$.push(
      this._subscriptionFacade.subscriptions$.subscribe(
        (x) => (this.subscriptions = x)
      ),
      this._subscriptionFacade.loading$.subscribe((x) => (this.loading = x)),
      this._subscriptionFacade.loadSubscriptions().subscribe()
    );
  }

  ngOnDestroy(): void {
    this.observablesSubscriptions$.forEach((x) => x.unsubscribe());
  }
}

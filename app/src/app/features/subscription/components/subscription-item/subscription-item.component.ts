import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubscriptionResource } from '../../resources/subscription.resource';
import { SubscriptionsFacade } from '../../subscription.faceade';

@Component({
  selector: 'subscription-item',
  templateUrl: './subscription-item.component.html',
  styleUrls: ['./subscription-item.component.scss'],
})
export class SubscriptionItemComponent implements OnInit, OnDestroy {
  @Input() subscription: SubscriptionResource;
  observablesSubscriptions$: Array<Subscription> = [];

  constructor(private _subscriptionFacade: SubscriptionsFacade) {}

  ngOnInit() {}

  onStatusChange(data): void {
    this.observablesSubscriptions$.push(
      this._subscriptionFacade
        .updateSubscriptionsStatus(this.subscription.id)
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.observablesSubscriptions$.forEach((x) => x.unsubscribe());
  }
}

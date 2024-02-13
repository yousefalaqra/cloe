import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SubscriptionApi } from './api/subscriptions.api';
import { SubscriptionModel } from './models/subscription.model';
import { SubscriptionResource } from './resources/subscription.resource';
import { SubscriptionState } from './state/subscription.state';

@Injectable()
export class SubscriptionsFacade {
  constructor(
    private _subscriptionState: SubscriptionState,
    private _api: SubscriptionApi
  ) {}

  get subscriptions$(): Observable<Array<SubscriptionResource>> {
    return this._subscriptionState.getSubscriptions();
  }

  get loading$(): Observable<boolean> {
    return this._subscriptionState.getLoading();
  }

  loadSubscriptions(): Observable<Array<SubscriptionResource>> {
    this._subscriptionState.setLoading(true);

    return this._api.getSubscriptions().pipe(
      tap(
        (res) => {
          this._subscriptionState.setSubscriptions(res);
          this._subscriptionState.setLoading(false);
        },
        () => {
          this._subscriptionState.setLoading(false);
        }
      )
    );
  }

  addSubscription(model: SubscriptionModel): Observable<SubscriptionResource> {
    let tempId = new Date().getTime();
    this._subscriptionState.addSubscriptions(model, tempId);

    return this._api.createSubscription(model).pipe(
      tap(
        (res) => {
          this._subscriptionState.updateSubscription(tempId, res);
        },
        () => {}
      )
    );
  }

  loadIncome(): Observable<{
    totalIncome: number;
    paidIncome: number;
    debtsIncome: number;
  }>{
    return this._api.getIncome()
  }

  updateSubscriptionsStatus(id: number): Observable<SubscriptionResource> {
    this._subscriptionState.UpdateSubscriptionStatus(id);

    return this._api.updateSubscriptionsStatus(id);
  }
}

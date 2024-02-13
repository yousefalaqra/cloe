import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SubscriptionModel } from '../models/subscription.model';
import { SubscriptionResource } from '../resources/subscription.resource';

@Injectable()
export class SubscriptionState {
  private subscriptions = new BehaviorSubject<Array<SubscriptionResource>>([]);
  private loading = new BehaviorSubject<boolean>(false);

  getSubscriptions(): Observable<Array<SubscriptionResource>> {
    return this.subscriptions.asObservable();
  }

  addSubscriptions(model: SubscriptionModel, tempId: number): void {
    let resource: SubscriptionResource = {
      cost: model.cost,
      id: tempId,
      period: model.period,
      disabled: false,
    };

    let current = this.subscriptions.getValue();

    this.subscriptions.next([...current, resource]);
  }

  updateSubscription(id: number, resource: SubscriptionResource): void {
    let current = this.subscriptions.getValue();
    let newSubscriptions = current.map((x) => (x.id == id ? resource : x));
    this.subscriptions.next(newSubscriptions);
  }

  setSubscriptions(subscriptions: Array<SubscriptionResource>): void {
    this.subscriptions.next(subscriptions);
  }

  UpdateSubscriptionStatus(id: number): void {
    let current = this.subscriptions.getValue();

    let newSubscriptions = current.map((x) =>
      x.id == id ? { ...x, disabled: !x.disabled } : x
    );

    this.subscriptions.next(newSubscriptions);
  }

  getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  setLoading(value: boolean): void {
    this.loading.next(value);
  }
}

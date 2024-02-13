import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SubscriptionModel } from '../models/subscription.model';
import { SubscriptionResource } from '../resources/subscription.resource';

@Injectable()
export class SubscriptionApi {
  private readonly API = `${environment.api}/Subscription`;

  constructor(private _http: HttpClient) {}

  getSubscriptions(): Observable<Array<SubscriptionResource>> {
    return this._http.get(this.API).pipe(map((res: any) => res.result));
  }

  getIncome(): Observable<{
    totalIncome: number;
    paidIncome: number;
    debtsIncome: number;
  }> {
    return this._http.get(`${this.API}/income`).pipe(map((res: any) => res.result));
  }

  createSubscription(
    model: SubscriptionModel
  ): Observable<SubscriptionResource> {
    return this._http.post(this.API, model).pipe(map((res: any) => res.result));
  }

  updateSubscriptionsStatus(id: number): Observable<SubscriptionResource> {
    return this._http
      .patch(`${this.API}/${id}`, {})
      .pipe(map((res: any) => res.result));
  }
}

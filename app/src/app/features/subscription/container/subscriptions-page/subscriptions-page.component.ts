import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SubscriptionModel } from '../../models/subscription.model';
import { SubscriptionsFacade } from '../../subscription.faceade';

@Component({
  selector: 'subscriptions-page',
  templateUrl: './subscriptions-page.component.html',
  styleUrls: ['./subscriptions-page.component.scss'],
})
export class SubscriptionsPageComponent implements OnInit, OnDestroy {
  showAddModal: boolean = false;

  subscriptionForm: FormGroup;

  observablesSubscriptions$: Array<Subscription> = [];

  income: {
    totalIncome: number;
    paidIncome: number;
    debtsIncome: number;
  };

  constructor(
    private _fb: FormBuilder,
    private _subscriptionFacade: SubscriptionsFacade
  ) {
    this.subscriptionForm = this._fb.group({
      cost: [''],
      period: ['730'],
    });
  }

  ngOnInit() {
    this.observablesSubscriptions$.push(
      this._subscriptionFacade.loadIncome().subscribe((x) => (this.income = x))
    );
  }

  onAddSubscription(): void {
    let cost = this.subscriptionForm.get('cost').value;
    let period = this.subscriptionForm.get('period').value;

    let model: SubscriptionModel = {
      cost: cost,
      period: period,
    };

    this.observablesSubscriptions$.push(
      this._subscriptionFacade.addSubscription(model).subscribe()
    );

    this.showAddModal = false;
  }

  ngOnDestroy(): void {
    this.observablesSubscriptions$.forEach((x) => x.unsubscribe());
  }
}

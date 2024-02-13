import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SubscriptionResource } from 'src/app/features/subscription/resources/subscription.resource';
import { ClientFacade } from '../../../clients.facade';
import { ClientSubscriptionsResource } from '../../../resources/client-subscriptions.resource';
import { ClientResource } from '../../../resources/client.resource';

@Component({
  selector: 'client-analysis',
  templateUrl: './client-analysis.component.html',
  styleUrls: ['./client-analysis.component.scss'],
})
export class ClientAnalysisComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  observablesSubscriptions$: Array<Subscription> = [];

  client: ClientResource;
  currentSubscription: ClientSubscriptionsResource;

  toggleSubscriptionsList: boolean = false;

  loading: boolean = false;

  subscriptions: Array<SubscriptionResource>;
  totalDues: number = 0;
  totalPayment: number = 0;

  fillerWidth: number = 0;
  fillerColor: string;

  paymentControl = new FormControl('');

  showPaymentModal: boolean = false;

  constructor(private _clientFacade: ClientFacade) {}

  ngOnInit() {
    this.observablesSubscriptions$.push(
      this._clientFacade.subscriptionLoading$.subscribe(
        (x) => (this.loading = x)
      ),
      this._clientFacade
        .loadSubscriptions()
        .subscribe((x) => (this.subscriptions = x)),
      this._clientFacade.selectedClient$.subscribe((x) => {
        this.client = x;
        this.totalDues = 0;
        this.totalPayment = 0;
        this.client.dues.forEach((y) => {
          this.totalDues += y.amount;
        });
        this.client.payments.forEach((y) => {
          this.totalPayment += y.amount;
        });
        this.currentSubscription = x.clientSubscriptions.find(
          (x) => (x.isCurrent = true)
        );
      })
    );
  }

  ngAfterViewInit(): void {
    this.observablesSubscriptions$.push(
      this._clientFacade.metaSubscription$.subscribe((x: any) => {
        if (x != null) {
          let percentage = x.days / x.daysPeriod;
          this.fillerWidth = 100 - percentage * 100;
          this.fillerColor = x.color;
        }
      })
    );
  }

  onDeleteSubscription(): void {
    this.observablesSubscriptions$.push(
      this._clientFacade
        .deleteClientSubscription(
          this.client.clientId,
          this.client.clientSubscriptions[0].id
        )
        .subscribe()
    );
  }

  onAddPayment(): void {
    let amount = this.paymentControl.value;
    if (amount)
      this.observablesSubscriptions$.push(
        this._clientFacade
          .addClientPayment(this.client.clientId, amount)
          .subscribe()
      );
  }

  transform(value: any, args?: any): any {
    switch (value) {
      case 168:
        return 'أسبوع';

      case 730:
        return 'شهر';

      case 8760:
        return 'سنة';
    }
  }

  onAddSubscription(subscription: SubscriptionResource): void {
    this.observablesSubscriptions$.push(
      this._clientFacade
        .addClientSubscription(this.client.clientId, subscription.id)
        .subscribe()
    );
  }

  deletePayment(id: number): void {
    this.observablesSubscriptions$.push(
      this._clientFacade
        .deleteClientPayment(this.client.clientId, id)
        .subscribe()
    );
  }

  updatePayment(data: { id: number; value: number }): void {
    this.observablesSubscriptions$.push(
      this._clientFacade
        .updateClientPayment(this.client.clientId, data.id, data.value)
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.observablesSubscriptions$.forEach((x) => x.unsubscribe());
  }
}

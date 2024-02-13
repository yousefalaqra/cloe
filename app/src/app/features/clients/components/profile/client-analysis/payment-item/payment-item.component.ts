import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClientFacade } from 'src/app/features/clients/clients.facade';
import { ClientPaymentResource } from 'src/app/features/clients/resources/client-payment.resource';

@Component({
  selector: 'payment-item',
  templateUrl: './payment-item.component.html',
  styleUrls: ['./payment-item.component.scss'],
})
export class PaymentItemComponent implements OnInit, OnDestroy {
  @Input() payment: ClientPaymentResource;
  @Input() clinetId: string;
  control: FormControl;
  disabledInput = true;

  subscriptions$: Array<Subscription> = [];

  @Output() onDeletePayment = new EventEmitter<number>();
  @Output('onUpdatePayment') updatePayment = new EventEmitter<{
    id: number;
    value: number;
  }>();

  constructor(private _clientFacade: ClientFacade) {}

  ngOnInit() {
    this.control = new FormControl(this.payment.amount);
    this.control.disable();
  }

  onEdit() {
    this.control.enable();
  }

  onUpdatePayment(): void {
    let amount = this.control.value;

    if (amount)
      if (amount != this.payment.amount)
        this.updatePayment.emit({ id: this.payment.id, value: amount });

    this.control.disable();
  }

  onDelete() {
    this.onDeletePayment.emit(this.payment.id);
  }
  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }
}

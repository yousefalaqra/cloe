import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientFacade } from '../../clients.facade';
import { ClientResource } from '../../resources/client.resource';

@Component({
  selector: 'client-list-item',
  templateUrl: './client-list-item.component.html',
  styleUrls: ['./client-list-item.component.scss'],
})
export class ClientListItemComponent implements OnInit, OnDestroy {
  @Input('client') client: ClientResource;
  @Output() onSelect = new EventEmitter<ClientResource>()

  subscriptions: Array<Subscription> = [];
  lang: 'ar' | 'en';

  constructor(private _clinetFacade: ClientFacade) {}

  ngOnInit() {
    this.subscriptions.push(
      this._clinetFacade.lang$.subscribe((x) => (this.lang = x))
    );

  }

  onClientClicked(){
    this.onSelect.emit(this.client);
    // this._router.navigate([`client/profile/${this.client.clientId}/${this.client.templateId}`])
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe())
  }
}

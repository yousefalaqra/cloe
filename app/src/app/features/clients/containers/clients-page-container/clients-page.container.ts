import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientFacade } from '../../clients.facade';

@Component({
  selector: 'clients-page-container',
  templateUrl: './clients-page.container.html',
  styleUrls: ['./clients-page.container.scss'],
})
export class ClientsPageContainer implements OnInit, OnDestroy {
  subscriptions: Array<Subscription> = [];
  lang: 'ar' | 'en';

  constructor(private _clientFacade: ClientFacade) {}

  ngOnInit() {
    this.subscriptions.push(
      this._clientFacade.lang$.subscribe((x) => (this.lang = x))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}

import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientFacade } from '../../clients.facade';
import { ClientResource } from '../../resources/client.resource';
// To Know is to know you know nothing.

// المعرفة ان تعرف انك لاتعرف شي
@Component({
  selector: 'fs-profile-component',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss'],
})
export class ClientProfileComponent implements OnInit, OnDestroy {
  clinetId: string;
  client: ClientResource;

  loading: boolean = true;

  subscriptions$: Array<Subscription> = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _clientFacade: ClientFacade
  ) {}

  ngOnInit(): void {
    this.subscriptions$.push(
      this._clientFacade.loadingClientDetails$.subscribe(
        (x) => (this.loading = x)
      )
    );

    this.subscriptions$.push(
      this._clientFacade.selectedClient$.subscribe(
        (x: ClientResource) => (this.client = x)
      ),
      this._activatedRoute.params.subscribe((x) => {
        this.clinetId = x['clientId'];
        console.log('clientId: ', x['clientId']);
      }),

      this._clientFacade.getClientById(this.clinetId).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }
}

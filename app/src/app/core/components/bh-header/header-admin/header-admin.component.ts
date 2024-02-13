import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppFacade } from 'src/app/core/app.facade';

@Component({
  selector: 'header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss'],
})
export class HeaderAdminComponent implements OnInit, OnDestroy {
  language: 'ar' | 'en';
  subscriptions: Array<Subscription> = [];
  name: string;
  constructor(private _appFacade: AppFacade) {}

  ngOnInit() {
    this.name = localStorage.getItem('username')
    this.subscriptions.push(
      this._appFacade.language$.subscribe((x) => (this.language = x))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}

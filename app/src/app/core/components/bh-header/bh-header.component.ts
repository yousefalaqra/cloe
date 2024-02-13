import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppFacade } from '../../app.facade';

@Component({
  selector: 'bh-header',
  templateUrl: './bh-header.component.html',

  styleUrls: ['./bh-header.component.scss'],
})
export class BhHeader implements OnInit, OnDestroy {
  subscriptions: Array<Subscription> = [];
  toggled: boolean;
  language: 'ar' | 'en';
  constructor(private _appFacade: AppFacade) {}

  ngOnInit() {
    this.subscriptions.push(
      this._appFacade.watchAppMenu$.subscribe((x) => (this.toggled = x))
    );
    this.subscriptions.push(
      this._appFacade.language$.subscribe((x) => (this.language = x))
    );
    this._appFacade.setDefaultLanguage();
  }

  onToggle() {
    this._appFacade.toggleAppMenu();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}

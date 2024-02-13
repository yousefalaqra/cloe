import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppFacade } from '../core/app.facade';

@Component({
  selector: 'app-root',
  templateUrl: './bh-app.component.html',
  styleUrls: ['./bh-app.component.scss'],
})
export class BhAppComponent implements OnDestroy, OnInit {
  language: 'ar' | 'en';
  toggled: boolean;

  subscriptions: Array<Subscription> = [];


  constructor(private _appFacade: AppFacade) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this._appFacade.watchAppMenu$.subscribe((x) => (this.toggled = x)),
      this._appFacade.language$.subscribe((x) => (this.language = x))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}

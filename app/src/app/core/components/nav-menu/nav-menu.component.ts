import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppFacade } from '../../app.facade';
import {Event, RouterEvent} from '@angular/router'

@Component({
  selector: 'bh-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit, OnDestroy {
  toggled: boolean = true;
  subscriptions: Array<Subscription> = [];
  language: 'ar' | 'en';

  currentPage: number;

  constructor(private _appFacade: AppFacade) {}

  ngOnInit() {
    this.subscriptions.push(
      this._appFacade.watchAppMenu$.subscribe((x) => (this.toggled = x))
    );
    this.subscriptions.push(
      this._appFacade.language$.subscribe((x) => (this.language = x))
    );

    this.subscriptions.push(
      this._appFacade.currentPage$.subscribe(x => {
        this.currentPage = x.id;
        let element = document.getElementById(`${x.id}`)
        element.scrollIntoView({behavior: 'smooth'}) 
      }),
      this._appFacade.onRouteChange$.subscribe((x: RouterEvent) => 
        {console.log('current-route: ', x)
        this._appFacade.onNavigationStart(x.url)
      })
    )
  }

  onMenuItem(item: number){
    this._appFacade.onMenuItem(item);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}

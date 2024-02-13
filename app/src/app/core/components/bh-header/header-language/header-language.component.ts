import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppFacade } from 'src/app/core/app.facade';

@Component({
  selector: 'header-language',
  templateUrl: './header-language.component.html',
  styleUrls: ['./header-language.component.scss'],
})
export class HeaderLanguageComponent implements OnInit, OnDestroy {
  subscriptions: Array<Subscription> = [];
  language: 'ar' | 'en';
  constructor(private _appFacade: AppFacade) {}

  ngOnInit() {
    this.subscriptions.push(
      this._appFacade.language$.subscribe((x) => (this.language = x))
    );
  }

  onLang(key: 'ar' | 'en'): void {
    this._appFacade.setLanguage(key);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }


}

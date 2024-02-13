import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, pipe } from 'rxjs';
import { AppState } from './state/app.state';
import { getItemByKey } from '../../environments/storage';
import { Event } from '@angular/router';
import { en_US, ar_EG, NzI18nService } from 'ng-zorro-antd/i18n';
import { AppApi } from './api/app.api';
import { tap } from 'rxjs/operators';

@Injectable()
export class AppFacade {
  constructor(
    private _appState: AppState,
    private _translateService: TranslateService,
    private _nzI18nService: NzI18nService,
    private _api: AppApi
  ) {}

  get watchAppMenu$(): Observable<boolean> {
    return this._appState.getWatchAppMenu();
  }

  get language$(): Observable<'ar' | 'en'> {
    return this._appState.getLanguage();
  }

  get loading$(): Observable<boolean> {
    return this._appState.getLoading();
  }

  get currentPage$(): Observable<{
    id: number;
    titleAR: string;
    titleEN: string;
    descAR: string;
    descEN: string;
  }> {
    return this._appState.getCurrentPage();
  }

  get onRouteChange$(): Observable<Event> {
    return this._appState.getNavigationStartEvent();
  }

  retranslatedItem(...key: string[]): Observable<string> {
    return this._translateService.get(key);
  }

  toggleAppMenu(): void {
    this._appState.toggleAppMenu();
  }

  setAppMenu(value: boolean): void {
    this._appState.settAppMenu(value);
  }

  setLanguage(key: 'ar' | 'en'): void {
    if (key == 'ar') this._nzI18nService.setLocale(ar_EG);
    if (key == 'en') this._nzI18nService.setLocale(en_US);

    this._translateService.use(key);
    this._appState.setLanguage(key);

    window.location.reload();
  }

  setDefaultLanguage(): void {
    // let lang = getItemByKey('language');

    // if (lang) {
    //   this._translateService.setDefaultLang(lang);
    //   this._appState.setLanguage(lang);

    //   if (lang == 'ar') this._nzI18nService.setLocale(ar_EG);
    //   if (lang == 'en') this._nzI18nService.setLocale(en_US);
    //   return;
    // }
    this._translateService.setDefaultLang('ar');
    this._appState.setLanguage('ar');
    this._nzI18nService.setLocale(ar_EG);
  }

  onMenuItem(item: number): void {
    this._appState.onMenuItem(item);
  }

  onNavigationStart(url: string): void {
    this._appState.onNavigation(url);
  }

  login(model: { emailAddress: string; password: string, username: string }): Observable<any> {
    this._appState.setLoading(true);

    return this._api.login(model).pipe(
      tap(
        (res: {
          user: {
            id: number;
            firstName: string;
            lastName: string;
            username: string;
            emailAddress: string;
            dateOfBirth: Date;
            phoneNumber: string;
            userType: number;
          };
          token: string;
        }) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.user.lastName);
          this.onMenuItem(0);
          this._appState.setLoading(false);
        },
        (res) => {
          this._appState.setLoading(false);
        }
      )
    );
  }
}

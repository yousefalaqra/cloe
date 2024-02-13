import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { getItemByKey, saveItem } from '../../../environments/storage';
import { Event, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable()
export class AppState {
  private watchAppMenu = new BehaviorSubject<boolean>(true);
  private language = new BehaviorSubject<'ar' | 'en'>(getItemByKey('language'));
  private currentPage = new BehaviorSubject<{
    id: number;
    titleAR: string;
    titleEN: string;
    descAR: string;
    descEN: string;
  }>({
    id: 0,
    titleAR: 'الصفحة الرئيسة',
    titleEN: 'Professional home page',
    descAR: 'تحقق من مواعيدك القادمة ونشاطك',
    descEN: 'Check your next appointments and your activity',
  });

  private loading = new BehaviorSubject<boolean>(false);

  constructor(private _router: Router) {}

  getWatchAppMenu(): Observable<boolean> {
    return this.watchAppMenu.asObservable();
  }

  getLanguage(): Observable<'ar' | 'en'> {
    return this.language.asObservable();
  }

  getCurrentPage(): Observable<{
    id: number;
    titleAR: string;
    titleEN: string;
    descAR: string;
    descEN: string;
  }> {
    return this.currentPage.asObservable();
  }

  getNavigationStartEvent(): Observable<Event> {
    return this._router.events.pipe(
      filter((event) => event instanceof NavigationStart)
    );
  }

  getLoading() {
    return this.loading.asObservable();
  }

  setLoading(value): void {
    this.loading.next(value);
  }

  toggleAppMenu(): void {
    let currentValue = this.watchAppMenu.getValue();
    this.watchAppMenu.next(!currentValue);
  }

  settAppMenu(value: boolean): void {
    this.watchAppMenu.next(value);
  }

  setLanguage(key: 'ar' | 'en'): void {
    saveItem('language', key);

    this.language.next(key);
  }

  setCurrentPage(value: {
    id: number;
    titleAR: string;
    titleEN: string;
    descAR: string;
    descEN: string;
  }): void {
    this.currentPage.next(value);
  }

  onMenuItem(item: number): void {
    switch (item) {
      case 0:
        this._router.navigate(['home']);
        break;
      case 2:
        this._router.navigate(['client']);
        break;
      case 3:
        this._router.navigate(['food']);
        break;
      case 4:
        this._router.navigate(['recipe']);
        break;
      case 5:
        this._router.navigate(['template']);
        break;
      case 6:
        this._router.navigate(['subscription']);
        break;
    }
  }

  onNavigation(url: string): void {
    if (url.includes('client')) {
      let currentPage = {
        id: 2,
        titleAR: 'عملاؤك',
        titleEN: 'Your clients',
        descAR: 'تحقق من المعلومات حول عملاؤك.',
        descEN: 'Check information about your clients.',
      };

      this.setCurrentPage(currentPage);
    }

    if (url.includes('food')) {
      let currentPage = {
        id: 3,
        titleAR: 'قاعدة بيانات الغذاء',
        titleEN: 'Your clients',
        descAR:
          'قم بإنشاء وفحص وتحديث الأطعمة التي يمكنك استخدامها في خطط الوجبات',
        descEN: 'Check information about your clients.',
      };

      this.setCurrentPage(currentPage);
    }

    if (url.includes('recipe')) {
      let currentPage = {
        id: 4,
        titleAR: 'وصفات',
        titleEN: 'Your clients',
        descAR: 'إنشاء الوصفات والتحقق منها وتحديثها',
        descEN: 'Check information about your clients.',
      };

      this.setCurrentPage(currentPage);
    }

    if (url.includes('template')) {
      let currentPage = {
        id: 5,
        titleAR: 'القوالب',
        titleEN: 'Your clients',
        descAR:
          'قم بإنشاء القوالب الخاصة بك والتحقق منها وتحديثها حتى تتمكن من تحسين وقت موعدك',
        descEN: 'Check information about your clients.',
      };

      this.setCurrentPage(currentPage);
    }

    if (url.includes('home') || url == '/') {
      let currentPage = {
        id: 0,
        titleAR: 'الصفحة الرئيسة',
        titleEN: 'Professional home page',
        descAR: 'تحقق من مواعيدك القادمة ونشاطك',
        descEN: 'Check your next appointments and your activity',
      };

      this.setCurrentPage(currentPage);
    }

    if (url.includes('subscription')) {
      let currentPage = {
        id: 6,
        titleAR: 'الإشتراكات والمالية',
        titleEN: 'Professional home page',
        descAR: 'تحقق من العروض والاشتراكات والمالية',
        descEN: 'Check your next appointments and your activity',
      };

      this.setCurrentPage(currentPage);
    }
  }
}

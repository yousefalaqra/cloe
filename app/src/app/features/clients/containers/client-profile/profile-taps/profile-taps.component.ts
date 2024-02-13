import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientFacade } from '../../../clients.facade';
import { BhTap } from '../../../state/types';

@Component({
  selector: 'profile-taps',
  templateUrl: './profile-taps.component.html',
  styleUrls: ['./profile-taps.component.scss'],
})
export class ProfileTapsComponent implements OnInit, OnDestroy {
  subscriptions$: Array<Subscription> = [];

  profileTaps: Array<BhTap>;

  activeTap: BhTap;

  tapsContent = {
    0: {
      title: 'المعلومات',
      desc: 'عادات ومعلومات العميل',
      icon: 'face',
    },
    // 1: {
    //   title: 'متابعة',
    //   desc: 'التقدم منذ آخر موعد',
    //   icon: 'favorite',
    // },
    1: {
      title: 'قياسات',
      desc: 'القياسات والتقدم',
      icon: 'straighten',
    },
    // 3: {
    //   title: 'التخطيط',
    //   desc: 'التخطيط لخطة وجبة العميل',
    //   icon: 'tune',
    // },
    2: {
      title: 'تخطيط الوجبة',
      desc: 'تحديد وجبة خطة الوجبة',
      icon: 'local_dining',
    },
    3: {
      title: 'الإشتراكات والمالية',
      desc: 'تحقق من دفعات العميل والحالة المالية ',
      icon: 'attach_money',
    },
    6: {
      title: 'تحليل',
      desc: 'تحليل خطة وجبة العميل',
      icon: 'dashboard',
    },

    7: {
      title: 'التسليمات',
      desc: 'التسليمات والمواعيد',
      icon: 'smartphone',
    },
  };

  constructor(private _clientFacade: ClientFacade) {}

  ngOnInit() {
    this.subscriptions$.push(
      this._clientFacade.profileTaps$.subscribe((x) => {
        this.profileTaps = x;
        this.activeTap = x.find((y) => y.active == true);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }

  getTapIcon(index: number): string {
    return this.tapsContent[index].icon;
  }
  getTapTitle(index: number): string {
    return this.tapsContent[index].title;
  }
  getTapDesc(index: number): string {
    return this.tapsContent[index].desc;
  }

  activateTap(index: number): void {
    this._clientFacade.activateTap(index);
  }
}

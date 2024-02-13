import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppFacade } from '../../app.facade';

@Component({
  selector: 'bh-meta-header',
  templateUrl: './meta-header.component.html',
  styleUrls: ['./meta-header.component.scss'],
})
export class MetaHeaderComponent implements OnInit {
  language: 'ar' | 'en';
  toggled: boolean;

  currentDate = new Date(Date.now());

  currentPage: {
    id: number;
    titleAR: string;
    titleEN: string;
    descAR: string;
    descEN: string;
  };

  subscriptions: Array<Subscription> = [];
  constructor(private _appFacade: AppFacade) {}

  ngOnInit() {
    this.subscriptions.push(
      this._appFacade.language$.subscribe((x) => (this.language = x)),
      this._appFacade.watchAppMenu$.subscribe((x) => (this.toggled = x)),
      this._appFacade.currentPage$.subscribe((x) => {
        this.currentPage = x;
      })
    );
  }
}

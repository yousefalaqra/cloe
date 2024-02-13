import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  ContentChildren,
  OnInit,
  QueryList,
} from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, delay, map } from 'rxjs/operators';
import { TabItemComponent } from '../tab-item/tab-item.component';

@Component({
  selector: 'tabs-group',
  templateUrl: './tabs-group.component.html',
  styleUrls: ['./tabs-group.component.scss'],
})
export class TabsGroupComponent
  implements OnInit, AfterContentInit, AfterContentChecked {
    
  @ContentChildren(TabItemComponent)
  tabs: QueryList<TabItemComponent>;

  tabItems$: Observable<TabItemComponent[]>;

  activeTab: TabItemComponent;
  constructor() {}

  ngOnInit(): void {}
  ngAfterContentInit(): void {
    this.tabItems$ = this.tabs.changes
      .pipe(startWith(''))
      .pipe(delay(0))
      .pipe(map(() => this.tabs.toArray()));
  }
  ngAfterContentChecked(): void {
    if (!this.activeTab) {
      Promise.resolve().then(() => {
        this.activeTab = this.tabs.first;
      });
    }
  }

  selectTab(tabItem: TabItemComponent) {
    if (this.activeTab === tabItem) {
      return;
    }

    if (this.activeTab) {
      this.activeTab.isActive = false;
    }

    this.activeTab = tabItem;

    tabItem.isActive = true;
  }
}

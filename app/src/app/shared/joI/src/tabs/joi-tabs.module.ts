import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsGroupComponent } from './tabs-group/tabs-group.component';
import { TabBodyComponent } from './tab-body/tab-body.component';
import { TabItemComponent } from './tab-item/tab-item.component';
import { TabLabelComponent } from './tab-label/tab-label.component';
import { TabActionsComponent } from './tab-actions/tab-actions.component';

@NgModule({
  declarations: [
    TabsGroupComponent,
    TabBodyComponent,
    TabItemComponent,
    TabLabelComponent,
    TabActionsComponent
  ],
  imports: [CommonModule],
  exports: [
    TabsGroupComponent,
    TabBodyComponent,
    TabItemComponent,
    TabLabelComponent,
    TabActionsComponent
  ],
})
export class JoITabModule {}

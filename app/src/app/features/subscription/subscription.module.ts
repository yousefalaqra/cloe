import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsPageComponent } from './container/subscriptions-page/subscriptions-page.component';
import { CardsModule } from 'src/app/shared/joI/src/cards/joi-card,module';
import { SubscriptionApi } from './api/subscriptions.api';
import { HttpClientModule } from '@angular/common/http';
import { SubscriptionState } from './state/subscription.state';
import { SubscriptionsFacade } from './subscription.faceade';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscriptionsListComponent } from './components/subscriptions-list/subscriptions-list.component';
import { SubscriptionsRoutingModule } from './subscription-router.module';
import { SubscriptionItemComponent } from './components/subscription-item/subscription-item.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { PeriodPipe } from './components/period.pipe';
import { httpInterceptorProviders } from 'src/app/core/api';
@NgModule({
  declarations: [
    SubscriptionsPageComponent,
    SubscriptionsListComponent,
    SubscriptionItemComponent,
    PeriodPipe
  ],
  providers: [SubscriptionApi, SubscriptionState, SubscriptionsFacade, httpInterceptorProviders],

  imports: [
    CommonModule,
    CardsModule,
    HttpClientModule,
    NzModalModule,
    ReactiveFormsModule,
    FormsModule,
    SubscriptionsRoutingModule,
    NzSwitchModule
  ],
})
export class SubscriptionModule {}

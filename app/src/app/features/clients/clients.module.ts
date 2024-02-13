import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientRoutingModule } from './clients-router.module';
import { ClientsPageContainer } from './containers/clients-page-container/clients-page.container';
import { ClientFacade } from './clients.facade';
import { CommonModule } from '@angular/common';
import { TranslationModule } from 'src/app/shared/translation/translation.module';
import { ClientSharedModule } from 'src/app/shared/clinet/client-shared.module';
import { ClientListItemComponent } from './components/client-list-item/client-list-item.component';
import { ClientState } from './state/client.state';
import { ClientApi } from './api/clients.api';
import { JoIAvatarModule } from 'src/app/shared/joI/src/avatar/avatar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JoIIconsModule } from 'src/app/shared/joI/src/icons/joi-icons.module';
import { ClientProfileComponent } from './containers/client-profile/client-profile.component';
import { ClientMainCardComponent } from './components/profile/client-main-card/client-main-card.component';
import { ClientGeneralCardComponent } from './components/profile/client-general-card/client-general-card.component';
import { DataPresenterModule } from 'src/app/shared/joI/src/data-presenter/data-presenter.module';
import { JoIModule } from 'src/app/shared/joI/joI.module';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { DateModule } from 'src/app/shared/joI/src/date/date.moduel';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { TapLabelComponent } from './components/profile/tap-label/tap-label.component';
import { ProfileTapsComponent } from './containers/client-profile/profile-taps/profile-taps.component';
import { ClientInformationComponent } from './components/profile/client-information/client-information.component';
import { ClientMeasurementsComponent } from './components/profile/client-measurements/client-measurements.component';
import { ClientMealPlanComponent } from './components/profile/client-meal-plan/client-meal-plan.component';
import { ClientAnalysisComponent } from './components/profile/client-analysis/client-analysis.component';
import { CardsModule } from 'src/app/shared/joI/src/cards/joi-card,module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TemplateModule } from '../templates/templates.module';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { MedicalHistoryComponent } from './components/profile/client-information/medical-history/medical-history.component';
import { ObservationsComponent } from './components/profile/client-information/observations/observations.component';
import { PeriodPipe } from '../subscription/components/period.pipe';
import { PaymentItemComponent } from './components/profile/client-analysis/payment-item/payment-item.component';
import { httpInterceptorProviders } from 'src/app/core/api';
@NgModule({
  declarations: [
    ClientListComponent,
    ClientsPageContainer,
    ClientListItemComponent,
    ClientProfileComponent,
    ClientMainCardComponent,
    ClientGeneralCardComponent,
    TapLabelComponent,
    ProfileTapsComponent,
    ClientInformationComponent,
    ClientMeasurementsComponent,
    ClientMealPlanComponent,
    ClientAnalysisComponent,
    MedicalHistoryComponent,
    ObservationsComponent,
    PaymentItemComponent,
  ],
  providers: [ClientFacade, ClientState, ClientApi, httpInterceptorProviders],
  imports: [
    ClientRoutingModule,
    CommonModule,
    TranslationModule,
    ClientSharedModule,
    JoIAvatarModule,
    ReactiveFormsModule,
    JoIIconsModule,
    DataPresenterModule,
    JoIModule,
    NzDatePickerModule,
    FormsModule,
    DateModule,
    NzTagModule,
    NzPopconfirmModule,
    CardsModule,
    NzModalModule,
    TemplateModule,
    NgxCsvParserModule,
    NzMessageModule,
  ],
  exports: [ClientListComponent, ClientListItemComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ClientsModule {}

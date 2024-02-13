import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JoIIconsModule } from 'src/app/shared/joI/src/icons/joi-icons.module';
import { ClientsModule } from '../clients/clients.module';
import { HomeApi } from './api/home.api';
import { AppointmentsCardComponent } from './components/appointments-card/appointments-card.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { HomeRoutingModule } from './home-router.module';
import { HomeFacade } from './home.facade';
import { AppointmentState } from './state/appointment.state';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AppointmentModalComponent } from './components/appointment-modal/appointment-modal.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { JoIAvatarModule } from 'src/app/shared/joI/src/avatar/avatar.module';
import { httpInterceptorProviders } from 'src/app/core/api';
@NgModule({
  declarations: [
    DashboardComponent,
    AppointmentsCardComponent,
    AppointmentModalComponent,
  ],
  providers: [HomeApi, AppointmentState, HomeFacade, httpInterceptorProviders],
  imports: [
    HomeRoutingModule,
    ClientsModule,
    JoIIconsModule,
    CommonModule,
    NzSelectModule,
    FormsModule,
    NzModalModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    JoIAvatarModule,
  ],
})
export class HomeModule {}

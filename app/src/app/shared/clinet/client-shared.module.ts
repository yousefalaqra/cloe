import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { JoIModalModule } from '../joI/src/modal/joi-modal.module';
import { RegisterClientFromComponent } from './register-client-from/register-client-from.component';
import { ClientService } from './client.service';
import { TranslationModule } from 'src/app/shared/translation/translation.module';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ClientApi } from 'src/app/features/clients/api/clients.api';
import { UniquePhoneNumberValidator } from './services/validators.service';
import { WorkplaceApi } from 'src/app/features/workplaces/api/workplace.api';
import { ClientGenderDropdownComponent } from './client-gender-dropdown/client-gender-dropdown.component';
import { WorkplacesDropdownComponent } from './workplaces-dropdown/workplaces-dropdown.component';
import { MeasurementFormComponent } from './measurement-form/measurement-form.component';

@NgModule({
  declarations: [
    RegisterClientFromComponent,
    ClientGenderDropdownComponent,
    WorkplacesDropdownComponent,
    MeasurementFormComponent
  ],
  providers: [
    ClientService,
    ClientApi,
    UniquePhoneNumberValidator,
    WorkplaceApi,
  ],
  imports: [
    CommonModule,
    NzModalModule,
    JoIModalModule,
    TranslationModule,
    NzSelectModule,
    ReactiveFormsModule,
    FormsModule,
    NzTimePickerModule,
    NzDatePickerModule,
    NzDropDownModule,
  ],
  exports: [
    RegisterClientFromComponent,
    ClientGenderDropdownComponent,
    WorkplacesDropdownComponent,
    MeasurementFormComponent
  ],
})
export class ClientSharedModule {}

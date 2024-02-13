import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitListComponent } from './components/units/unit-list/unit-list.component';
import { SettingsRoutingModule } from './settings-router.module';
import { UnitsContainer } from './containers/units/units-container/units-container.component';
import { JoITabModule } from '../../shared/joI/src/tabs/joi-tabs.module';
import { UnitFacade } from './unit.facade';
import { UnitState } from './state/unit.state';
import { UnitApi } from './api/unit.api';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AddUnitComponent } from './components/units/add-unit/add-unit.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { SettingsContainer } from './containers/settings/settings-container/settings-container.component';
import { TypeListComponent } from './components/types/type-list/type-list.component';
import { TypeFacade } from './types.facades';
import { TypeApi } from './api/type.api';
import { TypeState } from './state/type.state';
import { AddTypeComponent } from './components/types/add-type/add-type.component';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { AccountBookFill, AlertFill, AlertOutline } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [ AccountBookFill, AlertOutline, AlertFill ];

@NgModule({
  declarations: [UnitsContainer],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    JoITabModule,
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    FormsModule, 
    ReactiveFormsModule,
    NzFormModule,
    NzGridModule,
    NzSpaceModule ,
    NzDropDownModule,
    NzIconModule.forRoot(icons),
    NzCheckboxModule
    
    
    
  ],
  providers:[UnitFacade, UnitState, UnitApi,NzModalService,TypeFacade, TypeApi,TypeState],
  entryComponents:[AddUnitComponent,AddTypeComponent,]
})
export class SettingsModule { }

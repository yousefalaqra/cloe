import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodRoutingModule } from './food-router.module';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { JoITabModule } from '../../shared/joI/src/tabs/joi-tabs.module';
import { FoodItemFacade } from './food-items.facade';
import { FoodItemState } from './state/food-item.state';
import { FoodItemApi } from './api/food-item.api';
import { MealApi } from './api/meal.api';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import {
  AccountBookFill,
  AlertFill,
  AlertOutline,
} from '@ant-design/icons-angular/icons';
import { TypeFacade } from '../settings/types.facades';
import { TypeState } from '../settings/state/type.state';
import { TypeApi } from '../settings/api/type.api';
import { DietPlanFacade } from './diet-plan.facade';
import { DietPLanApi } from './api/diet-plan.api';
import { DietPlanState } from './state/diet-plan.state';

import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { UnitFacade } from '../settings/unit.facade';
import { UnitState } from '../settings/state/unit.state';
import { UnitApi } from '../settings/api/unit.api';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FoodDatabaseComponent } from './containers/food-items/food-database/food-database.component';
import { CardsModule } from 'src/app/shared/joI/src/cards/joi-card,module';
import { JoIIconsModule } from 'src/app/shared/joI/src/icons/joi-icons.module';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { FoodSharedModule } from 'src/app/shared/food/food-shared.module';
import { httpInterceptorProviders } from 'src/app/core/api';

@NgModule({
  declarations: [
    FoodDatabaseComponent
  ],

  imports: [
    CommonModule,
    FoodRoutingModule,
    JoITabModule,
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzGridModule,
    NzSpaceModule,
    NzDropDownModule,
    FormsModule,
    NzCheckboxModule,
    NzToolTipModule,
    CardsModule,
    JoIIconsModule,
    NzModalModule,
    NzSelectModule,
    NzPopconfirmModule,
    FoodSharedModule
  ],
  providers: [
    NzModalService,
    FoodItemFacade,
    FoodItemState,
    FoodItemApi,
    MealApi,
    TypeFacade,
    TypeState,
    TypeApi,
    UnitFacade,
    UnitState,
    UnitApi,
    DietPlanFacade,
    DietPlanState,
    DietPLanApi,
    httpInterceptorProviders

  ],
  entryComponents: [],
})
export class FoodModule {}

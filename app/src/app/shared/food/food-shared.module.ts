import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardsModule } from '../joI/src/cards/joi-card,module';
import { CardListComponent } from './card-list/card-list.component';
import { FoodPickerComponent } from './food-picker/food-picker.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FoodApiService } from './services/food-api.service';
import { FoodItemComponent } from './food-picker/food-item/food-item.component';
import { ListItemComponent } from './list-item/list-item.component';
import { NutritionValueComponent } from './nutrition-value/nutrition-value.component';
import { RecipeItemComponent } from './food-picker/recipe-item/recipe-item.component';

@NgModule({
  declarations: [
    CardListComponent,
    FoodPickerComponent,
    FoodItemComponent,
    ListItemComponent,
    NutritionValueComponent,
    RecipeItemComponent
  ],
  providers: [FoodApiService],
  exports: [
    CardListComponent,
    FoodPickerComponent,
    ListItemComponent,
    NutritionValueComponent,
  ],
  imports: [
    CardsModule,
    ReactiveFormsModule,
    CommonModule,
    NzCollapseModule,
    NzSelectModule,
    FormsModule,
  ],
})
export class FoodSharedModule {}

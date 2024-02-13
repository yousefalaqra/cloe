import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FoodSharedModule } from '../food-shared.module';
import { DayPipe } from './day/day.pipe';
import { DaysBarComponent } from './days-bar/days-bar.component';
import { MealCardComponent } from './meal-card/meal-card.component';
import { PlanService } from './plan.service';
import { PlanComponent } from './plan/plan.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { RecipeMealItemComponent } from './meal-card/recipe-meal-item/recipe-meal-item.component';

@NgModule({
  declarations: [
    PlanComponent,
    DaysBarComponent,
    DayPipe,
    MealCardComponent,
    RecipeMealItemComponent
  ],
  exports: [PlanComponent],
  providers: [PlanService],
  imports: [
    CommonModule,
    FoodSharedModule,
    NzModalModule,
    NzSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NzTimePickerModule,
  ],
})
export class MealPlanModule {}

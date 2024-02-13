import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodDatabaseComponent } from './containers/food-items/food-database/food-database.component';

const routes: Routes = [
  {
    path: '',
    component: FoodDatabaseComponent,
  },
  // {
  //   path: 'meal',
  //   component: MealListComponent,
  // },
  // {
  //   path: 'diet',
  //   component: DietListComponent,
  // },
  // {
  //   path: 'add-diet-plan/:id',
  //   component: AddEditDietComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodRoutingModule {}

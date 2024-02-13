import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailsComponent } from './containers/recipe-details/recipe-details.component';
import { RecipeListComponent } from './containers/recipe-list/recipe-list.component';

const routes: Routes = [
  {
    path: '',
    component: RecipeListComponent,
  },
  {
    path: 'details/:id',
    component: RecipeDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}

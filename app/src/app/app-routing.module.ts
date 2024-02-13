import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BhAppComponent } from './bh-app/bh-app.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: BhAppComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        // food module: diet templates, meal, and food items
        path: 'food',
        loadChildren: () =>
          import('./features/food/food.module').then((m) => m.FoodModule),
      },
      {
        // food module: diet templates, meal, and food items
        path: 'recipe',
        loadChildren: () =>
          import('./features/recipes/recipes.module').then(
            (m) => m.RecipeModule
          ),
      },
      {
        // food module: diet templates, meal, and food items
        path: 'template',
        loadChildren: () =>
          import('./features/templates/templates.module').then(
            (m) => m.TemplateModule
          ),
      },
      {
        // clients module
        path: 'client',
        loadChildren: () =>
          import('./features/clients/clients.module').then(
            (m) => m.ClientsModule
          ),
      },

      {
        // settings module
        path: 'subscription',
        loadChildren: () =>
          import('./features/subscription/subscription.module').then(
            (m) => m.SubscriptionModule
          ),
      },

      {
        // settings module
        path: 'home',
        loadChildren: () =>
          import('./features/home/home.module').then((m) => m.HomeModule),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },

  { path: 'login', component: LoginComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

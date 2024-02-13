import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateDetailsComponent } from './containers/template-details/template-details.component';
import { TemplateListComponent } from './containers/template-list/template-list.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateListComponent,
  },
  {
    path: 'details/:id',
    component: TemplateDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateRoutingModule {}

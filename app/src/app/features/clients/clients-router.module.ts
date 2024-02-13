import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientProfileComponent } from './containers/client-profile/client-profile.component';
import { ClientsPageContainer } from './containers/clients-page-container/clients-page.container';
const routes: Routes = [
  {
    path: 'list',
    component: ClientsPageContainer,
  },
  {
    path: 'profile/:clientId/:templateId',
    component: ClientProfileComponent,
  },

  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}

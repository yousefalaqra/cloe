import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeListComponent } from './components/types/type-list/type-list.component';
import { UnitListComponent } from './components/units/unit-list/unit-list.component';
import { SettingsContainer } from './containers/settings/settings-container/settings-container.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component:SettingsContainer
  // },
  {
    path: 'types',
    component: TypeListComponent
  },
  {
    path: 'units',
    component: UnitListComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}

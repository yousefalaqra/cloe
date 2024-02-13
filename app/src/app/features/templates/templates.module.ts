import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FoodSharedModule } from 'src/app/shared/food/food-shared.module';
import { CardsModule } from 'src/app/shared/joI/src/cards/joi-card,module';
import { DataPresenterModule } from 'src/app/shared/joI/src/data-presenter/data-presenter.module';
import { JoIIconsModule } from 'src/app/shared/joI/src/icons/joi-icons.module';
import { TemplateApi } from './api/template.api';
import { TemplateNameComponent } from './components/template-name/template-name.component';
import { TemplateDetailsComponent } from './containers/template-details/template-details.component';
import { TemplateListComponent } from './containers/template-list/template-list.component';
import { TemplateState } from './state/template.state';
import { TemplateFacade } from './template.facade';
import { TemplateRoutingModule } from './template.routing.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MealPlanModule } from 'src/app/shared/food/meal-plan/meal-plan.module';
import { httpInterceptorProviders } from 'src/app/core/api';

@NgModule({
  declarations: [
    TemplateListComponent,
    TemplateDetailsComponent,
    TemplateNameComponent,
  ],
  exports: [TemplateDetailsComponent],
  providers: [TemplateState, TemplateFacade, TemplateApi, httpInterceptorProviders],
  imports: [
    TemplateRoutingModule,
    CardsModule,
    FoodSharedModule,
    CommonModule,
    HttpClientModule,
    JoIIconsModule,
    DataPresenterModule,
    ReactiveFormsModule,
    NzModalModule,
    MealPlanModule,
  ],
})
export class TemplateModule {}

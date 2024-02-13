import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FoodSharedModule } from "src/app/shared/food/food-shared.module";
import { CardsModule } from "src/app/shared/joI/src/cards/joi-card,module";
import { RecipeApi } from "./api/recipe.api";
import { RecipeListComponent } from "./containers/recipe-list/recipe-list.component";
import { RecipeRoutingModule } from "./recipe-routing.module";
import { RecipeFacade } from "./recipe.facade";
import { RecipeState } from "./state/recipe.state";
import { NzModalModule } from 'ng-zorro-antd/modal';
import { HttpClientModule } from "@angular/common/http";
import { JoIIconsModule } from "src/app/shared/joI/src/icons/joi-icons.module";
import { CommonModule } from "@angular/common";
import { RecipeDetailsComponent } from "./containers/recipe-details/recipe-details.component";
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { RecipeBasicCardComponent } from "./compoenets/recipe-basic-card/recipe-basic-card.component";
import { RecipeInformationCardComponent } from "./compoenets/recipe-information-card/recipe-information-card.component";
import { DataPresenterModule } from "src/app/shared/joI/src/data-presenter/data-presenter.module";
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { RecipeIngredientsComponent } from "./compoenets/recipe-ingredients/recipe-ingredients.component";
import { RecipeStepsComponent } from "./compoenets/recipe-steps/recipe-steps.component";
import { StepItemComponent } from "./compoenets/recipe-steps/step-item/step-item.component";
import { httpInterceptorProviders } from "src/app/core/api";

@NgModule({
    declarations: [
        RecipeListComponent,
        RecipeDetailsComponent,
        RecipeBasicCardComponent,
        RecipeInformationCardComponent,
        RecipeIngredientsComponent,
        RecipeStepsComponent,
        StepItemComponent
    ],
    providers: [
        RecipeState,
        RecipeApi,
        RecipeFacade,
        httpInterceptorProviders
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        CardsModule,
        FoodSharedModule,
        RecipeRoutingModule,
        NzModalModule,
        HttpClientModule,
        JoIIconsModule,
        NzPopconfirmModule,
        DataPresenterModule,
        NzTimePickerModule,
        NzTagModule
    ]
})
export class RecipeModule{}
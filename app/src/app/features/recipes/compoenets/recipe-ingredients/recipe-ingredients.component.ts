import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FoodItemModel } from 'src/app/features/food/models/food-item.model';
import { FoodItemResource } from 'src/app/features/food/resources/foodItem/food-item.resource';
import { UnitResource } from 'src/app/features/settings/resources/unit/unit.resource';
import { RecipeFacade } from '../../recipe.facade';
import { RecipeResource } from '../../resources/recipe.resource';

@Component({
  selector: 'recipe-ingredients',
  templateUrl: './recipe-ingredients.component.html',
  styleUrls: ['./recipe-ingredients.component.scss'],
})
export class RecipeIngredientsComponent implements OnInit, OnDestroy {
  @Input() recipe: RecipeResource;
  units: Array<UnitResource>;

  subscriptions$: Array<Subscription> = [];

  constructor(private _recipeFacade: RecipeFacade) {}

  ngOnInit() {
    this.subscriptions$.push();
  }

  onSelectFood(item: { id: number; model: FoodItemModel }): void {
    this.subscriptions$.push(
      this._recipeFacade
        .addRecipeIngredient(this.recipe.id, item.id, item.model)
        .subscribe()
    );
  }

  getUnitCode(id: number): string {
    let unit = this.units.find((x) => x.id == id);
    return unit.code;
  }

  onUpdateRecipeMeal(data: { itemId: number; model: FoodItemModel }): void {
    this.subscriptions$.push(
      this._recipeFacade
        .updateRecipeIngredient(this.recipe.id, data.itemId, data.model)
        .subscribe()
    );
  }

  onDeleteRecipe(itemId: number): void {
    this.subscriptions$.push(
      this._recipeFacade
        .deleteRecipeIngredient(this.recipe.id, itemId)
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }
}

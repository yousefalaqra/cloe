import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FoodItemModel } from 'src/app/features/food/models/food-item.model';
import { RecipeModel } from 'src/app/features/recipes/models/recipe.model';
import { RecipeResource } from 'src/app/features/recipes/resources/recipe.resource';
import { MealsModel } from 'src/app/features/templates/models/meal.model';
import { MealResource } from 'src/app/features/templates/resources/meal.resource';
import { PlanService } from '../plan.service';

@Component({
  selector: 'meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss'],
})
export class MealCardComponent implements OnInit, OnDestroy {
  @Input() meal: MealResource;
  constructor(private _service: PlanService) {}

  mealNameFromControl: FormControl;
  nameEditMode = false;
  mealTimeFromControl: FormControl;

  mealTime: Date;
  nameTimeMode = false;

  subscriptions$: Array<Subscription> = [];
  @Output() deleteMeal = new EventEmitter<number>();
  @Output() updateMeal = new EventEmitter<{ id: number; model: MealsModel }>();

  @Output() addRecipe = new EventEmitter<{
    mealId: number;
    recipe: RecipeResource;
  }>();

  @Output() deleteRecipe = new EventEmitter<{
    mealId: number;
    recipeId: number;
  }>();

  @Output() addItem = new EventEmitter<{
    mealId: number;
    foodItemId: number;
    model: FoodItemModel;
  }>();

  @Output() updateItem = new EventEmitter<{
    mealId: number;
    foodItemId: number;
    model: FoodItemModel;
  }>();

  @Output() deleteItem = new EventEmitter<{
    mealId: number;
    foodItemId: number;
  }>();

  ngOnInit() {
    this.mealNameFromControl = new FormControl(this.meal.name);
    this.mealTime = this.meal.time;
  }

  onDeleteMeal(): void {
    this.deleteMeal.emit(this.meal.id);
  }

  onUpdateMealName(): void {
    if (this.mealNameFromControl.value != '') {
      let mealModel: MealsModel = {
        name: this.mealNameFromControl.value,
        time: this.meal.time,
      };

      this.updateMeal.emit({ id: this.meal.id, model: mealModel });
    }

    this.nameEditMode = false;
  }

  onUpdateMealTime(time: Date): void {
    let mealModel: MealsModel = {
      name: this.meal.name,
      time: time,
    };

    this.updateMeal.emit({ id: this.meal.id, model: mealModel });

    this.nameTimeMode = false;
  }

  onRecipeSelect(recipe: RecipeResource): void {
    this.addRecipe.emit({ mealId: this.meal.id, recipe: recipe });
  }

  onDeleteRecipe(recipeId: number): void {
    this.deleteRecipe.emit({ mealId: this.meal.id, recipeId: recipeId });
  }

  onItemSelect(data: { id: number; model: FoodItemModel }): void {
    this.addItem.emit({
      mealId: this.meal.id,
      model: data.model,
      foodItemId: data.id,
    });
  }

  onDeleteItem(id: number): void {
    this.deleteItem.emit({ foodItemId: id, mealId: this.meal.id });
  }

  onUpdateItem(data: { itemId: number; model: FoodItemModel }): void {
    this.updateItem.emit({
      mealId: this.meal.id,
      model: data.model,
      foodItemId: data.itemId,
    });
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }
}

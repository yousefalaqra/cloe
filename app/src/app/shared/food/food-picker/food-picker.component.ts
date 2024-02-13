import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FoodItemModel } from 'src/app/features/food/models/food-item.model';
import { FoodItemResource } from 'src/app/features/food/resources/foodItem/food-item.resource';
import { RecipeResource } from 'src/app/features/recipes/resources/recipe.resource';
import { UnitResource } from 'src/app/features/settings/resources/unit/unit.resource';
import { FoodApiService } from '../services/food-api.service';

@Component({
  selector: 'food-picker',
  templateUrl: './food-picker.component.html',
  styleUrls: ['./food-picker.component.scss'],
})
export class FoodPickerComponent implements OnInit {
  @Input() onlyFoods: boolean = true;
  recipesList: Array<RecipeResource>;
  foods: Array<FoodItemResource>;
  units: Array<UnitResource>;

  loading: boolean = false;

  searchFormControl = new FormControl('');

  filter = '0';

  @Output() onSelectFoodItem = new EventEmitter<{
    id: number;
    model: FoodItemModel;
  }>();

  @Output() onRecipe = new EventEmitter<RecipeResource>();

  subscriptions$: Array<Subscription> = [];

  constructor(private _service: FoodApiService) {}

  ngOnInit() {
    this.subscriptions$.push(
      this._service.getFoodItems().subscribe((x) => {
        this.foods = x;
        console.log(x);
      }),
      this._service.getRecipes().subscribe((x) => {
        console.log(x);

        this.recipesList = x;
      }),
      this._service.getUnits().subscribe((x) => (this.units = x))
    );

    this.subscriptions$.push(
      this.searchFormControl.valueChanges.subscribe((x) => {
        this.filter == '0'
          ? this.subscriptions$.push(
              this._service.getFoodItems(x).subscribe((x) => (this.foods = x))
            )
          : this.subscriptions$.push(
              this._service
                .getRecipes(x)
                .subscribe((x) => (this.recipesList = x))
            );
      })
    );
  }

  onSelectItem(foodItem: { id: number; model: FoodItemModel }) {
    this.onSelectFoodItem.emit(foodItem);
  }

  onSelectRecipe(recipe: RecipeResource){

    this.onRecipe.emit(recipe);
  }

  onFilterChange($event): void {
  }
}

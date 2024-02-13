import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FoodItemModel } from 'src/app/features/food/models/food-item.model';
import { FoodItemResource } from 'src/app/features/food/resources/foodItem/food-item.resource';
import { RecipeIngredientResource } from 'src/app/features/recipes/resources/recipe-ingredient.resource';
import { UnitResource } from 'src/app/features/settings/resources/unit/unit.resource';
import { MealFoodItemResource } from 'src/app/features/templates/resources/meal-food-item.resource';
import { FoodApiService } from '../services/food-api.service';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit, OnDestroy {
  @Input() item: RecipeIngredientResource | MealFoodItemResource;
  units: Array<UnitResource>;

  subscriptions$: Array<Subscription> = [];

  editMode = false;

  quantityControl: FormControl;

  selectedUnit;

  @Output() onUpdate = new EventEmitter<{
    itemId: number;
    model: FoodItemModel;
  }>();

  @Output() onDelete = new EventEmitter<number>();

  constructor(private _service: FoodApiService) {}

  ngOnInit() {
    this.quantityControl = new FormControl(this.item.quantity);
    this.selectedUnit = this.item.unitId;

    this.subscriptions$.push(
      this._service.getUnits().subscribe((x) => (this.units = x))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((x) => x.unsubscribe());
  }

  updateQuantity(): void {
    this.onUpdate.emit({
      itemId: this.item.foodItemId,
      model: {
        unitId: this.item.unitId,
        baseQuantity: this.quantityControl.value,
      } as FoodItemModel,
    });
    this.editMode = false;
  }

  onUnitChange(id): void {
    this.onUpdate.emit({
      itemId: this.item.foodItemId,
      model: { unitId: id, baseQuantity: this.item.quantity } as FoodItemModel,
    });
    this.editMode = false;
  }

  onDeleteItem(): void {
    this.onDelete.emit(this.item.foodItemId);
  }

  getUnitCode(id): string {
    return this.units?.find((x) => x.id == id)?.code;
  }
}

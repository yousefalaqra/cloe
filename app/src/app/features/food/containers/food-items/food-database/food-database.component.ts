import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UnitResource } from 'src/app/features/settings/resources/unit/unit.resource';
import { FoodItemFacade } from '../../../food-items.facade';
import { FoodItemModel } from '../../../models/food-item.model';
import { FoodItemResource } from '../../../resources/foodItem/food-item.resource';

@Component({
  selector: 'food-database',
  templateUrl: './food-database.component.html',
  styleUrls: ['./food-database.component.scss'],
})
export class FoodDatabaseComponent implements OnInit, OnDestroy {
  searchFoodControl: FormControl;
  foodItems: Array<FoodItemResource>;
  loading: boolean = false;
  subscriptions$: Array<Subscription> = [];

  selectedFoodItem: FoodItemResource;

  errorCode: number;

  foodUnits: Array<UnitResource>;
  selectedUnit: string;

  foodGroups: Array<{ key: string; value: string }>;
  selectedFoodGroup: string;

  showModal: boolean = false;
  isUpdate: boolean = false;

  foodName: string;
  foodQuantity: number;

  energy: number;
  fat: number;
  carbs: number;
  protein: number;

  description: string;

  constructor(private _foodFacade: FoodItemFacade) {}

  ngOnInit() {
    this.searchFoodControl = new FormControl('');

    this.subscriptions$.push(
      this._foodFacade.selectedFoodItem$.subscribe((x) => {
        this.selectedFoodItem = x;
        this.selectedUnit = this.selectedFoodItem.unit.id.toString();
        this.selectedFoodGroup = this.selectedFoodItem.group.toString();
        this.foodName = this.selectedFoodItem.name;
        this.foodQuantity = this.selectedFoodItem.baseQuantity;
        this.energy = this.selectedFoodItem.calories;
        this.carbs = this.selectedFoodItem.carbohydrates;
        this.protein = this.selectedFoodItem.protein;
        this.fat = this.selectedFoodItem.fat;

        this.description = `القيمة الغذائية لكل ${this.foodQuantity} جرام`;
      }),
      this._foodFacade.foodItemsLoading$.subscribe((x) => (this.loading = x)),
      this._foodFacade.foodItems$.subscribe((x) => (this.foodItems = x)),
      this._foodFacade.foodUnits$.subscribe((x) => (this.foodUnits = x)),
      this._foodFacade.foodGroups$.subscribe((x) => (this.foodGroups = x)),
      this._foodFacade.loadFoodItems().subscribe(),
      this._foodFacade.loadFoodUnits().subscribe()
    );
  }

  handleCancel(): void {
    this.handleCloseModal();
  }

  searchFoodItems(key: string): void {
    this.subscriptions$.push(this._foodFacade.loadFoodItems(key).subscribe());
  }

  handleOk(): void {
    let model: FoodItemModel = {
      baseQuantity: this.foodQuantity,
      calories: this.energy,
      carbohydrates: this.carbs,
      createdAt: new Date(),
      createdBy: 'Jo Aqra',
      fat: this.fat,
      group: Number(this.selectedFoodGroup),
      name: this.foodName,
      protein: this.protein,
      unitId: Number(this.selectedUnit),
    };

    if (this.isUpdate) {
      this.subscriptions$.push(
        this._foodFacade
          .updateFoodItem(this.selectedFoodItem.id, model)
          .subscribe()
      );
    } else {
      this._foodFacade.addFoodItem(model).subscribe();
    }

    this.handleCloseModal();
  }

  onUnitChange(unit): void {
    let selectedUnit = this.foodUnits.find((x) => x.id == unit);
    this.description = `القيمة الغذائية لكل ${this.foodQuantity} ${selectedUnit.code}`;

    this.selectedUnit = unit;
  }

  onFoodGroupChange(group) {
    this.selectedFoodGroup = group;
  }

  onQuantityChange(value): void {
    let selectedUnit = this.foodUnits.find(
      (x) => x.id == Number(this.selectedUnit)
    );

    this.description = `القيمة الغذائية لكل ${value} ${selectedUnit.code}`;
  }

  onFoodNameChange(value): void {}

  onProteinChange(value): void {}
  onCarbsChange(value): void {}
  onFatChange(value): void {}
  onEnergyChange(value): void {}

  handleCloseModal(): void {
    this.showModal = false;
    this._foodFacade.resetSelectedFoodItem();
  }

  onEditAction(id: number): void {
    this.isUpdate = true;
    this._foodFacade.selectFoodItem(id);
    this.showModal = true;
  }

  onDeleteAction(id: number): void {
    this.subscriptions$.push(this._foodFacade.deleteFoodItem(id).subscribe());
  }

  ngOnDestroy(): void {
    this._foodFacade.resetSelectedFoodItem();

    this.subscriptions$.forEach((x) => x.unsubscribe());
  }
}

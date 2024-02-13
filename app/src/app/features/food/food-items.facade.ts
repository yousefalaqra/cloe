import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UnitResource } from '../settings/resources/unit/unit.resource';
import { FoodItemApi } from './api/food-item.api';
import { FoodItemModel } from './models/food-item.model';
import { FoodItemResource } from './resources/foodItem/food-item.resource';
import { FoodItemState } from './state/food-item.state';

@Injectable()
export class FoodItemFacade {
  constructor(
    private _foodItemState: FoodItemState,
    private _foodItemApi: FoodItemApi
  ) {}

  get foodItems$(): Observable<Array<FoodItemResource>> {
    return this._foodItemState.getFoodItems();
  }

  get selectedFoodItem$(): Observable<FoodItemResource> {
    return this._foodItemState.getSelectedFoodItem();
  }

  get foodItemsLoading$(): Observable<boolean> {
    return this._foodItemState.getFoodItemsLoading();
  }

  get foodUnits$(): Observable<Array<UnitResource>> {
    return this._foodItemState.getFoodUnits();
  }

  get foodGroups$(): Observable<Array<{ key: string; value: string }>> {
    return this._foodItemState.getFoodGroups();
  }

  loadFoodItems(filter = ''): Observable<any> {
    this._foodItemState.setFoodItemsLoading(true);
    return this._foodItemApi.getFoodItems(filter).pipe(
      tap(
        (res: Array<FoodItemResource>) => {
          this._foodItemState.setFoodItems(res);
          this._foodItemState.setFoodItemsLoading(false);
        },
        () => {
          this._foodItemState.setFoodItemsLoading(false);
        }
      )
    );
  }

  loadFoodUnits(): Observable<any> {
    return this._foodItemApi.getFoodUnits().pipe(
      tap(
        (res: Array<UnitResource>) => {
          this._foodItemState.setFoodUnits(res);
        },
        () => {}
      )
    );
  }

  addFoodItem(model: FoodItemModel): Observable<any> {
    this._foodItemState.addFoodItem(model);

    return this._foodItemApi.addFood(model).pipe(
      tap(
        () => {},
        () => {}
      )
    );
  }

  updateFoodItem(id: number, model: FoodItemModel): Observable<any> {
    this._foodItemState.updateFoodItem(id, model);

    return this._foodItemApi.updateFood(model, id).pipe(
      tap(
        () => {},
        () => {}
      )
    );
  }

  deleteFoodItem(id: number): Observable<any> {
    this._foodItemState.deleteFoodItem(id);

    return this._foodItemApi.deleteFood(id).pipe(
      tap(
        () => {},
        () => {}
      )
    );
  }

  selectFoodItem(id: number): void {
    this._foodItemState.selectFoodItem(id);
  }

  resetSelectedFoodItem(): void{
    this._foodItemState.resetSelectedFoodItem()
  }
}

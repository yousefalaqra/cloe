import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnitResource } from '../../settings/resources/unit/unit.resource';
import { FoodItemModel } from '../models/food-item.model';
import { FoodItemResource } from '../resources/foodItem/food-item.resource';

@Injectable()
export class FoodItemState {
  private foodItems = new BehaviorSubject<Array<FoodItemResource>>([]);
  private selectedFoodItem = new BehaviorSubject<FoodItemResource>({
    baseQuantity: 0,
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    group: 0,
    name: '',
    protein: 0,
    unit: { id: 1 } as UnitResource,
  } as FoodItemResource);

  private foodItemsLoading = new BehaviorSubject<boolean>(false);

  private foodUnits = new BehaviorSubject<Array<UnitResource>>([]);

  private foodGroups = new BehaviorSubject<
    Array<{ key: string; value: string }>
  >([
    { key: '1', value: 'منتجات الألبان والبيض' },
    { key: '2', value: 'البهارات والأعشاب' },
    { key: '3', value: 'أغذية الأطفال' },
    { key: '4', value: 'دهون وزيوت' },
    { key: '5', value: 'منتجات الدواجن' },
    { key: '6', value: 'الحساء والصلصات والمرق' },
    { key: '7', value: 'النقانق ولحوم الغذاء' },
    { key: '8', value: 'حبوب الإفطار' },
    { key: '9', value: 'الفواكه وعصائر الفاكهة' },
    { key: '10', value: 'خضروات ومنتجات نباتية' },
    { key: '11', value: 'المكسرات ومنتجات البذور' },
    { key: '12', value: 'منتجات لحوم البقر' },
    { key: '13', value: 'المشروبات' },
    { key: '14', value: 'منتجات الأسماك والمحار' },
    { key: '15', value: 'البقوليات ومنتجاتها' },
    { key: '16', value: 'منتجات مخبوزة' },
    { key: '17', value: 'حلويات' },
    { key: '18', value: 'الحبوب والمعكرونة' },
    { key: '19', value: 'وجبات ومقبلات وأطباق جانبية' },
    { key: '20', value: 'وجبات خفيفة' },
    { key: '21', value: 'أغذية المطعم' },
  ]);

  getFoodItems(): Observable<Array<FoodItemResource>> {
    return this.foodItems.asObservable();
  }

  getFoodItemsLoading(): Observable<boolean> {
    return this.foodItemsLoading.asObservable();
  }

  getSelectedFoodItem(): Observable<FoodItemResource> {
    return this.selectedFoodItem.asObservable();
  }

  getFoodUnits(): Observable<Array<UnitResource>> {
    return this.foodUnits.asObservable();
  }

  getFoodGroups(): Observable<Array<{ key: string; value: string }>> {
    return this.foodGroups.asObservable();
  }

  setFoodUnits(foodUnits: Array<UnitResource>) {
    this.foodUnits.next(foodUnits);
  }

  setFoodItems(foodItems: Array<FoodItemResource>) {
    this.foodItems.next(foodItems);
  }

  setFoodItemsLoading(value: boolean): void {
    this.foodItemsLoading.next(value);
  }

  addFoodItem(model: FoodItemModel) {
    const currentValue = this.foodItems.getValue();
    let resource = this.modelToResource(model);
    this.foodItems.next([...currentValue, resource]);
  }

  updateFoodItem(id: number, model: FoodItemModel): void {
    const currentValue = this.foodItems.getValue();
    let resource = this.modelToResource(model);

    let newFoodItems = currentValue.map((x) => (x.id == id ? resource : x));

    this.foodItems.next(newFoodItems);
  }

  deleteFoodItem(id: number): void {
    const currentValue = this.foodItems.getValue();

    let newFoodItems = currentValue.filter((x) => x.id != id);

    this.foodItems.next(newFoodItems);
  }

  selectFoodItem(id: number): void {
    const currentValue = this.foodItems.getValue();
    let toBeSelected = currentValue.find((x) => x.id == id);

    this.selectedFoodItem.next(toBeSelected);
  }

  modelToResource(model: FoodItemModel): FoodItemResource {
    let resource: FoodItemResource = {
      baseQuantity: model.baseQuantity,
      calories: model.calories,
      carbohydrates: model.carbohydrates,
      createdAt: new Date(Date.now()),
      createdBy: 'Development',
      fat: model.fat,
      group: model.group,
      id: new Date().getUTCMilliseconds(),
      name: model.name,
      protein: model.protein,
      unit: { id: model.unitId } as UnitResource,
    };

    return resource;
  }

  resetSelectedFoodItem(): void {
    this.selectedFoodItem.next({
      baseQuantity: 0,
      calories: 0,
      carbohydrates: 0,
      fat: 0,
      group: 0,
      name: '',
      protein: 0,
      unit: { id: 1 } as UnitResource,
    } as FoodItemResource);
  }
}

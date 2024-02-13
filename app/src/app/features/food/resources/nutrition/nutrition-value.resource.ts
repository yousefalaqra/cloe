import { UnitResource } from 'src/app/features/settings/resources/unit/unit.resource';

export class NutritionValueResource {
  totalCalories: number;
  totalCarbohydrates: number;
  totalFat: number;
  totalProtein: number
}

export class NutritionValueModel {
  id: number;
  baseQuantity: number;
  UnitId: number;
  calories: number;
  fat: number;
  protein: number;
  carbohydrates: number;
  unit: UnitResource;
}

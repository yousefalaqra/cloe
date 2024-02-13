import { TrackableResource } from 'src/app/core/resources/trackable.resource';
import { TypeResource } from 'src/app/features/settings/resources/types/type.resource';
import { UnitResource } from 'src/app/features/settings/resources/unit/unit.resource';
import { NutritionValueModel } from '../nutrition/nutrition-value.resource';

export class FoodItemResource extends TrackableResource {
  id: number;
  name: string;
  group: number;
  baseQuantity: number;
  unit: UnitResource;
  calories: number;
  fat: number;
  protein: number;
  carbohydrates: number;
}

// export class FoodItemModel {
//   name: string;
//   types: TypeResource[];
//   typesIds: number[];
//   nutritionalValue: NutritionValueModel;
//   // isLiquid :boolean;
// }

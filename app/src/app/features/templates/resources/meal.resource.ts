import { RecipeResource } from '../../recipes/resources/recipe.resource';
import { MealFoodItemResource } from './meal-food-item.resource';

export class MealResource {
  id: number;
  name: string;
  time: Date;
  recipes: Array<RecipeResource>;
  items: Array<MealFoodItemResource>;
  fat: number;
  energy: number;
  protien: number;
  carbs: number;
}

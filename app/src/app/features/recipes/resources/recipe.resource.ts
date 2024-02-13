import { TrackableResource } from 'src/app/core/resources/trackable.resource';
import { RecipeCategoryResource } from './recipe-category.resource';
import { RecipeIngredientResource } from './recipe-ingredient.resource';
import { RecipeStepsResource } from './recipe-step.resource';

export class RecipeResource extends TrackableResource {
  id: number;
  name: string;
  description: string;
  preparationTime: Date;
  fat: number;
  energy: number;
  protien: number;
  carbs: number;
  categories: Array<RecipeCategoryResource>;
  steps: Array<RecipeStepsResource>;
  ingredients: Array<RecipeIngredientResource>;
}

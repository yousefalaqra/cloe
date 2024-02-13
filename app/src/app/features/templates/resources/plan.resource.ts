import { DayResource } from './day.resource';
import { MealResource } from './meal.resource';

export class PlanResource {
  id: number;
  days: Array<DayResource>;
  meals: Array<MealResource>;
}

import { DayType } from "../enums/day-type.enum";
import { MealsModel } from "./meal.model";

export class PlanModel{
    days: Array<DayType>;
    meals: Array<MealsModel>;
}
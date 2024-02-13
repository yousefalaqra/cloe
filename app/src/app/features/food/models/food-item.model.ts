import { TrackableModel } from "src/app/core/models/trackable.model";

export class FoodItemModel extends TrackableModel{
    name: string;
    group: number;
    baseQuantity: number;
    unitId: number;
    calories: number;
    fat: number;
    protein: number;
    carbohydrates: number;
}
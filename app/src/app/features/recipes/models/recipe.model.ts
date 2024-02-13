import { TrackableModel } from "src/app/core/models/trackable.model";

export class RecipeModel extends TrackableModel {
    name: string;
    description: string;
    preparationTime: Date;
}
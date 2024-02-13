import { TypeResource } from "src/app/features/settings/resources/types/type.resource";

export class DietPlansListResource{
    id: number;
    name: string;
    types:TypeResource[];
    fat: number;
    protein: number;
    carbohydrates: number;
    calories: number;
    action : boolean;
}
export class GetDietResourse{
    result : DietResource;
}
export class DietResource{
    id: number;
    name: string;
    dietMealDays: DietDaysResource[];
    types:TypeResource[];
    
}
export  class DietDaysResource{
    dayNumber :number ;
    dietPlanMeals : DietTemplateMealsResource[];
    totalDayNutritionalValue:DietNutriotionValueResource;
}

export class DietTemplateMealsResource{
    typeId: number;
    // foodItems: FoodItemResource[];
    meals:[];
    // filteredFoodItems: FoodItemResource[];
    filteredMeals:[];
    totalNutritionalValue :DietNutriotionValueResource;
}


export class DietModel{
    name: string;
    typesIds:number[];
    nutritionalValue:DietNutriotionValueResource;
    dietMealDays  :DietDaysModel[];
    
}
export class DietTemplateMealsModel{
    typeId: number;
    foodItems: FoodWithQuantity[];
    meals:MealWithQuantity[];
    nutritionalValue:DietNutriotionValueResource;
    // foodResource : FoodItemResource[];
    mealResources : [];
}

export  class DietDaysModel{
    dayNumber :number ;
    dietPlanMeals : DietTemplateMealsModel[];
    nutrationValue :DietNutriotionValueResource;
}
export  class MealWithQuantity{
    mealId :number ;
    quantity : number
    meal:any;
}
export  class FoodWithQuantity{
    foodItemId :number ;
    quantity : number;
    // food: FoodItemResource;
}
export class DietNutriotionValueResource{
    fat: number;
    protein: number;
    carbohydrates: number;
    calories: number;
}


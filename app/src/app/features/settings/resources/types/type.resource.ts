import { TypeCategory } from "../../enums/type-category.enum";

export class TypeResource{
    id: number;
    type: string;    
    typeCategory: TypeCategory;
    action :boolean;
}
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { DietPlansListResource, DietResource } from "../resources/diet/diet-plan.resource";

@Injectable()
export class DietPlanState{
    private dietPlans = new BehaviorSubject<Array<any>>([]);

    getDiets(): Observable<Array<DietPlansListResource>> {
        return this.dietPlans.asObservable();
      }
    
      setDiets(Diets: Array<DietPlansListResource>) {
        this.dietPlans.next(Diets);
      }
      addDiet(diet:DietResource) {
        const currentValue = this.dietPlans.getValue();
        this.dietPlans.next([...currentValue, diet]);
      }
    
      updateDiet(Diet:DietResource) {
        const currentValue = this.dietPlans.getValue();
        const indexOfUpdated = currentValue.findIndex(u => u.id === Diet.id);
        currentValue[indexOfUpdated] = Diet;
        this.dietPlans.next([...currentValue]);
      }
    
      updateDietbyId(Diet,id) {
        const currentValue = this.dietPlans.getValue();
        const indexOfUpdated = currentValue.findIndex(u => u.id === id);
        currentValue[indexOfUpdated] = Diet;
        this.dietPlans.next([...currentValue]);
      }
    
      removeDiet(id:number) {
        const currentValue = this.dietPlans.getValue();
        this.dietPlans.next(currentValue.filter(u => u.id !== id));
      }
}
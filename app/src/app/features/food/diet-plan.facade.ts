import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DietPLanApi } from './api/diet-plan.api';
import { DietModel, DietPlansListResource, DietResource, GetDietResourse } from './resources/diet/diet-plan.resource';
import { DietPlanState } from './state/diet-plan.state';

@Injectable()
export class DietPlanFacade {
  constructor(
    private dietPlanState: DietPlanState,
    private dietPlanApi: DietPLanApi
  ) {}

  Diets$: Observable<Array<DietPlansListResource>> = this.dietPlanState.getDiets();
  observableDiets :  Observable<any> ;
  errors$: Subject<any> = new Subject<any>();

  loadDiets(): Observable<Array<DietPlansListResource>> {
    this.observableDiets =this.dietPlanApi.getAll(); 
    this.observableDiets.subscribe(e => {this.setDiets(e.result);});
    return this.observableDiets;
  }


  setDiets(Diets: Array<DietPlansListResource>) {
    this.dietPlanState.setDiets(Diets);
  }
  
  getDietByID(id) :Observable<GetDietResourse>{
    return this.dietPlanApi.getbyId(id);
  }

  addDiet(Diet:DietModel )
  {
     this.dietPlanApi.add(Diet).subscribe(e => {
       
   //   this.dietPlanState.addDiet(this.dietPlanApi.convertModelToResource(Diet , e.result));
   this.errors$.next(null);
    },
    err => {
      this.errors$.next(err.error.responseException.exceptionMessage);
    });
  }

  updateDiet(Diet:DietModel , id : number )
  {
    this.dietPlanApi.update(Diet ,id ).subscribe(e => {
      this.errors$.next(null);
  //    this.dietPlanState.updateDiet(this.dietPlanApi.convertModelToResource(Diet , e.result));
    },
    err => {
      this.errors$.next(err.error.responseException.exceptionMessage);
    });
  }

  deleteDiet(id :number )
  {
    this.dietPlanApi.delete(id).subscribe(e => {
      this.dietPlanState.removeDiet(id);
    });
  }
}

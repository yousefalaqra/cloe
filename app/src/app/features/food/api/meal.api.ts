import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class MealApi {
  constructor(private http: HttpClient) {}
  private readonly API = `${environment.api}/meal`;

  getMeals(): Observable<any> {
    return this.http.get(this.API);
  }

  addmeal(meal:any): Observable<any>{
    return this.http.post(this.API,meal);
   }
   updatemeal(meal:any , id : number): Observable<any>{
     return this.http.put(this.API+"/"+id,meal);
   }
   deletmeal(id): Observable<any>{
     return  this.http.delete(this.API+"/"+id);
   }
   convertModelToResource(model : any , id : number):any{
     var resource : any;
     resource.id = id ; 
     resource.name = model.name;
     resource.step = model.step;
     resource.ingredient = model.ingredientResource;
     resource.mealsTypes = model.typeResources;
     resource.totalNutritionalValue = model.totalNutritionalValue;
     resource.action =false;
     return resource;
     
   }
   
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DietModel, DietResource, GetDietResourse } from "../resources/diet/diet-plan.resource";

@Injectable()
export class DietPLanApi {
  constructor(private http: HttpClient) { }
  private readonly API = `${environment.api}/DietPlans`;

  getAll(): Observable<any> {
    return this.http.get(this.API);
  }
  getbyId(id): Observable<GetDietResourse> {
    return this.http.get<GetDietResourse>(this.API + "/" + id);
  }
  add(diet: DietModel): Observable<any> {
    return this.http.post(this.API, diet);
  }
  update(diet: DietModel, id: number): Observable<any> {
    return this.http.put(this.API + "/" + id, diet);
  }
  delete(id): Observable<any> {
    return this.http.delete(this.API + "/" + id);
  }
  
}
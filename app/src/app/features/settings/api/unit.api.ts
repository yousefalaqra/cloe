import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class UnitApi {
  constructor(private http: HttpClient) {}
  private readonly API = `${environment.api}/Unit`;

  getUnits(): Observable<any> {
    return this.http.get(this.API);
  }
  addUnit(unit): Observable<any>{
   return this.http.post(this.API,unit);
  }
  updateUnit(unit): Observable<any>{
    return this.http.put(this.API+"/"+unit.id,unit);
  }
  deletUnit(id): Observable<any>{
    return  this.http.delete(this.API+"/"+id);
  }
}

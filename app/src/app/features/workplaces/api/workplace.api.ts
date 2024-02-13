import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WorkplaceResource } from '../resources/workplace.resource';

const BaseUrl = environment.api + '/Workplace';

@Injectable()
export class WorkplaceApi {
  constructor(private _http: HttpClient) {}

  getWorkSpaces(): Observable<Array<WorkplaceResource>> {
    return this._http.get(BaseUrl).pipe(map((x: any) => x.result));
  }
}

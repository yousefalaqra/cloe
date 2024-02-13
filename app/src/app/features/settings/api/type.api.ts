import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class TypeApi {
    constructor(private http: HttpClient) { }
    private readonly API = `${environment.api}/Type`;

    getTypes(categoryId): Observable<any> {
        return this.http.get(this.API+'?TypeCategory='+categoryId);
    }
    addType(type): Observable<any> {
        return this.http.post(this.API, type);
    }
    updateType(type): Observable<any> {
        return this.http.put(this.API + "/" + type.id, type);
    }
    deleteType(id): Observable<any> {
        return this.http.delete(this.API + "/" + id);
    }
}
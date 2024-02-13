import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const BaseUrl = environment.api + '/User';
@Injectable()
export class AppApi {
  private readonly path = window.location.origin + '/assets/i18n/';
  private readonly api = `${environment.api}​​/User​`
  constructor(private http: HttpClient) {}

  loadLang(code: string = 'ar'): Observable<{}> {
    return this.http.get(`${this.path}/${code}.json`);
  }

  login(data: { emailAddress: string; password: string, username: string }): Observable<{
    user: {
      id: number;
      firstName: string;
      lastName: string;
      username: string;
      emailAddress: string;
      dateOfBirth: Date;
      phoneNumber: string;
      userType: number;
    };
    token: string;
  }> {
    return this.http
      .post(BaseUrl, data)
      .pipe(map((res: any) => res.result));
  }
}

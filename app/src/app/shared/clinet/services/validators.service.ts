import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ClientApi } from 'src/app/features/clients/api/clients.api';

@Injectable()
export class UniquePhoneNumberValidator implements AsyncValidator {
  constructor(private _clientApi: ClientApi) {}

  validate = (
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return this._clientApi.checkPhoneNumber(ctrl.value).pipe(
      map((isTaken: any) => (isTaken.result == false ? { uniqueNumber: true } : null)),
      catchError(() => of(null))
    );
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MeasurementModel } from 'src/app/features/clients/models/mesaurement.model';
import { WorkplaceApi } from 'src/app/features/workplaces/api/workplace.api';
import { WorkplaceResource } from 'src/app/features/workplaces/resources/workplace.resource';

@Injectable()
export class ClientService {
  private showRegistrationForm = new BehaviorSubject<{
    show: boolean;
    add: boolean;
    lang: 'ar' | 'en';
  }>({
    show: false,
    add: true,
    lang: 'en',
  });

  private showMeasurementForm = new BehaviorSubject<{
    show: boolean;
    isImport: boolean;
    model?: MeasurementModel;
  }>({
    show: false,
    isImport: false,
  });

  private workplaces = new BehaviorSubject<Array<WorkplaceResource>>([]);

  constructor(private _workplaceApi: WorkplaceApi) {}

  get watchRegistrationForm$(): Observable<{
    show: boolean;
    add: boolean;
    lang: 'ar' | 'en';
  }> {
    return this.showRegistrationForm.asObservable();
  }

  get workplaces$(): Observable<Array<WorkplaceResource>> {
    return this.workplaces.asObservable();
  }

  get showMeasurementForm$(): Observable<{
    show: boolean;
    isImport: boolean;
    model?: MeasurementModel;
  }> {
    return this.showMeasurementForm.asObservable();
  }

  showRegistrationModal(
    value: boolean,
    add = true,
    lang: 'en' | 'ar' = 'en'
  ): void {
    this.showRegistrationForm.next({ show: value, add: add, lang: lang });
  }

  setShowMeasurementForm(data: {
    show: boolean;
    isImport: boolean;
    model?: MeasurementModel;
  }): void {
    this.showMeasurementForm.next(data);
  }

  closeRegistrationModal(): void {
    this.showRegistrationForm.next({
      ...this.showRegistrationForm.getValue(),
      show: false,
    });
  }

  loadWorkplaces(): Observable<any> {
    return this._workplaceApi.getWorkSpaces().pipe(
      tap((res) => {
        this.workplaces.next(res);
      })
    );
  }
}

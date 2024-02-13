import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { delay, map, startWith, tap } from 'rxjs/operators';
import { AppState } from 'src/app/core/state/app.state';
import { ClientService } from 'src/app/shared/clinet/client.service';
import { SubscriptionResource } from '../subscription/resources/subscription.resource';
import { ClientApi } from './api/clients.api';
import { Gender } from './enums/gender.enum';
import { ClientObservationModel } from './models/client-observation.model';
import { ClientModel } from './models/client.model';
import { MeasurementModel } from './models/mesaurement.model';
import { ClientResource } from './resources/client.resource';
import { ClientState } from './state/client.state';
import { BhTap } from './state/types';

@Injectable()
export class ClientFacade {
  constructor(
    private _appState: AppState,
    private _clientState: ClientState,
    private _clientApi: ClientApi,
    private _clientService: ClientService,
    private _router: Router,
    private _message: NzMessageService
  ) {}

  get lang$(): Observable<'en' | 'ar'> {
    return this._appState.getLanguage();
  }

  get clients$(): Observable<Array<ClientResource>> {
    return this._clientState.getClients();
  }

  get loading$(): Observable<boolean> {
    return this._clientState.getLoading();
  }

  get loadingClientDetails$(): Observable<boolean> {
    return this._clientState.getLoadClientDetailsLoading();
  }

  get selectedClient$(): Observable<ClientResource> {
    return this._clientState.getSelectedClient();
  }

  get profileTaps$(): Observable<Array<BhTap>> {
    return this._clientState.getProfileTaps();
  }

  get activeMeasurement$(): Observable<{}> {
    return this._clientState.getActiveMeasurement();
  }

  get subscriptionLoading$(): Observable<boolean> {
    return this._clientState.getSubscriptionLoading();
  }

  get metaSubscription$(): Observable<{}> {
    return this._clientState.getMetaSubscription().pipe(delay(0));
  }

  setActiveMeasurement(data: {}): void {
    this._clientState.setActiveMeasurement(data);
  }

  onClientAdd(lang: 'ar' | 'en'): void {
    this._clientService.showRegistrationModal(true, true, lang);
  }

  loadClients(wpId: number = 0, searchKey: string = ''): Observable<any> {
    this._clientState.setLoading(true);
    return this._clientApi.getAll(wpId, searchKey).pipe(
      tap(
        (clients: Array<ClientResource>) => {
          this._clientState.setClients(clients);
          this._clientState.setLoading(false);
        },
        () => {
          this._clientState.setLoading(false);
        }
      )
    );
  }

  getClientById(clientId: string): Observable<any> {
    this._clientState.setLoadClientDetailsLoadingClient(true);
    return this._clientApi.getClient(clientId).pipe(
      tap(
        (res: ClientResource) => {
          this._clientState.setSelectedClient(res);
          this._clientState.setLoadClientDetailsLoadingClient(false);
        },
        (err) => {
          this._clientState.setLoadClientDetailsLoadingClient(false);
        }
      )
    );
  }

  addClient(clientModel: ClientModel): Observable<any> {
    let resource = this._clientState.modelToResource(clientModel);

    this._clientState.addClient(resource);

    return this._clientApi.addClient(clientModel).pipe(
      tap(
        (res) => {
          this._clientState.updateClient(resource.clientId, res);
        },
        () => {
          this._clientState.deleteClient(resource.clientId);
        }
      )
    );
  }

  updateClientGender(clientId: string, gender: Gender): Observable<any> {
    this._clientState.updateClientGender(clientId, gender);

    return this._clientApi
      .updateClient(clientId, { gender: gender } as ClientModel)
      .pipe(
        tap(
          (res: ClientResource) => {
            this._clientState.updateClientUpdatedOn(
              clientId,
              res.updatedOn,
              res.updatedBy
            );

            this._clientState.setSelectedClient(res);
          },
          () => {
            // todo: handle error
          }
        )
      );
  }

  updateClientBirthDate(clientId: string, date: Date): Observable<any> {
    this._clientState.updateClientBirthDate(clientId, date);

    return this._clientApi
      .updateClient(clientId, { birthDate: date } as ClientModel)
      .pipe(
        tap(
          (res: ClientResource) => {
            this._clientState.updateClientUpdatedOn(
              clientId,
              res.updatedOn,
              res.updatedBy
            );

            this._clientState.setSelectedClient(res);
          },
          () => {
            // todo: handle error
          }
        )
      );
  }

  updateClientPhone(clientId: string, phone: string): Observable<any> {
    this._clientState.updateClientPhone(clientId, phone);

    return this._clientApi
      .updateClient(clientId, { phoneNumber: phone } as ClientModel)
      .pipe(
        tap(
          (res: ClientResource) => {
            this._clientState.updateClientUpdatedOn(
              clientId,
              res.updatedOn,
              res.updatedBy
            );

            this._clientState.setSelectedClient(res);
          },
          () => {
            // todo: handle error
          }
        )
      );
  }
  updateClientWorkplaces(
    clientId: string,
    workplaces: Array<number>
  ): Observable<any> {
    this._clientState.updateClientWorkplaces(clientId, workplaces);

    return this._clientApi
      .updateClient(clientId, { workPlacesIds: workplaces } as ClientModel)
      .pipe(
        tap(
          (res: ClientResource) => {
            this._clientState.updateClientUpdatedOn(
              clientId,
              res.updatedOn,
              res.updatedBy
            );

            this._clientState.setSelectedClient(res);
          },
          () => {
            // todo: handle error
          }
        )
      );
  }

  updateClientFullName(clientId: string, name: string): Observable<any> {
    this._clientState.updateClientFullName(clientId, name);

    return this._clientApi
      .updateClient(clientId, { fullName: name } as ClientModel)
      .pipe(
        tap(
          (res: ClientResource) => {
            this._clientState.updateClientUpdatedOn(
              clientId,
              res.updatedOn,
              res.updatedBy
            );

            this._clientState.setSelectedClient(res);
          },
          () => {
            // todo: handle error
          }
        )
      );
  }

  addClientTag(clientId: string, tag: string): Observable<any> {
    this._clientState.addClientTag(clientId, tag);

    return this._clientApi.addTag(clientId, tag).pipe(
      tap(
        (res: ClientResource) => {
          this._clientState.updateClientUpdatedOn(
            clientId,
            res.updatedOn,
            res.updatedBy
          );

          this._clientState.setSelectedClient(res);
        },
        (err) => {}
      )
    );
  }

  removeClientTag(clientId: string, tagId: number): Observable<any> {
    this._clientState.removeClientTag(clientId, tagId);

    return this._clientApi.removeTag(clientId, tagId).pipe(
      tap(
        (res: ClientResource) => {
          this._clientState.updateClientUpdatedOn(
            clientId,
            res.updatedOn,
            res.updatedBy
          );

          this._clientState.setSelectedClient(res);
        },
        (err) => {}
      )
    );
  }

  addClientDisease(clientId: string, disease: string): Observable<any> {
    this._clientState.addClientDisease(clientId, disease);

    return this._clientApi.addDisease(clientId, disease).pipe(
      tap(
        (res: ClientResource) => {
          this._clientState.updateClientUpdatedOn(
            clientId,
            res.updatedOn,
            res.updatedBy
          );

          this._clientState.setSelectedClient(res);
        },
        (err) => {}
      )
    );
  }

  removeClientDisease(clientId: string, diseaseId: number): Observable<any> {
    this._clientState.removeClientDisease(clientId, diseaseId);

    return this._clientApi.removeTag(clientId, diseaseId).pipe(
      tap(
        (res: ClientResource) => {
          this._clientState.updateClientUpdatedOn(
            clientId,
            res.updatedOn,
            res.updatedBy
          );

          this._clientState.setSelectedClient(res);
        },
        (err) => {}
      )
    );
  }

  addClientMedication(clientId: string, medication: string): Observable<any> {
    this._clientState.addClientMedication(clientId, medication);

    return this._clientApi.addMedication(clientId, medication).pipe(
      tap(
        (res: ClientResource) => {
          this._clientState.updateClientUpdatedOn(
            clientId,
            res.updatedOn,
            res.updatedBy
          );

          this._clientState.setSelectedClient(res);
        },
        (err) => {}
      )
    );
  }

  removeClientMedication(
    clientId: string,
    medicationId: number
  ): Observable<any> {
    this._clientState.removeClientMedication(clientId, medicationId);

    return this._clientApi.removeMedication(clientId, medicationId).pipe(
      tap(
        (res: ClientResource) => {
          this._clientState.updateClientUpdatedOn(
            clientId,
            res.updatedOn,
            res.updatedBy
          );

          this._clientState.setSelectedClient(res);
        },
        (err) => {}
      )
    );
  }

  addClientObservation(
    clientId: string,
    model: ClientObservationModel
  ): Observable<any> {
    this._clientState.addClientObservation(clientId, model);

    return this._clientApi.addObservation(clientId, model).pipe(
      tap(
        (res: ClientResource) => {
          this._clientState.updateClientUpdatedOn(
            clientId,
            res.updatedOn,
            res.updatedBy
          );

          this._clientState.setSelectedClient(res);
        },
        (err) => {}
      )
    );
  }

  updateClientObservation(
    clientId: string,
    observationId: number,
    model: ClientObservationModel
  ): Observable<any> {
    this._clientState.updateClientObservation(clientId, observationId, model);

    return this._clientApi
      .updateObservation(clientId, observationId, model)
      .pipe(
        tap(
          (res: ClientResource) => {
            this._clientState.updateClientUpdatedOn(
              clientId,
              res.updatedOn,
              res.updatedBy
            );

            this._clientState.setSelectedClient(res);
          },
          (err) => {}
        )
      );
  }

  removeClientObservation(
    clientId: string,
    observationId: number
  ): Observable<any> {
    this._clientState.removeClientObservation(clientId, observationId);

    return this._clientApi.removeObservation(clientId, observationId).pipe(
      tap(
        (res: ClientResource) => {
          this._clientState.updateClientUpdatedOn(
            clientId,
            res.updatedOn,
            res.updatedBy
          );

          this._clientState.setSelectedClient(res);
        },
        (err) => {}
      )
    );
  }

  addClientMeasurement(
    clientId: string,
    model: MeasurementModel
  ): Observable<any> {
    this._clientState.addClientMeasurement(clientId, model);

    return this._clientApi.addMeasurement(clientId, model).pipe(
      tap(
        (res: ClientResource) => {
          this._clientState.updateClientUpdatedOn(
            clientId,
            res.updatedOn,
            res.updatedBy
          );

          this._clientState.setSelectedClient(res);
        },
        (err) => {}
      )
    );
  }

  updateClientMeasurement(
    clientId: string,
    measurementId: number,
    model: MeasurementModel
  ): Observable<any> {
    this._clientState.updateClientMeasurement(clientId, measurementId, model);

    return this._clientApi
      .updateMeasurement(clientId, measurementId, model)
      .pipe(
        tap(
          (res: ClientResource) => {
            this._clientState.updateClientUpdatedOn(
              clientId,
              res.updatedOn,
              res.updatedBy
            );

            this._clientState.setSelectedClient(res);
          },
          (err) => {}
        )
      );
  }

  removeClientMeasurement(
    clientId: string,
    measurementId: number
  ): Observable<any> {
    this._clientState.deleteClientMeasurement(clientId, measurementId);

    return this._clientApi.removeMeasurement(clientId, measurementId).pipe(
      tap(
        (res: ClientResource) => {
          this._clientState.updateClientUpdatedOn(
            clientId,
            res.updatedOn,
            res.updatedBy
          );

          this._clientState.setSelectedClient(res);
        },
        (err) => {}
      )
    );
  }

  addClientSubscription(clientId: string, subId: number): Observable<any> {
    this._clientState.setSubscriptionLoading(true);

    return this._clientApi.addSubscription(clientId, subId).pipe(
      tap(
        (res: ClientResource) => {
          this._clientState.updateClientUpdatedOn(
            clientId,
            res.updatedOn,
            res.updatedBy
          );

          this._clientState.setSelectedClient(res);
          this._clientState.setSubscriptionLoading(false);
        },
        (err) => {
          this._clientState.setSubscriptionLoading(false);
          this._message.error(
            'حدث خطأ اثناء اضافة الاشتراك, يرجى المحاولة مرة اخرى'
          );
        }
      )
    );
  }

  addClientPayment(clientId: string, amount: number): Observable<any> {
    this._clientState.setSubscriptionLoading(true);

    return this._clientApi.addPayment(clientId, amount).pipe(
      tap(
        (res: ClientResource) => {
          this._clientState.updateClientUpdatedOn(
            clientId,
            res.updatedOn,
            res.updatedBy
          );

          this._clientState.setSelectedClient(res);
          this._clientState.setSubscriptionLoading(false);
        },
        (err) => {
          this._clientState.setSubscriptionLoading(false);
          this._message.error(
            'حدث خطأ اثناء اضافة الاشتراك, يرجى المحاولة مرة اخرى'
          );
        }
      )
    );
  }

  updateClientPayment(
    clientId: string,
    paymentId: number,
    amount: number
  ): Observable<any> {
    this._clientState.setSubscriptionLoading(true);

    return this._clientApi.updatePayment(clientId, paymentId, amount).pipe(
      tap(
        (res: ClientResource) => {
          this._clientState.updateClientUpdatedOn(
            clientId,
            res.updatedOn,
            res.updatedBy
          );

          this._clientState.setSelectedClient(res);
          this._clientState.setSubscriptionLoading(false);
        },
        (err) => {
          this._clientState.setSubscriptionLoading(false);
          this._message.error(
            'حدث خطأ اثناء اضافة الاشتراك, يرجى المحاولة مرة اخرى'
          );
        }
      )
    );
  }

  deleteClientPayment(clientId: string, paymentId: number): Observable<any> {
    this._clientState.setSubscriptionLoading(true);

    return this._clientApi.deletePayment(clientId , paymentId).pipe(
      tap(
        (res: ClientResource) => {
          this._clientState.updateClientUpdatedOn(
            clientId,
            res.updatedOn,
            res.updatedBy
          );

          this._clientState.setSelectedClient(res);
          this._clientState.setSubscriptionLoading(false);
        },
        (err) => {
          this._clientState.setSubscriptionLoading(false);
          this._message.error(
            'حدث خطأ اثناء اضافة الاشتراك, يرجى المحاولة مرة اخرى'
          );
        }
      )
    );
  }

  pauseClientSubscription(
    clientId: string,
    subId: number,
    csId: number
  ): Observable<any> {
    this._clientState.setSubscriptionLoading(true);

    return this._clientApi.pauseSubscription(clientId, subId, csId).pipe(
      tap(
        (res: ClientResource) => {
          this._clientState.updateClientUpdatedOn(
            clientId,
            res.updatedOn,
            res.updatedBy
          );

          this._clientState.setSelectedClient(res);
          this._clientState.setSubscriptionLoading(false);
        },
        (err) => {
          this._clientState.setSubscriptionLoading(false);
          this._message.error(
            'حدث خطأ اثناء تعديل الاشتراك, يرجى المحاولة مرة اخرى'
          );
        }
      )
    );
  }

  deleteClientSubscription(clientId: string, csId: number): Observable<any> {
    this._clientState.setSubscriptionLoading(true);

    return this._clientApi.RemoveSubscription(clientId, csId).pipe(
      tap(
        (res: ClientResource) => {
          this._clientState.updateClientUpdatedOn(
            clientId,
            res.updatedOn,
            res.updatedBy
          );

          this._clientState.setSelectedClient(res);
          this._clientState.setSubscriptionLoading(false);
        },
        (err) => {
          this._clientState.setSubscriptionLoading(false);
          this._message.error(
            'حدث خطأ اثناء حذف الاشتراك, يرجى المحاولة مرة اخرى'
          );
        }
      )
    );
  }

  removeClient(clientId: string): Observable<any> {
    this._clientState.removeClient(clientId);
    return this._clientApi.removeClient(clientId).pipe(
      tap(
        (res: boolean) => {
          this._router.navigate(['client']);
        },
        (err) => {}
      )
    );
  }

  loadSubscriptions(): Observable<Array<SubscriptionResource>> {
    return this._clientApi.getAllSubscriptions();
  }

  activateTap(index: number): void {
    this._clientState.activateTap(index);
  }
}

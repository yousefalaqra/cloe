import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Gender } from '../enums/gender.enum';
import { ClientObservationModel } from '../models/client-observation.model';
import { ClientModel } from '../models/client.model';
import { MeasurementModel } from '../models/mesaurement.model';
import { ClientResource } from '../resources/client.resource';
import { BhTap } from './types';

@Injectable()
export class ClientState {
  private clients = new BehaviorSubject<Array<ClientResource>>([]);
  private loading = new BehaviorSubject<boolean>(false);

  private loadClientDetailsLoading = new BehaviorSubject<boolean>(false);

  private clientSubscription = new BehaviorSubject<{}>(null);

  private selectedClient = new BehaviorSubject<ClientResource>(null);

  private subscriptionLoading = new BehaviorSubject<boolean>(false);

  private activeMeasurement = new BehaviorSubject<{}>({
    key: 'height',
    label: 'طول القامة',
    unit: 'سم',
  });

  private profileTaps = new BehaviorSubject<Array<BhTap>>([
    { index: 0, active: true },
    { index: 1, active: false },
    { index: 2, active: false },
    { index: 3, active: false },
    // { index: 4, active: false },
    // { index: 5, active: false },
    // { index: 6, active: false },
    // { index: 7, active: false },
  ]);

  getClients(): Observable<Array<ClientResource>> {
    return this.clients.asObservable();
  }

  getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  getLoadClientDetailsLoading(): Observable<boolean> {
    return this.loadClientDetailsLoading.asObservable();
  }

  getSubscriptionLoading(): Observable<boolean> {
    return this.subscriptionLoading.asObservable();
  }

  getSelectedClient(): Observable<ClientResource> {
    return this.selectedClient.asObservable();
  }

  getProfileTaps(): Observable<Array<BhTap>> {
    return this.profileTaps.asObservable();
  }

  getActiveMeasurement(): Observable<{}> {
    return this.activeMeasurement.asObservable();
  }

  setActiveMeasurement(data: {}): void {
    this.activeMeasurement.next(data);
  }

  setSubscriptionLoading(value: boolean): void {
    this.subscriptionLoading.next(value);
  }

  setClients(clients: Array<ClientResource>): void {
    let sortedClient = clients.sort((a, b) => {
      return new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime();
    });
    this.clients.next(sortedClient);
  }

  setLoading(value: boolean): void {
    this.loading.next(value);
  }

  setSelectedClient(client: ClientResource): void {
    let newClient = {
      ...client,
      clientMeasurements: client.clientMeasurements.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    };

    let currentSubscription = client.clientSubscriptions.find(
      (x) => x.isCurrent == true
    );

    if (currentSubscription) {
      let secondsWidth =
        (new Date(currentSubscription.endTime).getTime() -
          new Date(currentSubscription.startTime).getTime()) /
        1000;

      let LeftDays = secondsWidth / 86400;
      let periodDays = currentSubscription.originalPeriod / 24;

      let fixedLeftDays = Number(LeftDays.toFixed(0));
      let fixedPeriodDays = Number(periodDays.toFixed(0));

      let halfPeriod = fixedPeriodDays * 0.5;
      let quarterPeriod = fixedPeriodDays * 0.25;

      let color = '#1ab394';
      if (fixedLeftDays <= halfPeriod && fixedLeftDays > quarterPeriod) {
        color = '#FF5733';
      } else if (fixedLeftDays <= quarterPeriod) {
        color = '#ee0d45d5';
      }

      let subscription = {
        days: LeftDays,
        color: color,
        daysPeriod: periodDays,
      };

      this.clientSubscription.next(subscription);
    }

    // .sort((a, b) => b.date.getDate() - a.date.getDate()),
    this.selectedClient.next(newClient);
  }

  getMetaSubscription(): Observable<{}> {
    return this.clientSubscription.asObservable();
  }

  setLoadClientDetailsLoadingClient(value: boolean): void {
    this.loadClientDetailsLoading.next(value);
  }

  addClient(client: ClientResource): void {
    let currentClients = this.clients.getValue();

    this.setClients([...currentClients, client]);
  }

  updateClient(clientId: string, client: ClientResource): void {
    let currentClients = this.clients.getValue();

    let newClients = currentClients.map((x) =>
      x.clientId == clientId ? client : x
    );

    this.setClients(newClients);
  }

  deleteClient(clientId: string): void {
    let currentClients = this.clients.getValue();

    let newClients = currentClients.filter((x) => x.clientId != clientId);

    this.clients.next(newClients);
  }

  updateClientGender(clientId: string, clientGender: Gender): void {
    let currentClients = this.clients.getValue();

    let newClients = currentClients.map((x) =>
      x.clientId == clientId
        ? ({ ...x, gender: clientGender } as ClientResource)
        : x
    );

    this.setClients(newClients);
  }

  updateClientBirthDate(clientId: string, date: Date): void {
    let currentClients = this.clients.getValue();

    let newClients = currentClients.map((x) =>
      x.clientId == clientId ? ({ ...x, birthDate: date } as ClientResource) : x
    );

    this.setClients(newClients);
  }

  updateClientPhone(clientId: string, phone: string): void {
    let currentClients = this.clients.getValue();

    let newClients = currentClients.map((x) =>
      x.clientId == clientId
        ? ({ ...x, phoneNumber: phone } as ClientResource)
        : x
    );

    this.setClients(newClients);
  }

  updateClientWorkplaces(clientId: string, workplaces: Array<number>): void {
    let currentClients = this.clients.getValue();

    let newClients = currentClients.map((x) =>
      x.clientId == clientId
        ? ({ ...x, workPLacesIds: workplaces } as ClientResource)
        : x
    );

    this.setClients(newClients);
  }

  updateClientFullName(clientId: string, clientName: string): void {
    let currentClients = this.clients.getValue();

    let newClients = currentClients.map((x) =>
      x.clientId == clientId
        ? ({ ...x, fullName: clientName } as ClientResource)
        : x
    );

    this.setClients(newClients);
  }

  addClientTag(clientId: string, tag: string): void {
    let currentClients = this.clients.getValue();

    let newClients = currentClients.map((x) =>
      x.clientId == clientId
        ? ({
            ...x,
            clientTags: x.clientTags.concat({
              tag: tag,
              tagId: new Date().getUTCMilliseconds(),
            }),
          } as ClientResource)
        : x
    );

    this.setClients(newClients);
  }

  removeClientTag(clientId: string, tagId: number): void {
    let currentClients = this.clients.getValue();

    let newClients = currentClients.map((x) =>
      x.clientId == clientId
        ? ({
            ...x,
            clientTags: x.clientTags.filter((x) => x.tagId != tagId),
          } as ClientResource)
        : x
    );

    this.setClients(newClients);
  }

  addClientDisease(clientId: string, disease: string): void {
    let currentClients = this.clients.getValue();

    let newClients = currentClients.map((x) =>
      x.clientId == clientId
        ? ({
            ...x,
            clientDiseases: x.clientDiseases.concat({
              diseaseName: disease,
              id: new Date().getUTCMilliseconds(),
            }),
          } as ClientResource)
        : x
    );

    this.setClients(newClients);
  }

  removeClientDisease(clientId: string, diseaseId: number): void {
    let currentClients = this.clients.getValue();

    let newClients = currentClients.map((x) =>
      x.clientId == clientId
        ? ({
            ...x,
            clientDiseases: x.clientDiseases.filter((x) => x.id != diseaseId),
          } as ClientResource)
        : x
    );

    this.setClients(newClients);
  }

  addClientMedication(clientId: string, medication: string): void {
    let currentClients = this.clients.getValue();

    let newClients = currentClients.map((x) =>
      x.clientId == clientId
        ? ({
            ...x,
            clientMedications: x.clientMedications.concat({
              medicationName: medication,
              id: new Date().getUTCMilliseconds(),
            }),
          } as ClientResource)
        : x
    );

    this.setClients(newClients);
  }

  removeClientMedication(clientId: string, medicationId: number): void {
    let currentClients = this.clients.getValue();

    let newClients = currentClients.map((x) =>
      x.clientId == clientId
        ? ({
            ...x,
            clientMedications: x.clientMedications.filter(
              (x) => x.id != medicationId
            ),
          } as ClientResource)
        : x
    );

    this.setClients(newClients);
  }

  addClientObservation(clientId: string, model: ClientObservationModel): void {
    let currentClients = this.clients.getValue();

    let newClients = currentClients.map((x) =>
      x.clientId == clientId
        ? ({
            ...x,
            clientObservations: x.clientObservations.concat({
              observation: model.observation,
              observationDate: model.observationDate,
              id: new Date().getUTCMilliseconds(),
            }),
          } as ClientResource)
        : x
    );

    this.setClients(newClients);
  }

  updateClientObservation(
    clientId: string,
    observationId: number,
    model: ClientObservationModel
  ): void {
    let currentClients = this.clients.getValue();

    let newClients = currentClients.map((x) =>
      x.clientId == clientId
        ? ({
            ...x,
            clientObservations: x.clientObservations.map((y) =>
              y.id == observationId
                ? {
                    ...y,
                    observation: model.observation,
                    observationDate: model.observationDate,
                  }
                : y
            ),
          } as ClientResource)
        : x
    );

    this.setClients(newClients);
  }

  removeClientObservation(clientId: string, observationId: number): void {
    let currentClients = this.clients.getValue();

    let newClients = currentClients.map((x) =>
      x.clientId == clientId
        ? ({
            ...x,
            clientObservations: x.clientObservations.filter(
              (x) => x.id != observationId
            ),
          } as ClientResource)
        : x
    );

    this.setClients(newClients);
  }

  addClientMeasurement(clientId: string, model: MeasurementModel): void {
    let currentClients = this.clients.getValue();

    let newClients = currentClients.map((x) =>
      x.clientId == clientId
        ? ({
            ...x,
            clientMeasurements: x.clientMeasurements
              .concat({
                bodyFatMass: model.bodyFatMass,
                bodyMassIndex: model.bodyMassIndex,
                caloriesIntake: model.caloriesIntake,
                date: model.date,
                fatOfLeftArm: model.fatOfLeftArm,
                fatOfLeftLeg: model.fatOfLeftLeg,
                fatOfRightArm: model.fatOfRightArm,
                fatOfRightLeg: model.fatOfRightLeg,
                fatOfTruck: model.fatOfTruck,
                height: model.height,
                id: new Date().getUTCMilliseconds(),
                minerals: model.minerals,
                protien: model.protien,
                skeletalMuscleMass: model.skeletalMuscleMass,
                totalBodyWater: model.totalBodyWater,
                wight: model.wight,
                waistHipRatio: model.waistHipRatio,
              })
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              ),
          } as ClientResource)
        : x
    );

    this.setClients(newClients);
  }

  updateClientMeasurement(
    clientId: string,
    measurementId: number,
    model: MeasurementModel
  ): void {
    let currentClients = this.clients.getValue();

    let newClients = currentClients.map((x) =>
      x.clientId == clientId
        ? ({
            ...x,
            clientMeasurements: x.clientMeasurements
              .map((y) =>
                y.id == measurementId
                  ? {
                      bodyFatMass: model.bodyFatMass,
                      bodyMassIndex: model.bodyMassIndex,
                      caloriesIntake: model.caloriesIntake,
                      date: model.date,
                      fatOfLeftArm: model.fatOfLeftArm,
                      fatOfLeftLeg: model.fatOfLeftLeg,
                      fatOfRightArm: model.fatOfRightArm,
                      fatOfRightLeg: model.fatOfRightLeg,
                      fatOfTruck: model.fatOfTruck,
                      height: model.height,
                      minerals: model.minerals,
                      protien: model.protien,
                      skeletalMuscleMass: model.skeletalMuscleMass,
                      totalBodyWater: model.totalBodyWater,
                      wight: model.wight,
                      waistHipRatio: model.waistHipRatio,
                    }
                  : y
              )
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              ),
          } as ClientResource)
        : x
    );

    this.setClients(newClients);
  }

  deleteClientMeasurement(clientId: string, measurementId: number): void {
    let currentClients = this.clients.getValue();

    let newClients = currentClients.map((x) =>
      x.clientId == clientId
        ? ({
            ...x,
            clientMeasurements: x.clientMeasurements
              .filter((y) => y.id != measurementId)
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              ),
          } as ClientResource)
        : x
    );

    this.setClients(newClients);
  }

  removeClient(clientId: string): void {
    let currentClients = this.clients.getValue();

    let newClients = currentClients.filter((x) => x.clientId != clientId);

    this.setClients(newClients);
  }

  updateClientUpdatedOn(
    clientId: string,
    updatedOn: Date,
    updateBy: string
  ): void {
    let currentClients = this.clients.getValue();

    let newClients = currentClients.map((x) =>
      x.clientId == clientId
        ? ({
            ...x,
            updatedOn: updatedOn,
            updatedBy: updateBy,
          } as ClientResource)
        : x
    );

    this.setClients(newClients);
  }

  activateTap(index: number): void {
    let currentTaps = this.profileTaps.getValue();

    let newTaps = currentTaps.map((x) =>
      x.index == index
        ? ({ ...x, active: true } as BhTap)
        : ({ ...x, active: false } as BhTap)
    );

    this.profileTaps.next(newTaps);
  }

  modelToResource(model: ClientModel): ClientResource {
    let resource: ClientResource = {
      birthDate: model.birthDate,
      clientId: model.phoneNumber,
      fullName: model.fullName,
      gender: model.gender,
      phoneNumber: model.phoneNumber,
      isActive: model.isActive,
      createdAt: new Date(Date.now()),
      updatedOn: new Date(Date.now()),
      createdBy: 'Development',
      workPLacesIds: model.workPlacesIds,
      clientTags: [],
      clientDiseases: [],
      clientMedications: [],
      clientObservations: [],
      clientMeasurements: [],
      clientSubscriptions: [],
      dues: [],
      payments: [],
      appointments: [],
      templateId: 0,
      inDebt: false,
    };

    return resource;
  }
}

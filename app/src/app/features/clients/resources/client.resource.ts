import { TrackableResource } from 'src/app/core/resources/trackable.resource';
import { AppointmentResource } from '../../home/resources/appointment.resource';
import { Gender } from '../enums/gender.enum';
import { ClientDiseaseResource } from './client-disease.resource';
import { ClientDueResource } from './client-due.resource';
import { ClientMedicationResource } from './client-mdedcation.resource';
import { ClientObservationResource } from './client-observation.resource';
import { ClientPaymentResource } from './client-payment.resource';
import { ClientSubscriptionsResource } from './client-subscriptions.resource';
import { ClientTagResource } from './client-tag.resource';
import { MeasurementResource } from './measurement.resource';

export class ClientResource extends TrackableResource {
  clientId: string;
  fullName: string;
  birthDate: Date;
  gender: Gender;
  phoneNumber: string;
  isActive: boolean;
  workPLacesIds: Array<number>;
  clientTags: Array<ClientTagResource>;
  clientDiseases: Array<ClientDiseaseResource>;
  clientMedications: Array<ClientMedicationResource>;
  clientObservations: Array<ClientObservationResource>;
  clientMeasurements: Array<MeasurementResource>
  clientSubscriptions: Array<ClientSubscriptionsResource>
  templateId: number;
  payments: Array<ClientPaymentResource>;
  dues: Array<ClientDueResource>
  inDebt: boolean;
  appointments: Array<AppointmentResource>
}

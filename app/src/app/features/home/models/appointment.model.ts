import { AppointmentStatus } from '../enums/appointment-status.enum';

export class AppointmentModel {
  startTime: Date;
  endTime: Date;
  status: AppointmentStatus;
}

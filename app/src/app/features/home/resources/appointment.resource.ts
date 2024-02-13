import { ClientResource } from "../../clients/resources/client.resource";
import { AppointmentStatus } from "../enums/appointment-status.enum";

export  class AppointmentResource{
    id: number;
    startTime: Date;
    endTime: Date;
    status: AppointmentStatus;
    client: ClientResource
}
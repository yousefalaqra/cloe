import { TrackableModel } from "src/app/core/models/trackable.model";
import { TrackableResource } from "src/app/core/resources/trackable.resource";
import { TemplateModel } from "../../templates/models/template.model";
import { Gender } from "../enums/gender.enum";

export class ClientModel extends TrackableModel{
    fullName: string;
    birthDate: Date;
    phoneNumber: string;
    gender: Gender;
    workPlacesIds: Array<number>;
    isActive: boolean;
    template: TemplateModel
}
import { TrackableModel } from 'src/app/core/models/trackable.model';
import { PlanModel } from './plan.mode';

export class TemplateModel extends TrackableModel {
  name: string;
  plans : Array<PlanModel>;
}

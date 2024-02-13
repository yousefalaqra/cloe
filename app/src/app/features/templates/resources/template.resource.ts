import { TrackableResource } from 'src/app/core/resources/trackable.resource';
import { PlanResource } from './plan.resource';

export class TemplateResource extends TrackableResource {
  id: number;
  name: string;
  fat: number;
  energy: number;
  protien: number;
  carbs: number;
  plans: Array<PlanResource>
}

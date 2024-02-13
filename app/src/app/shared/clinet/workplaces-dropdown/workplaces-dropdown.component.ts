import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { WorkplaceResource } from 'src/app/features/workplaces/resources/workplace.resource';
import { ClientService } from '../client.service';

@Component({
  selector: 'workplaces-dropdown',
  templateUrl: './workplaces-dropdown.component.html',
  styleUrls: ['./workplaces-dropdown.component.scss'],
})
export class WorkplacesDropdownComponent implements OnInit, OnDestroy {
  subscriptions: Array<Subscription> = [];
  workplaces: Array<WorkplaceResource>;

  @Input('clinetWorkplaces') selectedWorkPlace: string[] = ['1'];
  @Input('open') open: boolean;
  workplaceError: boolean = false;

  @Output('onChange') onSelectedWorkPlaces = new EventEmitter<Array<string>>();

  constructor(private _clientService: ClientService) {}

  ngOnInit() {
    this.subscriptions.push(
      this._clientService.workplaces$.subscribe((x) => (this.workplaces = x)),
      this._clientService.loadWorkplaces().subscribe()
    );
  }

  onWorkplaceChange(workplacesIds): void {
    if (workplacesIds.length <= 0) {
      this.workplaceError = true;
    } else {
      this.workplaceError = false;
    }

    this.selectedWorkPlace.push(workplacesIds);

    this.onSelectedWorkPlaces.emit(workplacesIds)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}

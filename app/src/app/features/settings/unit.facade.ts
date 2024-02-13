import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnitApi } from './api/unit.api';
import { UnitResource } from './resources/unit/unit.resource';
import { UnitState } from './state/unit.state';

@Injectable()
export class UnitFacade {
  constructor(private unitState: UnitState, private unitApi: UnitApi) {}
  units$: Observable<Array<UnitResource>> = this.unitState.getUnits();
  observableUnits :  Observable<any> ;

  loadUnits(): Observable<UnitResource> {
    this.observableUnits =this.unitApi.getUnits(); 
    this.observableUnits.subscribe(e => {this.setUnits(e.result);});
    return this.observableUnits;
  }


  setUnits(units: Array<UnitResource>) {
    this.unitState.setUnits(units);
  }

  addUnit(unit:UnitResource )
  {
     this.unitApi.addUnit(unit).subscribe(e => {
      this.unitState.addUnit(e.result);

    });
  }

  updateUnit(unit:UnitResource )
  {
    this.unitApi.updateUnit(unit).subscribe(e => {
      this.unitState.updateUnit(unit);
  

    });
  }

  deleteUnit(unit:UnitResource )
  {
    this.unitApi.deletUnit(unit.id).subscribe(e => {
      this.unitState.removeUnit(unit.id);
    });
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnitResource } from '../resources/unit/unit.resource';

@Injectable()
export class UnitState {
  private units = new BehaviorSubject<Array<UnitResource>>([]);

  getUnits(): Observable<Array<UnitResource>> {
    return this.units.asObservable();
  }

  setUnits(units: Array<UnitResource>) {
    this.units.next(units);
  }
  addUnit(unit:UnitResource) {
    const currentValue = this.units.getValue();
    this.units.next([...currentValue, unit]);
  }

  updateUnit(unit:UnitResource) {
    const currentValue = this.units.getValue();
    const indexOfUpdated = currentValue.findIndex(u => u.id === unit.id);
    currentValue[indexOfUpdated] = unit;
    this.units.next([...currentValue]);
  }

  updateUnitbyId(unit,id) {
    const currentValue = this.units.getValue();
    const indexOfUpdated = currentValue.findIndex(u => u.id === id);
    currentValue[indexOfUpdated] = unit;
    this.units.next([...currentValue]);
  }

  removeUnit(id:number) {
    const currentValue = this.units.getValue();
    this.units.next(currentValue.filter(u => u.id !== id));
  }
}

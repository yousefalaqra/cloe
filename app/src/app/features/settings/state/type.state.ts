import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TypeResource } from '../resources/types/type.resource';
@Injectable()
export class TypeState {
  private types = new BehaviorSubject<Array<TypeResource>>([]);

  getTypes(): Observable<Array<TypeResource>> {
    return this.types.asObservable();
  }

  setTypes(types: Array<TypeResource>) {
    this.types.next(types);
  }
  addType(type:TypeResource) {
    const currentValue = this.types.getValue();
    this.types.next([...currentValue, type]);
  }

  updateType(type:TypeResource) {
    const currentValue = this.types.getValue();
    const indexOfUpdated = currentValue.findIndex(t => t.id === type.id);
    currentValue[indexOfUpdated] = type;
    this.types.next([...currentValue]);
  }

  updateTypebyId(type,id) {
    const currentValue = this.types.getValue();
    const indexOfUpdated = currentValue.findIndex(t => t.id === id);
    currentValue[indexOfUpdated] = type;
    this.types.next([...currentValue]);
  }

  removeType(id:number) {
    const currentValue = this.types.getValue();
    this.types.next(currentValue.filter(t => t.id !== id));
  }
}

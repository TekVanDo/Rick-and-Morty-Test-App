import { BehaviorSubject, Observable } from 'rxjs';
import * as _ from 'lodash';
import { IQueryFilterController } from '../interfaces/query-filter.interfaces';

export abstract class CommonController<T = any, ToUrlType = any> implements IQueryFilterController<T> {
  protected onChange: BehaviorSubject<T>;
  defaultValue: any = {};

  constructor() {
    this.onChange = new BehaviorSubject(this.getDefaultValue());
  }

  setValue(params: any): void {
    if (typeof params !== 'object') {
      throw new Error('params should be an object');
    }

    if (!_.isEqual(this.getValue(), params)) {
      this.onChange.next({ ...params });
    }
  }

  patchValue(params: any) {
    if (typeof params !== 'object') {
      throw new Error('params should be an object');
    }
    const newParams = Object.assign(this.getValue(), params);

    this.onChange.next({ ...newParams });
  }

  getValue(): T {
    return { ...this.onChange.getValue() };
  }

  getDefaultValue(): T {
    return this.defaultValue;
  }

  setDefaultValue(value: T): void {
    this.defaultValue = value;
  }

  clear(): void {
    this.setValue(this.getDefaultValue());
  }

  getOnChange$(): Observable<T> {
    return this.onChange.asObservable();
  }
}

import { Observable } from 'rxjs';

export interface IQueryFilterController<T> {
  patchValue(value: T): void;
  setValue(value: T): void;
  getValue(): T;
  getDefaultValue(): T;
  clear(): void;
  getOnChange$(): Observable<T>;
}

export interface IQueryFilterParams {
  pagination?: IPagination;
  propertiesFilter?: IPropertiesFilter;
}

export interface IPropertiesFilter {
  [key: string]: any;
}

export interface IPagination {
  itemsPerPage?: number;
  currentPage?: number;
}

import { Observable } from 'rxjs';
import { PaginationUrlParams } from '../controllers/PaginationController';
import { PropertiesUrlParams } from '../controllers/PropertiesFilterController';
import { SortUrlParams } from '../controllers/SortingController';

export interface IQueryFilterController<T> {
  patchValue(value: T): void;
  setValue(value: T): void;
  getValue(): T;
  getDefaultValue(): T;
  clear(): void;
  getOnChange$(): Observable<T>;
}

export interface IQueryFilterParams {
  selection?: ISelection;
  pagination?: IPagination;
  sorting?: ISorting;
  propertiesFilter?: IPropertiesFilter;
}

export interface IMainQueryFilterParams {
  sorting?: ISorting;
  propertiesFilter?: IPropertiesFilter;
  pagination: IPagination;
}

export interface ISelection {
  include: string[];
  exclude: string[];
  all: boolean;
}

export interface IPropertiesFilter {
  [key: string]: any;
}

export interface IPagination {
  itemsPerPage?: number;
  currentPage?: number;
}

export interface ISorting {
  [field: string]: 'asc' | 'desc';
}

export type UrlParametersObject = PaginationUrlParams | PropertiesUrlParams | SortUrlParams;

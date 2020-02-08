import { CommonController } from './CommonController';
import { ISorting } from '../interfaces/query-filter.interfaces';

const ASC = 'asc';
const DESC = 'desc';
type OrderValues = 'asc' | 'desc';

export interface SortItemUrlParams {
  field: string;
  order: OrderValues;
}

export interface SortUrlParams {
  sort: SortItemUrlParams[];
}

export class SortingController extends CommonController<ISorting, SortUrlParams> {
  toggleSort(fieldName: string): void {
    const sorting = this.getValue();
    if (sorting[fieldName]) {
      if (sorting[fieldName] === ASC) {
        sorting[fieldName] = DESC;
        this.setValue(sorting);
      } else if (sorting[fieldName] === DESC) {
        delete sorting[fieldName];
        this.setValue(sorting);
      }
    } else {
      this.setValue({
        ...sorting,
        [fieldName]: ASC
      });
    }
  }

  setSort(fieldName: string, val: OrderValues): void {
    const sorting = this.getValue();
    if (!val) {
      delete sorting[fieldName];
    }
    sorting[fieldName] = val;
    this.setValue(sorting);
  }

  isSortAscending(fieldName): boolean {
    const sorting = this.getValue();
    return sorting[fieldName] && sorting[fieldName] === ASC;
  }

  isSortDescending(fieldName): boolean {
    const sorting = this.getValue();
    return sorting[fieldName] && sorting[fieldName] === DESC;
  }

  isSorted(fieldName): boolean {
    const sorting = this.getValue();
    return !!sorting[fieldName];
  }
}

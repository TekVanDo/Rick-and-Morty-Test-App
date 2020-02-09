import { IQueryFilterParams } from './interfaces/query-filter.interfaces';
import { ControllersDictionary } from './interfaces/controllers-dictionary';
import { PaginationController } from './controllers/pagination-controller';
import { FilterController } from './controllers/filter-controller';

export class QueryBuilder {
  private controllers: ControllersDictionary = {
    pagination: new PaginationController(),
    filter: new FilterController()
  };

  constructor() {
  }

  clear(): void {
    Object.values(this.controllers).forEach((controller) => {
      controller.clear();
    });
  }

  setTotalCount(totalCount: number): void {
    this.controllers.pagination.setTotalCount(totalCount);
  }

  getPaginationController(): PaginationController {
    return this.controllers.pagination;
  }

  getFilterController(): FilterController {
    return this.controllers.filter;
  }

  setQueryParams(params: IQueryFilterParams): void {
    Object.keys(this.controllers).forEach((key) => {
      if (params[key]) {
        this.controllers[key].setValue(params[key]);
      }
    });
  }

  patchQueryParams(params: IQueryFilterParams): void {
    Object.keys(this.controllers).forEach((key) => {
      if (params[key]) {
        this.controllers[key].patchValue(params[key]);
      }
    });
  }

  getCurrentValue(): IQueryFilterParams {
    return Object.keys(this.controllers).reduce((res, key) => {
      res[key] = this.controllers[key].getValue();
      return res;
    }, {});
  }
}

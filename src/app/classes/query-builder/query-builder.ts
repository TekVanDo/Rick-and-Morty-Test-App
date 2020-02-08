import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationController } from './controllers/PaginationController';
import { PropertiesFilterController } from './controllers/PropertiesFilterController';
import { IQueryFilterParams } from './interfaces/query-filter.interfaces';
import { ControllersDictionary } from './interfaces/controllers-dictionary';

export class QueryBuilder {
  totalCount = 0;
  private controllers: ControllersDictionary = {
    paginationController: new PaginationController(),
    propertiesFilterController: new PropertiesFilterController()
  };

  constructor() {
  }

  getMainQueryParams$(): Observable<IQueryFilterParams> {
    return combineLatest([
      this.controllers.propertiesFilterController.getOnChange$(),
      this.controllers.paginationController.getOnChange$()
    ]).pipe(map(([propertiesFilter, pagination]) => {
      return { propertiesFilter, pagination };
    }));
  }

  clear() {
    Object.values(this.controllers).forEach((controller) => {
      controller.clear();
    });
  }

  setTotalCount(totalCount: number) {
    this.totalCount = totalCount;
    this.controllers.paginationController.setTotalCount(this.totalCount);
  }

  getPaginationController(): PaginationController {
    return this.controllers.paginationController;
  }

  getPropertiesFilterController(): PropertiesFilterController {
    return this.controllers.propertiesFilterController;
  }

  setQueryParams(params): void {
    Object.keys(this.controllers).forEach((key) => {
      if (params[key]) {
        this.controllers[key].setValue(params[key]);
      }
    });
  }

  patchQueryParams(params) {
    Object.keys(this.controllers).forEach((key) => {
      if (params[key]) {
        this.controllers[key].patchValue(params[key]);
      }
    });
  }

  setDefaultQueryParams(params): void {
    Object.keys(this.controllers).forEach((key) => {
      if (params[key]) {
        this.controllers[key].setDefaultValue(params[key]);
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

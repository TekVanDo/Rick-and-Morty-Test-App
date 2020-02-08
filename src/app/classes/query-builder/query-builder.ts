import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectionController } from './controllers/SelectionController';
import { PaginationController } from './controllers/PaginationController';
import { PropertiesFilterController } from './controllers/PropertiesFilterController';
import { IMainQueryFilterParams, IQueryFilterParams, UrlParametersObject } from './interfaces/query-filter.interfaces';
import { SortingController } from './controllers/SortingController';
import { ControllersDictionary } from './interfaces/controllers-dictionary';

export class QueryBuilder {
  totalCount = 0;
  private controllers: ControllersDictionary = {
    selectionController: new SelectionController(),
    paginationController: new PaginationController(),
    sortingController: new SortingController(),
    propertiesFilterController: new PropertiesFilterController()
  };

  constructor() {
  }

  getMainQueryParams$(): Observable<IMainQueryFilterParams> {
    return combineLatest([
      this.controllers.sortingController.getOnChange$(),
      this.controllers.propertiesFilterController.getOnChange$(),
      this.controllers.paginationController.getOnChange$()
    ]).pipe(map(([sorting, propertiesFilter, pagination]) => {
      return { sorting, propertiesFilter, pagination };
    }));
  }

  clear() {
    Object.values(this.controllers).forEach((controller) => {
      controller.clear();
    });
  }

  setTotalCount(totalCount: number) {
    this.totalCount = totalCount;
    this.controllers.selectionController.setTotalCount(this.totalCount);
    this.controllers.paginationController.setTotalCount(this.totalCount);
  }

  getSelectionController(): SelectionController {
    return this.controllers.selectionController;
  }

  getPaginationController(): PaginationController {
    return this.controllers.paginationController;
  }

  getSortingController(): SortingController {
    return this.controllers.sortingController;
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

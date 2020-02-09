import { BehaviorSubject, Subject } from 'rxjs';
import { IPagination } from '../interfaces/query-filter.interfaces';
import { CommonController } from './common-controller';

export class PaginationController extends CommonController<IPagination> {
  static DEFAULT_CURRENT_PAGE = 1;
  totalCount$: BehaviorSubject<number>;

  constructor() {
    super();
    this.totalCount$ = new BehaviorSubject<number>(null);
  }

  setTotalCount(totalCount: number) {
    this.totalCount$.next(totalCount);
  }

  setPage(page: number) {
    this.onChange.next({ ...this.getValue(), currentPage: page });
  }

  setItemsPerPage(perPage) {
    this.onChange.next({ currentPage: PaginationController.DEFAULT_CURRENT_PAGE, itemsPerPage: perPage });
  }

  getDefaultValue(): IPagination {
    return { itemsPerPage: 20, currentPage: PaginationController.DEFAULT_CURRENT_PAGE };
  }

  clear(): void {
    super.clear();
    this.setTotalCount(0);
  }
}

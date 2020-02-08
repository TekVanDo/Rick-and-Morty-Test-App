import { Subject } from 'rxjs';
import { IPagination } from '../interfaces/query-filter.interfaces';
import { CommonController } from './common-controller';

export interface PaginationUrlParams {
  page?: number;
}

export class PaginationController extends CommonController<IPagination, PaginationUrlParams> {
  static DEFAULT_CURRENT_PAGE = 1;
  private totalCount: number;
  onTotalCountChange: Subject<number>;

  constructor() {
    super();
    this.totalCount = 0;
    this.onTotalCountChange = new Subject();
  }

  setTotalCount(totalCount: number) {
    this.totalCount = totalCount;
    this.onTotalCountChange.next(this.totalCount);
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

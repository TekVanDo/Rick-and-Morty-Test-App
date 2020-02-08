import { Subject } from 'rxjs';
import { CommonController } from './CommonController';
import { IPagination } from '../interfaces/query-filter.interfaces';

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

  nextPage() {
    const params = this.getValue();
    if (!this.totalCount || params.currentPage + 1 < this.getCountOfPages()) {
      this.onChange.next({ ...params, currentPage: params.currentPage + 1 });
    }
  }

  previousPage() {
    const params = this.getValue();
    if (params.currentPage - 1 > 0) {
      this.onChange.next({ ...params, currentPage: params.currentPage - 1 });
    }
  }

  getCountOfPages() {
    const params = this.getValue();
    return Math.ceil(this.totalCount / params.itemsPerPage);
  }

  clear(): void {
    super.clear();
    this.setTotalCount(0);
  }
}

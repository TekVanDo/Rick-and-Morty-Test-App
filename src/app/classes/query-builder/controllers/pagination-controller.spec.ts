import { PaginationController } from './pagination-controller';
import { FilterController } from './filter-controller';

describe('PaginationController', () => {
  it('should create PaginationController with default value', () => {
    const paginationController = new PaginationController();
    expect(paginationController.getValue()).toEqual({ itemsPerPage: 20, currentPage: 1});
  });

  it('should setTotalCount', () => {
    const paginationController = new PaginationController();
    paginationController.setTotalCount(200);
    expect(paginationController.totalCount$.getValue()).toBe(200);
  });

  it('should set page', () => {
    const paginationController = new PaginationController();
    paginationController.setPage(200);
    expect(paginationController.getValue().currentPage).toBe(200);
  });

  it('should setValue from object', () => {
    const paginationController = new PaginationController();
    paginationController.setValue({ currentPage: 1, itemsPerPage: 20 });
    expect(paginationController.getValue()).toEqual({ currentPage: 1, itemsPerPage: 20 });
  });

  it('should patch object value', () => {
    const paginationController = new PaginationController();
    paginationController.setPage(20);
    paginationController.patchValue({ currentPage: 10 });
    expect(paginationController.getValue()).toEqual({ currentPage: 10, itemsPerPage: 20 });
  });

  it('should set item per page', () => {
    const paginationController = new PaginationController();
    paginationController.setItemsPerPage(200);
    expect(paginationController.getValue().itemsPerPage).toBe(200);
  });

  it('should set paginationController data to default', () => {
    const paginationController = new PaginationController();
    paginationController.setItemsPerPage(200);
    paginationController.setPage(200);
    paginationController.setTotalCount(200);
    paginationController.clear();
    expect(paginationController.getValue()).toEqual(paginationController.getDefaultValue());
  });
});

import { PaginationController } from './pagination-controller';

describe('PaginationController', () => {
  let paginationController: PaginationController;
  beforeEach(() => {
    paginationController = new PaginationController();
  });

  it('should create PaginationController with default value', () => {
    expect(paginationController.getValue()).toEqual({ itemsPerPage: 20, currentPage: 1});
  });

  it('should setTotalCount', () => {
    paginationController.setTotalCount(200);
    expect(paginationController.totalCount$.getValue()).toBe(200);
  });

  it('should set page', () => {
    paginationController.setPage(200);
    expect(paginationController.getValue().currentPage).toBe(200);
  });

  it('should setValue from object', () => {
    paginationController.setValue({ currentPage: 1, itemsPerPage: 20 });
    expect(paginationController.getValue()).toEqual({ currentPage: 1, itemsPerPage: 20 });
  });

  it('should patch object value', () => {
    paginationController.setPage(20);
    paginationController.patchValue({ currentPage: 10 });
    expect(paginationController.getValue()).toEqual({ currentPage: 10, itemsPerPage: 20 });
  });

  it('should set item per page', () => {
    paginationController.setItemsPerPage(200);
    expect(paginationController.getValue().itemsPerPage).toBe(200);
  });

  it('should set paginationController data to default', () => {
    paginationController.setItemsPerPage(200);
    paginationController.setPage(200);
    paginationController.setTotalCount(200);
    paginationController.clear();
    expect(paginationController.getValue()).toEqual(paginationController.getDefaultValue());
  });
});

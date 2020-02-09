import { QueryBuilder } from './query-builder';
import { IQueryFilterParams } from './interfaces/query-filter.interfaces';

describe('QueryBuilder', () => {
  it('should create QueryBuilder with default Controllers', () => {
    const queryBuilder = new QueryBuilder();
    expect(queryBuilder.getCurrentValue()).toEqual({
      pagination: { itemsPerPage: 20, currentPage: 1 },
      filter: {}
    } as IQueryFilterParams);
  });

  it('should set Query Params', () => {
    const queryBuilder = new QueryBuilder();
    queryBuilder.setQueryParams({ pagination: { itemsPerPage: 10, currentPage: 4 } });
    expect(queryBuilder.getCurrentValue()).toEqual({
      pagination: { itemsPerPage: 10, currentPage: 4 },
      filter: {}
    } as IQueryFilterParams);
  });

  it('should patch Query Params', () => {
    const queryBuilder = new QueryBuilder();
    queryBuilder.patchQueryParams({ pagination: { currentPage: 4 } });
    expect(queryBuilder.getCurrentValue()).toEqual({
      pagination: { itemsPerPage: 20, currentPage: 4 },
      filter: {}
    } as IQueryFilterParams);
  });

  it('should clear Query Params', () => {
    const queryBuilder = new QueryBuilder();
    queryBuilder.setQueryParams({ pagination: { currentPage: 4 } });
    queryBuilder.clear();
    expect(queryBuilder.getCurrentValue()).toEqual({
      pagination: { itemsPerPage: 20, currentPage: 1 },
      filter: {}
    } as IQueryFilterParams);
  });

  it('should setTotalCount', () => {
    const queryBuilder = new QueryBuilder();
    queryBuilder.setTotalCount(200);
    expect(queryBuilder.getPaginationController().totalCount$.getValue()).toEqual(200);
  });
});

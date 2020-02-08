import { FilterController } from './filter-controller';

describe('FilterController', () => {
  beforeEach(() => {

  });

  it('should set filter value', () => {
    const filterController = new FilterController();
    filterController.setFilter('name', 'test');
    expect(filterController.getValue().name).toBe('test');
  });

  it('should clear filter value', () => {
    const filterController = new FilterController();
    filterController.setFilter('name', 'test');
    filterController.setFilter('name', '');
    expect(filterController.getValue().name).toBe(undefined);
  });
});

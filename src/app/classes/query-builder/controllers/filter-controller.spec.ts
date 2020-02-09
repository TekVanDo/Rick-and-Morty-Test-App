import { FilterController } from './filter-controller';

describe('FilterController', () => {
  it('should have empty object as default', () => {
    const filterController = new FilterController();
    expect(filterController.getValue()).toEqual({});
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

  it('should setValue from object', () => {
    const filterController = new FilterController();
    filterController.setValue({ name: 'test', surname: 'test2' });
    expect(filterController.getValue()).toEqual({ name: 'test', surname: 'test2' });
  });

  it('should setValue clear empty props from obj', () => {
    const filterController = new FilterController();
    filterController.setValue({ name: 'test', surname: null });
    expect(filterController.getValue()).toEqual({ name: 'test' });
  });

  it('should setValue clear empty array props from obj', () => {
    const filterController = new FilterController();
    filterController.setValue({ name: 'test', surname: [] });
    expect(filterController.getValue()).toEqual({ name: 'test' });
  });

  it('should setValue clear empty array props from obj', () => {
    const filterController = new FilterController();
    filterController.setValue({ name: 'test', surname: [] });
    expect(filterController.getValue()).toEqual({ name: 'test' });
  });

  it('should patch value', () => {
    const filterController = new FilterController();
    filterController.setFilter('name', 'test');
    filterController.setFilter('surname', 'test2');
    filterController.patchValue({ surname: 'test3' });
    expect(filterController.getValue()).toEqual({ name: 'test', surname: 'test3' });
  });

  it('should clear value', () => {
    const filterController = new FilterController();
    filterController.setFilter('name', 'test');
    filterController.clear();
    expect(filterController.getValue()).toEqual({});
  });

  it('should clear property', () => {
    const filterController = new FilterController();
    filterController.setFilter('name', 'test');
    filterController.setFilter('surname', 'test2');
    filterController.clearProperty('name');
    expect(filterController.getValue()).toEqual({ surname: 'test2' });
  });

  it('should`t clear default property', () => {
    const filterController = new FilterController();
    filterController.setDefaultValue({ name: 'test' });
    filterController.setFilter('name', 'test');
    filterController.clearProperty('name');
    expect(filterController.getValue()).toEqual({ name: 'test' });
  });
});

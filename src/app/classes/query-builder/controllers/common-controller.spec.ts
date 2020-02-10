import { CommonController } from './common-controller';
class BaseCommonController extends CommonController {
}

describe('CommonController', () => {
  let commonController: CommonController;
  beforeEach(() => {
    commonController = new BaseCommonController();
  });

  it('should have empty object as default', () => {
    expect(commonController.getValue()).toEqual({});
  });

  it('should patch value', () => {
    commonController.setValue({ name: 'test', surname: null });
    commonController.patchValue({ surname: 'test3' });
    expect(commonController.getValue()).toEqual({ name: 'test', surname: 'test3' });
  });

  it('should clear value', () => {
    commonController.setValue({ name: 'test', surname: null });
    commonController.clear();
    expect(commonController.getValue()).toEqual({});
  });

  it('should return default value', () => {
    expect(commonController.getDefaultValue()).toEqual({});
  });
});

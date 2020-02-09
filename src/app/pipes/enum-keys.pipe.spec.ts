import { EnumKeysPipe } from './enum-keys.pipe';

describe('EnumKeysPipe', () => {
  it('create an instance', () => {
    const pipe = new EnumKeysPipe();
    expect(pipe).toBeTruthy();
  });

  it('should convert enum to key value array pairs', () => {
    const pipe = new EnumKeysPipe();
    enum Test { Test = 'test' }
    expect(pipe.transform(Test)).toEqual([{ key: 'Test', value: 'test' }]);
  });
});

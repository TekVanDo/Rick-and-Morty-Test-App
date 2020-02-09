import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'enumKeysPipe' })
export class EnumKeysPipe implements PipeTransform {
  transform(value): any {
    const keys = [];
    Object.keys(value).forEach((enumMember) => {
      keys.push({ key: enumMember, value: value[enumMember] });
    });
    return keys;
  }
}

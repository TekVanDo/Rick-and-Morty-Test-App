import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'enumKeysPipe' })
export class EnumKeysPipe implements PipeTransform {
  transform(value): any {
    const keys = [];
    for (const enumMember in value) {
      if (!isNaN(parseInt(enumMember, 10))) {
        keys.push({ key: +enumMember, value: value[enumMember] });
      } else {
        keys.push({ key: enumMember, value: value[enumMember] });
      }
    }
    return keys;
  }
}

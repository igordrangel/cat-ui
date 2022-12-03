import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'orderBy', pure: false})
export class DatatableSortPipe implements PipeTransform {
  transform(array: Array<Object>, args: string, reverse: boolean): Array<Object> {
    array.sort((a: any, b: any) => {
      const aDeep = this.goDeep(a, args);
      const bDeep = this.goDeep(b, args);
      if (
        (aDeep < bDeep && !reverse) || (aDeep > bDeep && reverse)
      ) {
        return -1;
      } else if (
        (aDeep > bDeep && !reverse) || (aDeep < bDeep && reverse)
      ) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

  private goDeep(obj: any, desc: string) {
    if (desc) {
      const arr = desc.split('.');
      while (arr.length && (obj = obj[arr.shift() ?? 0])) {
      }
    }
    return obj;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectKeys'
})
export class ObjectKeysPipe implements PipeTransform {

  transform(arrayOfObjects: Array<any>) {
    return Object.keys(arrayOfObjects);
  }

}

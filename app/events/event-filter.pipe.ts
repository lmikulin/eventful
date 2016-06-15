import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({
  name: 'eventFilter'
})
export class EventFilterPipe implements PipeTransform {
  transform(value: any[], args: string[]): any[] {
    let filter: string = args[0] ? args[0].toLocaleLowerCase() : null;
    return filter ? value.filter((event: any) =>
      event.title.toLocaleLowerCase().indexOf(filter) != -1) : value;
  }
}

import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[statusHighlight]',
})
export class HighlightDirective {
  @Input() statusHighlight = '';

  constructor(private el: ElementRef) {
    this.el = el;
  }

  ngOnInit() {
    let color = this.findStatus(this.statusHighlight);
    this.changeColor(color);
  }

  changeColor(bgColor: string) {
    this.el.nativeElement.style['background-color'] = bgColor;
  }

  findStatus(plant: any) {
    const diffTime =
      new Date().getTime() - new Date(plant.lastWateredDate).getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let status = 'R';
    let maxallowedDiff = 100;

    switch (plant.wateringFrequency.id) {
      case 1:
        maxallowedDiff = 2;
        break;
      case 2:
        maxallowedDiff = 7;
        break;
      case 3:
        maxallowedDiff = 14;
        break;
      case 4:
        maxallowedDiff = 30;
        break;
    }

    switch (true) {
      case diffDays < maxallowedDiff:
        status = 'green';
        break;
      case diffDays <= maxallowedDiff + 1:
        status = '#90ee90';
        break;
      case diffDays <= maxallowedDiff + 3:
        status = 'yellow';
        break;
      default:
        status = 'red';
        break;
    }
    return status;
  }
}

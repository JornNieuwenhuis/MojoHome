import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {

    @Output() activeBlock: EventEmitter<String[]> = new EventEmitter();

    @HostListener('document:click', ['$event']) onClick($event) {
        let element = $event.target.closest('div.module');
        if(element != null){
            element.classList.forEach(className => {
                if (className.includes('block')) {
                    this.activeBlock.emit(className);
                }
            });
        }
    }

    constructor() {

    }

}

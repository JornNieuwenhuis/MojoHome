import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';

@Component({
    selector: 'chores',
    templateUrl: './chores.component.html',
    styleUrls: ['./chores.component.less']
})
export class ChoresComponent implements OnInit {

    @Input() activeBlock: string;
    @Input() blockName: string;

    public inFocusElementId: any;

    constructor(

    ) { 
    }

    ngOnInit() {

    }

}
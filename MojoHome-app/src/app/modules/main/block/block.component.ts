import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'block-view',
    templateUrl: './block.component.html',
    styleUrls: ['./block.component.less']
})
export class BlockComponent implements OnInit {

    @Input() moduleName: string;
    @Input() blockName: string;

    public activeBlock: string;

    constructor() { }

    
    public setActiveBlock(event){
        this.activeBlock = event;
    }

    ngOnInit() {
             
    }

}

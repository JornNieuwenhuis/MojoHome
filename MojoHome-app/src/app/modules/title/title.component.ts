import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.less']
})
export class TitleComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        setTimeout(() => {
            document.getElementById('title-header').classList.add('startup');

            setTimeout(() => {
                document.getElementById('title-header').classList.remove('startup');
            }, 1500);
        }, 50);


    }

}

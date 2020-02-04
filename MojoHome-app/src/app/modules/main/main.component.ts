import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.less'],
    providers: [UserService]
})
export class MainComponent implements OnInit {

    public blocksList = [
        { name: "block-1", module: "chores"}, { name: "block-2", module: "calcubread"},
        { name: "block-3", module: ""},       { name: "block-4", module: ""},
        { name: "block-5", module: ""},       { name: "block-6", module: ""}
    ]

    constructor() { }

    public value: string;

    ngOnInit() {
        setTimeout(() => {
            Array.from(document.getElementsByClassName('module')).forEach(module => {
                module.classList.remove('startup');
            });
        }, 1000);
    }

}

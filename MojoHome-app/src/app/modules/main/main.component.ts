import { Component, OnInit, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/service/user.service';


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.less'],
    providers: [UserService]
})
export class MainComponent implements OnInit {

    //Keeps track of opened sidebars in blocks
    public openSidebars = [];

    public blocksList = [
        { name: "block-1", module: "todo"},       { name: "block-2", module: "chores"},
        { name: "block-3", module: "calcubread"}, { name: "block-4", module: ""},
        { name: "block-5", module: ""},           { name: "block-6", module: ""}
    ]

    constructor(private renderer: Renderer2) { }

    public value: string;

    ngOnInit() {
        setTimeout(() => {
            Array.from(document.getElementsByClassName('module')).forEach(module => {
                module.classList.remove('startup');
            });
        }, 250);
    }
}

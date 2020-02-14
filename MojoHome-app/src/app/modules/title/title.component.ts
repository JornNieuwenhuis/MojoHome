import { Component, OnInit, HostListener, Inject } from '@angular/core';

@Component({
    selector: 'app-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.less']
})
export class TitleComponent implements OnInit {

    private titleHeaderElement;

    @HostListener("window:scroll", [])
    onWindowScroll() {
        if(window.pageYOffset > 0) {
            this.addStartupClass();
        } else {
            this.removeStartupClass();
        }
    }

    constructor() { }

    ngOnInit() {
        this.titleHeaderElement = document.getElementById('title-header');
        this.startupAnimation();
    }

    public startupAnimation() {
        setTimeout(() => {
            
            this.addStartupClass();

            setTimeout(() => {
                this.removeStartupClass();
            }, 1500);

        }, 50);
    }

    private addStartupClass() {
        this.titleHeaderElement.classList.add('startup');
    }

    private removeStartupClass() {
        this.titleHeaderElement.classList.remove('startup');
    }

}

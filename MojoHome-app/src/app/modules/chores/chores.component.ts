import { Component, OnInit, ChangeDetectorRef, Input, Renderer2 } from '@angular/core';
import { ChoresService } from 'src/app/service/chores.service';

@Component({
    selector: 'chores',
    templateUrl: './chores.component.html',
    styleUrls: ['./chores.component.less']
})
export class ChoresComponent implements OnInit {

    @Input() activeBlock: string;
    @Input() blockName: string;

    public inFocusElementId: any;
    public popupName = "chores-popup";
    public editChore: Boolean = false;
    public editChoreIndex: number;

    constructor(
        public choresService: ChoresService,
        private renderer: Renderer2
    ) { 
    }

    ngOnInit() {
        this.choresService.getChoresList();
    }

    public getRecurrenceString(interval: string, amount: number) {
        let translatedInterval;
        switch (interval) {
            case 'day':
                if(amount <= 1) return "Iedere dag";
                translatedInterval = "dagen";
                break;
            case 'week': 
                if(amount <= 1) return "Iedere week";
                translatedInterval = "weken";
                break;
            case 'month':
                if(amount <= 1) return "Iedere maand";
                translatedInterval = "maanden";
                break;
            case 'year':
                if(amount <= 1) return "Ieder jaar";
                translatedInterval = "jaar";
                break;
            default:
                translatedInterval = interval;
                break;
        }
        return "Iedere " + amount + " " + translatedInterval;
    }

	public showPopup(target, index?){
        this.choresService.setGenerateNewDeadline(false);
        this.editChore = false;

        if(!index){
            this.choresService.resetNewChoreValues();
        }

        if(index >= 0){
            this.choresService.setGenerateNewDeadline(true);
            this.editChore = true;
            this.editChoreIndex = index;
            this.choresService.newChore = this.choresService.choresList[index];
        }
        let containerDiv = document.getElementById(this.popupName);
		this.renderer.removeClass(containerDiv, "hide");
    }

    public closePopup(target){
        let containerDiv = document.getElementById(this.popupName);
		this.renderer.addClass(containerDiv, "hide");
    }

    public getDaysRemainingString(days){
        let appendString = days == 1 ? " dag" : " dagen";
        return "Nog " + days + appendString + " te gaan";
    }

}
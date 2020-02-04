import { Component, OnInit, Input, Renderer2, OnChanges } from '@angular/core';
import { BreadService } from 'src/app/service/bread.service';

@Component({
    selector: 'calcubread',
    templateUrl: './calcubread.component.html',
    styleUrls: ['./calcubread.component.less']
})
export class CalcubreadComponent implements OnInit, OnChanges {

    @Input() activeBlock: string;
    @Input() blockName: string;

    public ingredients = {'name': '', 'amount': 0};
    public tempBroodjesName: string;
    public broodjes = [];
    public multiplier: number = 0;
    public totalBroodjesWeight: number = 0;
    public focusInputEl;

    constructor(
        private renderer: Renderer2,
        private breadService: BreadService
    ) { }

    ngOnInit() {
        this.focusInputEl = document.getElementById('bread-amount-input');
        this.breadService.getRecipes();
    }

    ngOnChanges(){
        if(this.activeBlock != this.blockName){
            let inputEl = document.getElementById('bread-amount-input');
            this.resetAnimateBroodjes(inputEl);
        }
    }

    public updateMultiplier() {
        let tempMultiplier: number = 0;
        
        for (let i = 0; i < this.broodjes.length; i++) {
            if (this.broodjes[i]['weight'] > 0) {
                tempMultiplier += Number(this.broodjes[i]['weight']);
            }
        }

        this.totalBroodjesWeight = tempMultiplier;
        this.multiplier          = (tempMultiplier / 1000);
        this.setIngredients();     
    }

    private setIngredients() {
        this.ingredients = JSON.parse(JSON.stringify(this.breadService.breadRecipes[this.breadService.activeRecipeIndex]['ingredients']));
        let tempArray    = this.ingredients;

        for (let j = 0; j < tempArray.length; j++) {
            let amount = tempArray[j]['amount'] * this.multiplier;
            this.ingredients[j]['amount'] = amount % 1 ? amount.toFixed(1) : amount;            
        }  
    }

    public updateBroodjesAmount(amount) {
        this.ingredients = {'name': '', 'amount': 0};
        this.broodjes.length = 0;
        for (let i = 0; i < amount; i++) {
            this.broodjes[i] = { 'name': 'Broodje ' + (i + 1), 'weight': 0 };
        }
    }

    public updateBroodjeWeight(weight: number, broodje) {
        for (let i = 0; i < this.broodjes.length; i++) {
            if (this.broodjes[i]['name'] == broodje) {
                this.broodjes[i]['weight'] = weight;
            }
        }
        this.updateMultiplier();
    }

    public shrinkInput(event) {
        if(event.key == "Enter"){
            if(event.target.value == ''){
                return this.resetAnimateBroodjes(event.target);
            }
            return this.animateBroodjes(event.target);
        }
        this.renderer.setAttribute(event.target, 'placeholder', '');
        this.renderer.setStyle(event.target, 'width', '16%');
        this.renderer.setStyle(event.target, 'font-size', '90px');
        this.renderer.setStyle(event.target, 'padding', '4px 2px 2px 28px');
    }

    public animateBroodjes(inputEl){
        //Set amountBroodjesDiv padding
        let amountBroodjesDiv = inputEl.parentElement.parentElement;
        this.renderer.setStyle(amountBroodjesDiv, 'padding-top', '0');

        //Set input element styles
        this.renderer.setStyle(inputEl, 'padding', '4px 2px 2px 40px');
        this.renderer.setStyle(inputEl, 'font-size', '50px');
        this.renderer.setStyle(inputEl, 'height', '50px');
    }

    public resetAnimateBroodjes(inputEl){
        this.broodjes.length = 0;
        inputEl.value = '';

        let amountBroodjesDiv = inputEl.parentElement.parentElement;
        this.renderer.setStyle(amountBroodjesDiv, 'padding-top', '105px');

        //Set input element styles
        this.renderer.setStyle(inputEl, 'padding', '20px 20px 20px 40px');
        this.renderer.setStyle(inputEl, 'height', '150px');

        this.renderer.setStyle(inputEl, 'width', '660px');
        this.renderer.setStyle(inputEl, 'font-size', '48px');

        this.renderer.setAttribute(inputEl, 'placeholder', 'Hoeveel broodjes wil je? =)');
    }

    public checkIfActive(target){
        if(target.id == this.focusInputEl){
            return 'active';
        }
        return 'passive';
    }
}

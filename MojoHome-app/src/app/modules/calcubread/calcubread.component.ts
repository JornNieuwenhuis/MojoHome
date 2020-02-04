import { Component, OnInit, Input, Renderer2, OnChanges } from '@angular/core';

@Component({
    selector: 'calcubread',
    templateUrl: './calcubread.component.html',
    styleUrls: ['./calcubread.component.less']
})
export class CalcubreadComponent implements OnInit, OnChanges {

    @Input() activeBlock: string;
    @Input() blockName: string;

    public baseRecipe = [
        { 'name': 'water', 'amount': 270 },
        { 'name': 'desem', 'amount': 240 },
        { 'name': 'bloem', 'amount': 455 },
        { 'name': 'roggemeel', 'amount': 25 },
        { 'name': 'zout', 'amount': 11 }
    ];

    public ingredients = [
        { 'name': 'water', 'amount': 0 },
        { 'name': 'desem', 'amount': 0 },
        { 'name': 'bloem', 'amount': 0 },
        { 'name': 'roggemeel', 'amount': 0 },
        { 'name': 'zout', 'amount': 0 }
    ];

    public tempBroodjesName: string;

    public broodjes = [];

    public multiplier: number = 0;

    public totalBroodjesWeight: number = 0;

    public focusInputEl;

    constructor(
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        this.focusInputEl = document.getElementById('bread-amount-input');
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
        this.multiplier = (tempMultiplier / 1000);

        for (let j = 0; j < this.baseRecipe.length; j++) {
            this.ingredients[j]['amount'] = Math.round(Number(this.baseRecipe[j]['amount']) * this.multiplier);
        }
    }

    public updateBroodjesAmount(amount) {
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

import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';
import { MainComponent } from '../main.component';
import { ChoresComponent } from '../../chores/chores.component';

@Component({
    selector: 'block-view',
    templateUrl: './block.component.html',
    styleUrls: ['./block.component.less']
})
export class BlockComponent implements OnInit {

    @Input() moduleName: string;
    @Input() blockName: string;

    public activeBlock: string;

    constructor(private renderer: Renderer2, private elRef: ElementRef, private mainComponent: MainComponent) { }

    
    public setActiveBlock(event){
        this.activeBlock = event;
    }

    ngOnInit() {
             
    }

    public showSidebar(el) {
        let sidebarEl = el.parentNode;
        if(this.mainComponent.openSidebars.length > 0){
            this.mainComponent.openSidebars.forEach(sidebar => {
                this.hideSidebar(sidebar);
            });
        }

        this.mainComponent.openSidebars.push(sidebarEl);

        if(sidebarEl != null) {
            this.renderer.addClass(sidebarEl, 'slide-open');   
            this.renderer.setStyle(sidebarEl.previousElementSibling, 'grid-column', '1 / span 11');
            setTimeout(() => {
                let sidebarMenuEl = document.querySelector("div.sidebar.slide-open > div.sidebar-menu");
                if(sidebarMenuEl != null){
                    this.renderer.setStyle(sidebarMenuEl, 'right', '0px');
                }
            }, 100);
        }    
    }

    public hideSidebar(el) {
        let sideBarEl = el.classList.contains('sidebar') ? el : el.parentNode;    
        this.mainComponent.openSidebars.splice(this.mainComponent.openSidebars.indexOf(sideBarEl), 1);

        this.renderer.setStyle(sideBarEl.previousElementSibling, 'grid-column', '1 / span 13');
        this.renderer.removeClass(sideBarEl, 'slide-open');
        this.renderer.setStyle(sideBarEl.querySelector("div.sidebar-menu"), 'right', '-26px'); 
    }

    public activateBlock(el){
        let moduleBlock = el.closest('div.module');
        if(moduleBlock){
            if(!moduleBlock.classList.contains('active')){
                this.hideSidebar(el.closest('div.sidebar'));
                this.renderer.addClass(moduleBlock, 'active');
                this.renderer.addClass(el, 'hide');
                this.renderer.removeClass(el.nextElementSibling, 'hide');
            }
        }
    }

    public deactivateBlock(el){
        let moduleBlock = el.closest('div.module');
        if(moduleBlock){
            this.renderer.removeClass(moduleBlock, 'active');
            this.renderer.addClass(el, 'hide');
            this.renderer.removeClass(el.previousElementSibling, 'hide');
        }
    }

    public showPopup(moduleName) {
        if(moduleName == 'calcubread'){
            return document.getElementById(moduleName + '-options').click();
        }
        if(moduleName == 'refresh'){
            return document.getElementById('refresh-todo').click();
        }
        return document.getElementById('add-' + moduleName + '-item').click();
    }
}

import { Component, OnInit, Renderer2, Input } from '@angular/core';

@Component({
	selector: 'popup',
	templateUrl: './popup.component.html',
	styleUrls: ['./popup.component.less']
})
export class PopupComponent implements OnInit {

	@Input() popupName;

	constructor(private renderer: Renderer2) { }

	ngOnInit(): void {
	}

	public closePopup(target){
		let containerDiv = target.closest("div.popup-container");
		this.renderer.addClass(containerDiv, "hide");
	}

}

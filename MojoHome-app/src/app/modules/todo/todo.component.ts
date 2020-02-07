import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';

@Component({
	selector: 'todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.less']
})
export class TodoComponent implements OnInit {

	@Input() activeBlock: string;
	@Input() blockName: string;

	public popupName = "todo-popup";

	constructor(
		public todoService: TodoService,
		private renderer: Renderer2
	) { }

	ngOnInit(): void {
		this.todoService.getTodoList();
	}

	public showPopup(target){
        let containerDiv = document.getElementById(this.popupName);
		this.renderer.removeClass(containerDiv, "hide");
    }

}

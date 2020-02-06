import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';

@Component({
	selector: 'todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.less']
})
export class TodoComponent implements OnInit {

	@Input() activeBlock: string;
	@Input() blockName: string;

	constructor(public todoService: TodoService) { }

	ngOnInit(): void {
		this.todoService.getTodoList();
	}

}

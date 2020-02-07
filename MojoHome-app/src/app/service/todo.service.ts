import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  	providedIn: 'root'
})
export class TodoService {

    public  todoList: any   = [];
    private baseUrl: string = '//localhost:8080/api/todo/';

	    constructor(private http: HttpClient) { }

        /* 
        * Gets the todo-list
        */
        public getTodoList() {
            let promise = new Promise((resolve, reject) => {
                this.http.get(this.baseUrl + 'getTodoList')
                    .toPromise()
                    .then(
                        result => { // Success
                            this.todoList = result;
                            resolve(result);
                        },
                        reject => { // Fail
                            console.log(reject);
                        }
                    );
            });
            return promise;
        }

        /* 
        * Gets the todo-list
        */
        public addTodoItem(event: any) {
            let newTodo = event.target.value;
            event.target.value = '';
            if(newTodo != ""){
                let promise = new Promise((resolve, reject) => {
                    this.http.post(this.baseUrl + 'addTodoItem', {'name': newTodo})
                        .toPromise()
                        .then(
                            result => { // Success
                                this.todoList.push(result);
                                resolve(result);
                            },
                            reject => { // Fail
                                console.log(reject);
                            }
                        );
                });
                return promise;
            }
            return;
        }

        /* 
        * Updates todo item data
        */
        public updateTodoItem(id: number, name: string, complete: boolean, listIndex: number) {
            if(name == ''){
                return this.removeTodoItem(id, listIndex);
            }
            let promise = new Promise((resolve, reject) => {
                this.http.post(this.baseUrl + 'updateTodoItem', {'id': id, 'name': name, 'complete': complete})
                    .toPromise()
                    .then(
                        result => { // Success
                            this.todoList[listIndex]['name']     = name;
                            this.todoList[listIndex]['complete'] = complete;
                            resolve(result);
                        },
                        reject => { // Fail
                            console.log(reject);
                        }
                    );
            });
            return promise;
        }

        /* 
        * Removes item from todo list
        */
        public removeTodoItem(id: number, listIndex: number) {
            let promise = new Promise((resolve, reject) => {
                this.http.post(this.baseUrl + 'removeTodoItem', {'id': id})
                    .toPromise()
                    .then(
                        result => { // Success
                            this.todoList.splice(listIndex, 1);
                            resolve(result);
                        },
                        reject => { // Fail
                            console.log(reject);
                        }
                    );
            });
            return promise;
        }
}

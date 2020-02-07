import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ChoresService {

    public  choresList: any = [];
    private baseUrl: string = '//localhost:8080/api/chores/';
    public newChore = [];

    constructor(private http: HttpClient) { }

    /* 
    * Gets the todo-list
    */
    public getChoresList() {
        let promise = new Promise((resolve, reject) => {
            this.http.get(this.baseUrl + 'getChoresList')
                .toPromise()
                .then(
                    result => { // Success
                        this.choresList = result;
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
    public addChoresItem() {
        if(!this.newChore['name'] || !this.newChore['recurrenceAmount'] || !this.newChore['recurrenceInterval']) return;

        let promise = new Promise((resolve, reject) => {
            this.http.post(this.baseUrl + 'addChoresItem', { 
                                                            'name': this.newChore['name'],
                                                            'recurrenceAmount': this.newChore['recurrenceAmount'],
                                                            'recurrenceInterval': this.newChore['recurrenceInterval']
                                                        }
                        )
                .toPromise()
                .then(
                    result => { // Success
                        this.choresList.push(result);
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
    * Updates todo item data
    */
    public updateChoresItem(newValue: any, fieldname: string, listIndex: number) {
        let updatedChore = this.choresList[listIndex];
        updatedChore[fieldname] = newValue;       

        let promise = new Promise((resolve, reject) => {
            this.http.post(this.baseUrl + 'updateChoresItem', 
                                                        { 
                                                            'id':             updatedChore["id"], 
                                                            'name':           updatedChore["name"], 
                                                            'recurrenceInterval':       updatedChore["recurrenceInterval"],
                                                            'recurrenceAmount': updatedChore["recurrenceAmount"],
                                                            'choreCreationDate':    updatedChore["choreCreationDate"],
                                                            'lastCompletionDate':  updatedChore["lastCompletionDate"]
                                                        })
                .toPromise()
                .then(
                    result => { // Success
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
    public removeChoresItem(id: number, listIndex: number) {
        let promise = new Promise((resolve, reject) => {
            this.http.post(this.baseUrl + 'removeChoresItem', { 'id': id })
                .toPromise()
                .then(
                    result => { // Success
                        this.choresList.splice(listIndex, 1);
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

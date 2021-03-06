import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BreadService {

	public breadRecipes: 	  any = [];
	public activeRecipeIndex: number = 0; // 0: PdeC, 1 Papa Secos

	constructor(private http: HttpClient) { }

    /* 
    * Gets basic bread recipes
    */
	public getRecipes() {
		let promise = new Promise((resolve, reject) => {
            this.http.get('//localhost:8080/api/bread/getRecipes')
                .toPromise()
                .then(
					result => { // Success
						this.breadRecipes = result;
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

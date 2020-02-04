import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BreadService {

	constructor(private http: HttpClient) { }

	public getRecipes() {
		return this.http.get('//localhost:8080/api/bread/getRecipes').subscribe(
            res => console.log(res)
        );
	}
}

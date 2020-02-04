import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  	providedIn: 'root'
})
export class UserService {

	constructor(private http: HttpClient) { }

	public findAll() {
		console.log('in service');
		
		return this.http.get('//localhost:8080/api/findAll').subscribe(res => 
			console.log(res)
		);
	}


}

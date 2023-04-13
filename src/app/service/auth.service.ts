import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:3000/user'
  constructor(private http:HttpClient) { }

  getAllUsers() {
    return this.http.get(this.apiUrl)
  }

  getByCode(code:any) {
    return this.http.get(this.apiUrl+'/'+code)
  }

  saveUser(inputData: any) {
  return this.http.post(this.apiUrl, inputData)
  }

  updateUser(code: any, inputData: any) {
    return this.http.put(this.apiUrl+'/'+code, inputData)
  }
  
}

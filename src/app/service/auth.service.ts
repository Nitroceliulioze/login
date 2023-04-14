import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:3000/user';
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(this.apiUrl);
  }

  getAllRole() {
    return this.http.get('http://localhost:3000/role');
  }

  getByCode(id: any) {
    return this.http.get(this.apiUrl + '/' + id);
  }

  saveUser(inputData: any) {
    return this.http.post(this.apiUrl, inputData);
  }

  updateUser(id: any, inputData: any) {
    return this.http.put(this.apiUrl + '/' + id, inputData);
  }

  isLoggedIn() {
    return sessionStorage.getItem('userName') != null;
  }

  getUserRole() {
    return sessionStorage.getItem('userRole') != null
      ? sessionStorage.getItem('userRole')?.toString()
      : '';
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loginUrl = 'api/service/user/login';

  private logoutUrl = 'api/service/logout';

  private searchUserUrl = 'api/service/searchUser';

  private userUrl = 'api/service/user';

  constructor(private http: HttpClient) { }

  isValid() : boolean {
    if (localStorage.getItem("user_token") != null
      && localStorage.getItem("user_token") != "null" 
      && localStorage.getItem("user_token") != ""){
      return true;
    }else{
      return false;
    }
   }

  /** POST  loginUser from the server */
  loginUser (userInfo: User): Observable<any> {
    // let Base64 = require("js-base64").Base64;
    let loginId = userInfo.name.trim();
    let password = userInfo.password.trim();
    let auth_info_str = loginId + ":" + password;
    let auth_info_base64 = new Buffer(auth_info_str).toString('base64');
    const params = {
      auth_info: auth_info_base64
    };
    return this.http.post<any>(this.loginUrl, params);
  }

  /** POST  logout from the server */
  logout(): Observable<any> {
    return this.http.post<any>(this.logoutUrl, null);
  }

  /** POST  searchUser from the server */
  searchUser (userInfo): Observable<any> {
    return this.http.post<any>(this.searchUserUrl, userInfo);
  }

  /** POST  createUser from the server */
  createUser (userInfo: User): Observable<any> {
    console.log('***********************',userInfo)
    console.log(userInfo.name)
    let name = userInfo.name.trim();
    let password = userInfo.password.trim();
    let password2nd = userInfo.confirmPassword.trim();
    let displayName = userInfo.displayName.trim();
    let telephone = userInfo.telephone.trim();
    let address = userInfo.address.trim();
    let postNo = userInfo.postNo.trim();
    let email = userInfo.email.trim();
    let company = userInfo.company.trim();
    let industry = userInfo.industry.trim();
    const params = {
      name : name,
      password: password,
      password2nd : password2nd,
      displayName : displayName,
      telephone : telephone,
      address : address,
      postNo : postNo,
      email : email,
      company : company,
      industry : industry
    };
    return this.http.post<any>(this.userUrl, params);
  }

    /** POST  createUser from the server */
    createUserList (params: any): Observable<any> {
      return this.http.post<any>(this.userUrl, params);
    }

  /** GET User from the server */
  getUser (id: String): Observable<any> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<any>(url);
  }

  /** PUT User from the server */
  updateUser(params: any): Observable<any> {
    const url = `${this.userUrl}`;
    return this.http.put<any>(url, params);
  }

  /** DELETE User from the server */
  deleteUser(id: String): Observable<any>  {
    const url = `${this.userUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}

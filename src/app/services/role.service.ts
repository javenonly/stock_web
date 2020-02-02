import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private roleUrl = 'api/service/role';
  
  private allRoleUrl = 'api/service/allRoles';

  constructor(private http: HttpClient) { }

  /** POST  createRole from the server */
  createRole (roleInfo): Observable<any> {
    return this.http.post<any>(this.roleUrl, roleInfo);
  }

  /** GET Role from the server */
  getRole (id: String): Observable<any> {
    const url = `${this.roleUrl}/${id}`;
    return this.http.get<any>(url);
  }

  /** GET all Role from the server */
  queryAllRoles (): Observable<any> {
    const url = `${this.allRoleUrl}`;
    return this.http.get<any>(url);
  }

  /** PUT Role from the server */
  updateRole(params: any) {
    const url = `${this.roleUrl}`;
    return this.http.put<any>(url, params);
  }

  /** DELETE Role from the server */
  deleteRole(id: String): Observable<any>  {
    const url = `${this.roleUrl}/${id}`;
    return this.http.delete<any>(url);
  }

}

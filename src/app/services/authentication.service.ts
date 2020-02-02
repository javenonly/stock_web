import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../models/user'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    constructor(private userService: UserService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
     }

    login(userInfo: User) {
        return this.userService.loginUser(userInfo).pipe(
            map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('user_token',user.token);
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('user_token');
        this.currentUserSubject.next(null);
        return this.userService.logout();
    }

    getCurrentUser(): Observable<User> {
        return this.currentUser;
    }
    
    isValid(): boolean {
        return !!this.currentUserSubject.value;
    }
}
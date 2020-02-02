import { Component, OnInit } from '@angular/core';
import  {AuthenticationService } from '../../services/authentication.service'; 
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router';
import { User } from '../../models/user'
import { AlertService } from '../../services/alert.service';
import { getDeepFromObject } from '../../shared/helpers';
import { defaultAuthOptions } from '../auth.options';
import  {UserService } from '../../services/user.service'; 

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  message: string;
  rememberMe: boolean;
  errors: string[] = [];
  messages: string[] = [];
  user: User;
  submitted: boolean;

  constructor(private userService: AuthenticationService, 
    private router: Router,
    private alertService: AlertService) { }
  login() {

  }
  getConfigValue(key: string) {
    return getDeepFromObject(defaultAuthOptions, key, null);
  }

  ngOnInit() {
    let userName = localStorage.getItem('user_name');
    this.user = new User();
    if (userName && userName !== 'undefined') {
      this.user.name = userName;
      this.rememberMe = true;
    }
  }

  //用户登录
  userLogin(): void {
    this.alertService.clear();
    this.errors.splice(0, this.errors.length);
    this.messages.splice(0, this.errors.length);
    this.userService.login(this.user)
      .subscribe(user => {
      
      if (this.rememberMe) {
        localStorage.setItem('user_name', user.name);
      } else {
        localStorage.removeItem('user_name');
      }
      // this.messages.push("登录成功！")
      this.alertService.success("登录成功！", true);
      return this.router.navigateByUrl("pages");
    },
    err => {
      if (err instanceof HttpErrorResponse) {
        this.errors.push("用户名不存在或者密码错误！")
      } 
    });
    }

}

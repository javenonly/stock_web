import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from '../../../services/user.service'; 
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../models/user';
import { NbThemeService } from '@nebular/theme';
import { getDeepFromObject } from '../../../shared/helpers';
import { defaultUserOptions } from '../user.options';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  message: string;
  errors: string[] = [];
  messages: string[] = [];
  submitted: boolean;
  id : string;


  constructor(private userService: UserService, 
    private router: Router,
    private routeInfo:ActivatedRoute, 
    private themeService: NbThemeService ) { }

  ngOnInit() {

    this.routeInfo.queryParams.subscribe(params => {
      this.id = params['id'];
      if (this.id == null){
        //this.router.navigateByUrl('/pages');
      }
      this.userService.getUser(this.id)
      .subscribe(data => {
      console.log(data);
      // this.messages.push("添加成功！")
      // return this.router.navigateByUrl("pages");
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          this.errors.push("用户不存在！")
        } 
      });
    });
  }

  //用户信息
  userInfo = {
    "id":"",
    "name":"",
    "displayName":"",
    "password":"",
    "password2":"",
    "telephone":"",
    "email":"",
    "postNo":"",
    "address":"",
    "company":"",
    "industry":""
  };

  //更新用户
  updateUser(): void {
    this.errors.splice(0, this.errors.length);
    this.messages.splice(0, this.errors.length);
    this.userService.updateUser(this.userInfo)
      .subscribe(data => {
      console.log(data);
      this.messages.push("更新成功！")
      // return this.router.navigateByUrl("pages");
    },
    err => {
      if (err instanceof HttpErrorResponse) {
        this.errors.push("用户不存在！")
      } 
    });
  }

  getConfigValue(key: string) {
    return getDeepFromObject(defaultUserOptions, key, null);
  }

}

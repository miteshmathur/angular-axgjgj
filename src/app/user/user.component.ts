import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  users:any=[]
  constructor(private userService:UserService){

  }
  ngOnInit(){
    this.loadUser()
  }
  loadUser(){
    this.userService.getUser().subscribe({
      next:(res:any)=>{
        this.users=res
       
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api/api.service'

import { Router } from '@angular/router';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm = new FormGroup({
    useri : new FormControl('',Validators.required),
    email : new FormControl('',Validators.required)
  })

  constructor( private api:ApiService,private router:Router,){  }

  ngOnInit(): void {
    this.checkLocalStorage();

  }
  errorStatus:boolean = false;
  errorMsj:any = "";

  onLogin(form:any){
    this.api.loginByEmail(form).subscribe(data =>{

      if(Object.keys(data).length != 0){

        this.router.navigate(['product']);
        localStorage.setItem("token","ok");

      }else{
        Swal.fire("Try again! User Invalid")
      }
    });

  }

  checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.router.navigate(['product'])
    }
  }

}

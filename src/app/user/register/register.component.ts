import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Credentials, Login, User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  form!: FormGroup;
  pass: string = "";
  passR: string = "";
  sesion!: any;
  login!:Login;

  error: boolean= false;
  mensajeError!: string;
  @Output() newItemEvent = new EventEmitter<string>();

  constructor(
    public userService: UserService,
    private router: Router,

  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name:  new FormControl('', [ Validators.required]),
      email: new FormControl('', [ Validators.required, Validators.email ]),
      password: new FormControl(this.pass, [ Validators.required]),
      passwordR: new FormControl(this.passR, [ Validators.required])
    });

  }
  get f(){
    return this.form.controls;
  }
  verify(): void{
  }

  submit() {
    if(!this.validatePassword()){



    }
  }

  validatePassword():Boolean{
    return this.pass !== this.passR;
  }


}

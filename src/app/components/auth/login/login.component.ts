import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public router: Router,
    public _authService: AuthService) {
    this.createLoginForm();
  }

  // owlcarousel = [
  //   {
  //     title: "Welcome to Multikart",
  //     desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
  //   },
  //   {
  //     title: "Welcome to Multikart",
  //     desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
  //   },
  //   {
  //     title: "Welcome to Multikart",
  //     desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
  //   }
  // ]
  // owlcarouselOptions = {
  //   loop: true,
  //   items: 1,
  //   dots: true
  // };

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit() {
    if (this._authService.estaLogueado())  this.router.navigate(['/dashboard/default']);
  }

  onSubmit() {
    console.log("submit");
   
    this._authService.login( this.loginForm.get('userName').value, this.loginForm.get('password').value, false ).subscribe(
             correcto => this.router.navigate(['/dashboard/default']),
            error => {
              console.error("Usuario o contraseña invalidos");
            } );

  }

}

import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { User } from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  registerForm!: FormGroup;
  form!: FormGroup;
  loading = false;
  submitted = false;
  content: any;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.email],
      password: ['', Validators.minLength(4)],
    });
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      user: ['', Validators.email],
      pass: ['', Validators.minLength(4)],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }
  get e() {
    return this.form.controls;
  }

  get username() {
    return this.form.get('username')!;
  }

  get password() {
    return this.form.get('password')!;
  }

  get user() {
    return this.registerForm.get('user')!;
  }

  get pass() {
    return this.registerForm.get('pass')!;
  }

  get firstName() {
    return this.registerForm.get('firstName')!;
  }

  get lastName() {
    return this.registerForm.get('lastName')!;
  }

  login() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.authService.authenticate(this.username.value, this.password.value).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        alert('Usuário ou senha inválida');
        console.log(error);
      }
    )
  }

  openBackDropCustomClass(content: any) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }
}

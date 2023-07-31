import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.email],
      password: ['', Validators.minLength(4)],
    });
  }

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


  login() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.authService.authenticate(this.username.value, this.password.value)
    .subscribe({
      next:() => {
        this.router.navigate(['/dashboard'])
      },
      error: error => {
        this.loading = false
      }
    })
  }

  openBackDropCustomClass(content: any) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  redirectTo() {
    this.router.navigate(['register'])
  }
}

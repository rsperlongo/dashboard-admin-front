import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit  {
  registerForm!: FormGroup;
  form!: FormGroup;
  loading = false;
  submitted = false;
  content: any

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
        username: ['', Validators.required, Validators.email],
        password: ['', Validators.required, Validators.minLength(4)]
    });
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      user: ['', Validators.required, Validators.email],
      pass: ['', Validators.required, Validators.minLength(4)]
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  get e() { return this.form.controls }

  get username() { return this.form.get('username')!; }

  get password() { return this.form.get('password')!; }

  get user() { return this.registerForm.get('user')!; }

  get pass() { return this.registerForm.get('pass')!; }

  get firstName() { return this.registerForm.get('firstName')!; }

  get lastName() { return this.registerForm.get('lastName')!; }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.form.invalid) {
          return;
    }
    this.loading = true;
  }

  openBackDropCustomClass(content: any) {
		this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
	}
}

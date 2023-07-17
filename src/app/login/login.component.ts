import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {
  title = 'dashboard-admin-frontend';
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
        username: ['', Validators.required, Validators.email],
        password: ['', Validators.required, Validators.minLength(4)]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  get username() { return this.form.get('username')!; }

  get password() { return this.form.get('password')!; }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.form.invalid) {
          return;
    }
    this.loading = true;
  }
}

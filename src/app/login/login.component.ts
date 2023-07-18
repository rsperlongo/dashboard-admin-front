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

  openBackDropCustomClass(content: any) {
		this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
	}
}

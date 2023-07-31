import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../services/user.service';
import { first } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit {
  users?: any;
  content: any
  form!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private modalService: NgbModal
    ) {}

  ngOnInit() {
    this.userService.getAll()
    .pipe(first())
    .subscribe(users => this.users = users)

    this.id = this.route.snapshot.params['id'];

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.minLength(4)]]
    });

    this.title = 'Add User';
    if (this.id) {
        this.title = 'Edit User';
        this.loading = true;
        this.userService.getById(this.id)
            .pipe(first())
            .subscribe(x => {
                this.form.patchValue(x);
                this.loading = false;
            });
    }

  }

  get f() { return this.form.controls; }

  get username() {
    return this.form.get('user')!;
  }

  get password() {
    return this.form.get('pass')!;
  }

  get firstName() {
    return this.form.get('firstName')!;
  }

  get lastName() {
    return this.form.get('lastName')!;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
        return;
    }

    this.submitting = true;
    this.saveUser()
        .pipe(first())
        .subscribe({
            next: () => {
                this.router.navigateByUrl('/users');
            },
            error: error => {
                this.submitting = false;
            }
        })
  }

  private saveUser() {
    return this.id
        ? this.userService.update(this.id!, this.form.value)
        : this.authService.register(this.form.value);
  }

  deleteUser(id: string) {
    const user = this.users!.find((x: any) => x.id === id);
    user.isDeleting = true;
    this.userService.delete(id)
        .pipe(first())
        .subscribe(() => this.users = this.users!.filter((x: any) => x.id !== id));
  }

  open(content: any) {
		this.modalService.open(content, { backdropClass: 'dark-modal' });
	}
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users?: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAll()
    .pipe(first())
    .subscribe(users => this.users = users)
  }
}

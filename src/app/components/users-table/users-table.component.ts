import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent {
  members: User[] = [];

  constructor(private usersService: UsersService) {}

  getMembers(): void{
    this.usersService.getMembers().subscribe(
      (response) => {
        this.members = response.data;
        console.log("case 1: " + this.members);
      },
      (error: any) => {
        console.error('Failed to fetch suggestion list:', error);
      }
    );
  }
}

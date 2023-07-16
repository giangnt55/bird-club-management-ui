// import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { User } from 'src/app/models/user.model';
// import { UsersService } from 'src/app/services/users.service';
// import { UserCardComponent } from '../user-card/user-card.component';

// @Component({
//   selector: 'app-users-table',
//   templateUrl: './users-table.component.html',
//   styleUrls: ['./users-table.component.css'],
// })
// export class UsersTableComponent implements OnInit{
//   members: User[] = [];
//   searchQuery: string = '';

//   constructor(private usersService: UsersService, private dialog: MatDialog) {}

//   ngOnInit(): void {
//     this.getMembers();
//   }

//   // getMembers(): void{
//   //   this.usersService.getMembers().subscribe(
//   //     (response) => {
//   //       this.members = response.data;
//   //     },
//   //     (error: any) => {
//   //       console.error('Failed to fetch suggestion list:', error);
//   //     }
//   //   );
//   // }

//   getMembers(): void {
//     if (this.searchQuery.trim() !== '') {
//       this.searchMembers();
//     } else {
//       this.usersService.getMembers().subscribe(
//         (response) => {
//           this.members = response.data;
//           console.log("Members:", this.members);
//         },
//         (error: any) => {
//           console.error('Failed to fetch suggestion list:', error);
//         }
//       );
//     }
//   }

//   openMemberDialog(member: User) {
//     const dialogRef = this.dialog.open(UserCardComponent, {
//       data: member
//     });

//     dialogRef.afterClosed().subscribe((result) => {
//       if (result) {
//         // Close the dialog
//         dialogRef.close();
//       }
//     });
//   }

//   searchMembers(): void {
//     if (this.searchQuery.trim() !== '') {
//       this.usersService.searchMembers(this.searchQuery).subscribe(
//         (response) => {
//           this.members = response.data;
//           console.log("Search Results:", this.members); // Log the search results
//         },
//         (error: any) => {
//           console.error('Failed to search members:', error);
//         }
//       );
//     } else {
//       this.getMembers(); // Call getMembers() to load all members when search query is empty
//     }
//   }

//   confirmDelete(member: User): void {
//     const confirmDelete = window.confirm('Are you sure you want to delete this member?');
//     if (confirmDelete) {
//       // Perform delete operation
//       console.log('Deleting member:', member);
//     }
//   }
// }

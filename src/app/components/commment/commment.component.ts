import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commment',
  templateUrl: './commment.component.html',
  styleUrls: ['./commment.component.css'],
})
export class CommmentComponent implements OnInit {
  loggedInAccount!: any | null;

  ngOnInit(): void {
    const storedAccountInfo = sessionStorage.getItem('account_infor');
    if (storedAccountInfo) {
      this.loggedInAccount = JSON.parse(storedAccountInfo);
    }
  }
}

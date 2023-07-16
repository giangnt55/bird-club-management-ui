import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DevelopingDialogComponent } from '../developing-dialog/developing-dialog.component';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Subscription } from 'rxjs';
import { DashboardDto } from 'src/app/models/dashboard.model';

interface DataItem {
  Name: string;
  Age: number;
  Office: string;
  Address: string;
  StartDate: string;
  Salary: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  loggedInAccount!: any | null;
  private subscription!: Subscription;
  dashboard!: DashboardDto;

  constructor(
    private dialog: MatDialog,
    private dashboardService: DashboardService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  getDashboardInformation() {
    this.subscription = this.dashboardService.getDashboardInfor().subscribe(
      (response) => {
        this.dashboard = response.data;
      },
      (error) => {
        // Handle the error here
        // For example, display an error message or perform error handling tasks
        console.error('Error: ', error);
      }
    );
  }

  ngOnInit(): void {
    // Retrieve the stored account information from session storage
    const storedAccountInfo = sessionStorage.getItem('account_infor');
    if (storedAccountInfo) {
      this.loggedInAccount = JSON.parse(storedAccountInfo);
    }

    this.getDashboardInformation();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openMenuDialog(): void {
    this.dialog.open(DevelopingDialogComponent);
  }
}

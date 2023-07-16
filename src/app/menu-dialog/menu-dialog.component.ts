import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ReportMenuComponent } from '../components/report-menu/report-menu.component';
import { Subscription } from 'rxjs';
import { ReportService } from '../services/report.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.css'],
})
export class MenuDialogComponent implements OnInit, OnDestroy {
  constructor(
    private dialog: MatDialog,
    private reportService: ReportService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<MenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.targetId = this.data.targetId;
  }

  targetId: string;

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private subscription!: Subscription;

  onCancelClick(): void {
    // Close the dialog
    this.dialogRef.close();
  }

  openReportTypeDialog(): void {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(ReportMenuComponent);

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (result === 'spam') {
        this.subscription = this.reportService
          .report({
            post_id: this.targetId,
            comment_id: this.targetId,
            type: 1,
          })
          .subscribe(
            (response) => {
              this.toastr.success('Reported');
            },
            (error) => {
              this.toastr.error(error.error.message, 'Error');
            }
          );
      } else if (result === 'violence') {
        this.subscription = this.reportService
          .report({
            post_id: this.targetId,
            comment_id: this.targetId,
            type: 2,
          })
          .subscribe(
            (response) => {
              this.toastr.success('Reported');
            },
            (error) => {
              this.toastr.error(error.error.message, 'Error');
            }
          );
      } else if (result === 'unauthorizedSales') {
        this.subscription = this.reportService
          .report({
            post_id: this.targetId,
            comment_id: this.targetId,
            type: 3,
          })
          .subscribe(
            (response) => {
              this.toastr.success('Reported');
            },
            (error) => {
              this.toastr.error(error.error.message, 'Error');
            }
          );
      } else if (result === 'terrorism') {
        this.subscription = this.reportService
          .report({
            post_id: this.targetId,
            comment_id: this.targetId,
            type: 4,
          })
          .subscribe(
            (response) => {
              this.toastr.success('Reported');
            },
            (error) => {
              this.toastr.error(error.error.message, 'Error');
            }
          );
      } else if (result === 'fakeInformation') {
        this.subscription = this.reportService
          .report({
            post_id: this.targetId,
            comment_id: this.targetId,
            type: 5,
          })
          .subscribe(
            (response) => {
              this.toastr.success('Reported');
            },
            (error) => {
              this.toastr.error(error.error.message, 'Error');
            }
          );
      } else if (result === 'others') {
        this.subscription = this.reportService
          .report({
            post_id: this.targetId,
            comment_id: this.targetId,
            type: 6,
          })
          .subscribe(
            (response) => {
              this.toastr.success('Reported');
            },
            (error) => {
              this.toastr.error(error.error.message, 'Error');
            }
          );
      }
    });
  }
}

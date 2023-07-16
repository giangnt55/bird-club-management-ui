import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-report-menu',
  templateUrl: './report-menu.component.html',
  styleUrls: ['./report-menu.component.css'],
})
export class ReportMenuComponent {
  constructor(
    private dialogRef: MatDialogRef<ReportMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onReportTypeClick(reportType: string): void {
    this.dialogRef.close(reportType);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

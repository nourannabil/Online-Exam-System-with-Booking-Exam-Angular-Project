import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'description', 'examduration', 'Options'];
  dataSource = '';

  constructor(private dialog: MatDialog, public Admin: AdminService) { }

  @ViewChild('CallDeleteDialog') CallDeleteDialog!: TemplateRef<any>;

  ngOnInit(): void {
    this.Admin.GetInbox();
  }

  OpenDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(this.CallDeleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result == 'yes') {
          this.Admin.DeleteInbox(id);
        } else if (result == 'no') {
          console.log("Thank You")
        }
      }
    })
  }
}

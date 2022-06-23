import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { YesNoDialogData } from 'src/app/models/yesNoDialogData';

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.scss']
})
export class YesNoDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<YesNoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: YesNoDialogData) { }
    title: string | undefined = '';
    content: string | undefined= '';

  ngOnInit(): void {
    if (this.data) {
      this.title = this.data.title;
      this.content = this.data.content;
    }
  }

}

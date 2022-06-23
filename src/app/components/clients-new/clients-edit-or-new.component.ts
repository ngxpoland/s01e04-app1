import { AfterContentInit, AfterViewInit, Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupName } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-clients-new-or-edit',
  templateUrl: './clients-edit-or-new.component.html',
  styleUrls: ['./clients-edit-or-new.component.scss']
})
export class ClientsEditOrNewComponent implements OnInit, AfterViewInit, AfterContentInit {
  client: Client = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    phone: ''
  };

  formTitle = 'Nowy klient';

  formGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    surname: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
  });

  constructor(
    public dialogRef: MatDialogRef<ClientsEditOrNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client,
  ) { }

  ngAfterContentInit(): void {
    console.log("data: ", this.data);
    if (this.data?.id > 0) {
      this.client = this.data;
      this.formTitle = 'Edycja danych klienta';
      this.loadForm();
    }
  }

  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    
  }

  save() {
    console.log(this.formGroup);
    this.client.id = this.formGroup.get('id')?.value;
    this.client.name = this.formGroup.get('name')?.value;
    this.client.surname = this.formGroup.get('surname')?.value;
    this.client.email = this.formGroup.get('email')?.value;
    this.client.phone = this.formGroup.get('phone')?.value;
  }

  loadForm() {
    this.formGroup.patchValue(
      { 
        id: this.client.id,
        name: this.client.name,
        surname: this.client.surname,
        email: this.client.email,
        phone: this.client.phone,
      }
    )
  }

  cancel() {
    this.dialogRef.close();
  }

}

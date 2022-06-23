import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';
import { APIStatus } from 'src/app/models/apiStatus';
import { ClientService } from 'src/app/services/Client/client.service';
import { ClientsEditOrNewComponent } from '../clients-new/clients-edit-or-new.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  @Input() isToolbarVisible: boolean = true;
  public dialogRef: any;
  displayedColumns: string[] = ['select', 'id', 'name', 'surname', 'email', 'phone'];
  clients: Client[] = [];
  clientSelection: Client[] = [];

  constructor(
    public clientService: ClientService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe((data: Client[]) => {
      console.log(data);
      this.clients = data;
    });

    /* Example: RESTfull API calls

    this.clientService.deleteClient({ id: 10 }).subscribe((status: APIStatus) => {
      console.log("delete status: ", status);
    });

    this.clientService.postClients([{ id: 0, name: 'Aleksander', surname: 'Wielki', email: 'awielki@o2.pl', phone: '123 456 999'}]).subscribe((status: APIStatus) => {
      console.log("status: ", status)
    });

    this.clientService.putClient({ id: 12, name: 'Piotr', surname: 'Sójka', email: 'psojka@wp.pl', phone: '601 634 352'}).subscribe((status: APIStatus) => {
      console.log("put status: ", status)
    });

    this.clientService.deleteClient({ id: 10 }).subscribe((status: APIStatus) => {
      console.log("delete status: ", status)
    });
    */
  }

  openAddDialog() {
    this.dialogRef = this.dialog.open(
      ClientsEditOrNewComponent, 
      {
        width: '100%',
      }
    );
    this.dialogRef.afterClosed().subscribe((result: Client) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.clientService.postClients([result]).subscribe((status: APIStatus) => {
          console.log('status: ', status);
          this.showNotification();
          this.ngOnInit();
        });
      }
    });
  }

  openEditDialog(client: Client) {
    if (this.clientSelection.length === 0) {
      this.showNotification('Uwaga! Nie zaznaczyłeś klienta do edycji.');
      return;
    }
    this.dialogRef = this.dialog.open(
      ClientsEditOrNewComponent, 
      {
        width: '100%', 
        data: client
      }
    );
    this.dialogRef.afterClosed().subscribe((result: Client) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.clientService.putClient(result).subscribe((status: APIStatus) => {
          console.log('status: ', status);
          if (status.status === 0) {
            this.showNotification();
          } else {
            this.showNotification('Uwaga! Nie udało się zapisać danych!', 10);
          }
        });
      }
    });
  }

  public handleAdd(): void {
    this.openAddDialog();
  }

  public handleEdit(): void {
    //const str = JSON.stringify(this.clientSelection);
    this.openEditDialog(this.clientSelection[0]);
    //alert('Edytowanie tych elementów: '+str);
  }

  public handleDelete(): void {
    //alert('Not implemented!');
    console.log(this.clientSelection);
  }

  public checkboxHandler(event: any, row: any): void {
    if (event.checked) {
      this.clientSelection.push(row);
    } else {
      this.clientSelection.splice(this.clientSelection.indexOf(row), 1);
    }
    console.log(this.clientSelection);
  }

  public showNotification(msg: string = 'Pomyślnie zapisano dane', timeout: number = 2.5): void {
    this.snackBar.open(msg, 'OK', {
      duration: 1000 * timeout,
    });
  }

}

import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';
import { APIStatus } from 'src/app/models/apiStatus';
import { ClientService } from 'src/app/services/Client/client.service';
import { ClientsEditOrNewComponent } from '../clients-new/clients-edit-or-new.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { YesNoDialogData } from 'src/app/models/yesNoDialogData';
import { YesNoDialogComponent } from '../yes-no-dialog/yes-no-dialog.component';
import { CheckboxChangeEvent } from '../toolbar/toolbar.component';
import { MatCheckbox } from '@angular/material/checkbox';

export interface SelectableElement<S,E> {
  selectable: S,
  element: E,
}

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit, AfterViewInit {
  @Input() isToolbarVisible: boolean = true;
  @ViewChildren('chkBox') allCheckboxes: QueryList<MatCheckbox> = new QueryList<MatCheckbox>();
  public dialogRef: any;
  displayedColumns: string[] = ['select', 'id', 'name', 'surname', 'email', 'phone'];
  clients: Client[] = [];
  selectionIsEmpty: boolean = true;
  toolbarSelectAll: boolean = false;
  clientSelection: SelectableElement<MatCheckbox, Client>[] = [];

  constructor(
    public clientService: ClientService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngAfterViewInit(): void {
    this.allCheckboxes?.changes.subscribe((allCheckboxes: QueryList<MatCheckbox>) => {
      console.log("allCheckboxes: ", allCheckboxes);
      const items: MatCheckbox[] = allCheckboxes.toArray();
      for (let i = 0; i < this.clients.length; i++) {
        let item: SelectableElement<MatCheckbox, Client> = {
          selectable: items[i],
          element: this.clients[i],
        };
        this.clientSelection.push(item);
      }
    });
  }

  ngOnInit(): void {
    this.clientService.getClients().subscribe((data: Client[]) => {
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
    this.dialogRef.afterClosed().subscribe((result: Client[]) => {
      console.log('The dialog was closed', result);
      if (result?.length > 0) {
        this.clientService.postClients(result).subscribe((status: APIStatus) => {
          console.log('status: ', status);
          this.showNotification();
          this.ngOnInit();
        });
      }
    });
  }

  openEditDialog() {
    const items: Client[] = this.clientSelection.filter(item => item.selectable.checked).map((item) => item.element);

    // if (this.clientSelection.length === 0) {
    //   this.showNotification('Uwaga! Nie zaznaczyłeś klienta do edycji.');
    //   return;
    // }
    this.dialogRef = this.dialog.open(
      ClientsEditOrNewComponent,
      {
        width: '100%',
        data: items
      }
    );
    this.dialogRef.afterClosed().subscribe((result: Client[]) => {
      console.log('The dialog was closed', result);
      if (result) {
        for (let [i, client] of result.entries()) {
          this.clientService.putClient(client).subscribe((status: APIStatus) => {
            console.log('status: ', status);
            if (status.status === 0) {
              items[i].name = client.name;
              items[i].surname = client.surname;
              items[i].email = client.email;
              items[i].phone = client.phone;
            } else {
              this.showNotification('Uwaga! Nie udało się zapisać danych!', 10);
              return;
            }
          });
        }
        this.showNotification();
      }
    });
  }

  getSelectedClients(): Client[] {
    return this.clientSelection.filter((item) => item.selectable?.checked === true).map((item) => item.element);
  }

  openDeleteDialog() {
    const clients: Client[] = this.getSelectedClients();

    const question = 
    (clients.length === 1) ?
    'Czy na pewno chesz usunąć klienta ' + clients.map((client) => { return ('"'+client.name + ' ' + client.surname+'"'); }).join(', ') + '?'
    : 'Czy na pewno chesz usunąć następujących klientów: <br><br>' + clients.map((client) => { return ('"'+client.name + ' ' + client.surname+'"'); }).join(', ') + '?';
    const yesNoData: YesNoDialogData = {
      title: 'Pytanie',
      content: question
    }
    this.dialogRef = this.dialog.open(
      YesNoDialogComponent,
      {
        width: '100%',
        data: yesNoData
      }
    )
    this.dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.clientService.deleteClient(clients[0]).subscribe((status: APIStatus) => {
          if (status.status === 0) {
            this.showNotification('Klient usunięty.');
            this.ngOnInit();
          } else {
            this.showNotification('Uwaga! Nie udało się usunąć klienta!', 10);
          }
        });
      }
    });
  }

  public buttonClickHandler(name: string): void {
    switch (name) {
      case 'Dodaj':
        this.openAddDialog();
        break;
      case 'Edytuj':
        this.openEditDialog();
        break;
      case 'Usuń':
        this.openDeleteDialog();
        break;
      default:
        console.log('Warning: toolbar button name is not recognised!');
    }
  }

  public checkboxChangeHandler(changeEventArg: CheckboxChangeEvent) {
    console.log("checkbox name, state: ", changeEventArg.name, changeEventArg.checkState, this.clientSelection);
    
    if (changeEventArg.name === 'chkAll') {
      this.allCheckboxes?.forEach((checkbox) => {
        if (!checkbox.disabled) {
          checkbox.checked = true;
        }
      });
      this.toggleCheckboxes(!changeEventArg.checkState);
    }
  }

  toggleCheckboxes(state: boolean) {
    this.selectionIsEmpty = state;
    this.allCheckboxes?.forEach((checkbox: MatCheckbox) => {
      if (!checkbox.disabled) checkbox.checked = !state;
    });
  }

  checkIsSelectionEmpty(): void {
    for (let item of this.clientSelection) {
      if (item.selectable.checked) {
        console.log(item.selectable.checked);
        this.selectionIsEmpty = false;
        return;
      }
    }
    this.selectionIsEmpty = true;
    console.log("Czyszczenie zaznaczenia globalnego checkboxa");
    this.toolbarSelectAll = false;
  }

  public checkboxHandler(checkbox: any, row: any): void {
    checkbox.checked = !checkbox.checked;
    this.checkIsSelectionEmpty();
  }

  public showNotification(msg: string = 'Pomyślnie zapisano dane', timeout: number = 2.5): void {
    this.snackBar.open(msg, 'OK', {
      duration: 1000 * timeout,
    });
  }

}

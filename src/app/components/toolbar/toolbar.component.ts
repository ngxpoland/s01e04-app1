import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

export interface ToolbarElement {
  type: 'button'|'checkbox',
  icon?: string,
  name: string,
  checkedName?: string,
  uncheckedName?: string,
  checked?: boolean,
  disabled?: boolean,
  indeterminate?: boolean,
}

export interface CheckboxChangeEvent {
  name: string,
  checkState: boolean,
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() toolbarElements: ToolbarElement[] | null = [];
  @Input() selectionCount: number = 0;
  @Output() buttonClickEvent = new EventEmitter<string>();
  @Output() checkboxChangeEvent = new EventEmitter<CheckboxChangeEvent>();

  constructor() { }

  ngOnInit(): void { }

  buttonClick(name: string) {
    this.buttonClickEvent.emit(name);
  }

  checkboxChange(arg: CheckboxChangeEvent) {
    this.checkboxChangeEvent.emit(arg);
  }

}

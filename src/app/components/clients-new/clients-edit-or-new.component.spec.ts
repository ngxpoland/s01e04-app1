import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsEditOrNewComponent } from './clients-edit-or-new.component';

describe('ClientsNewComponent', () => {
  let component: ClientsEditOrNewComponent;
  let fixture: ComponentFixture<ClientsEditOrNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsEditOrNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsEditOrNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

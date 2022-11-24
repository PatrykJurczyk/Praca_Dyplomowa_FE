import { Component } from '@angular/core';
import { openModal } from './models/user.interface';
import {ModalService} from "./services/modal.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  openModal: openModal = { isOpen: false, type: '' };
  // modalDetail!: HouseDetailModel;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.modalStateSubject.subscribe(
      (data) => (this.openModal = data)
    );
    // this.modalService.modalDetailSubject.subscribe(
    //   (data) => (this.modalDetail = data)
    // );
  }

  closeModal() {
    this.modalService.modalStateSubject.next({ isOpen: false, type: '' });
  }
}

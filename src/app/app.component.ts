import { Component } from '@angular/core';
import { openModal } from './models/user.interface';
import { ModalService } from './services/modal.service';
import { HouseDetailModel } from './models/houseModel';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  openModal: openModal = { isOpen: false, type: '' };
  modalDetail!: HouseDetailModel;

  loading$ = this.loader.loading$;
  constructor(
    private modalService: ModalService,
    public loader: LoadingService
  ) {}

  ngOnInit(): void {
    this.modalService.modalStateSubject.subscribe(
      (data) => (this.openModal = data)
    );
    this.modalService.modalDetailSubject.subscribe(
      (data) => (this.modalDetail = data)
    );
  }

  closeModal() {
    this.modalService.modalStateSubject.next({ isOpen: false, type: '' });
  }
}

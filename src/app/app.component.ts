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
  protected openModal: openModal = { isOpen: false, type: '' };
  protected modalDetail!: HouseDetailModel;
  protected loading$ = this.loader.loading$;

  constructor(
    private modalService: ModalService,
    public loader: LoadingService
  ) {
    this.modalService.modalStateSubject.subscribe(
      (data) => (this.openModal = data)
    );
    this.modalService.modalDetailSubject.subscribe(
      (data) => (this.modalDetail = data)
    );
  }

  protected closeModal() {
    this.modalService.modalStateSubject.next({ isOpen: false, type: '' });
  }
}

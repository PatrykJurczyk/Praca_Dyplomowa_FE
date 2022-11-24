import { Component, Input } from '@angular/core';
import { HouseModel } from '../../models/houseModel';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss'],
})
export class DetailsModalComponent {
  @Input() house!: HouseModel;
  @Input() isOpen!: boolean;
  @Input() favourites: string[] = [];

  constructor(private modalDetail: ModalService) {}

  onClose() {
    this.modalDetail.modalDetailSubject.next({
      open: false,
      idHouse: '',
    });
  }
}

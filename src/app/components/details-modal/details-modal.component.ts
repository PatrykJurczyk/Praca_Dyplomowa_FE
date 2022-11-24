import { Component, Input } from '@angular/core';
import { HouseModel } from '../../models/houseModel';
import { ModalService } from '../../services/modal.service';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss'],
})
export class DetailsModalComponent {
  @Input() set house(value: HouseModel) {
    this.time = moment(value?.createdAt).format('DD-MM-YYYY HH:mm');
    this.houseData = value;
  }
  @Input() isOpen!: boolean;
  @Input() favourites: string[] = [];
  @Input() userId!: string;
  protected time!: string;
  protected houseData!: HouseModel;

  constructor(private modalDetail: ModalService) {}

  onClose() {
    this.modalDetail.modalDetailSubject.next({
      open: false,
      idHouse: '',
    });
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { openModal } from '../models/user.interface';
import { HouseDetailModel } from '../models/houseModel';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalStateSubject: BehaviorSubject<openModal> =
    new BehaviorSubject<openModal>({ isOpen: false, type: '' });

  modalDetailSubject: BehaviorSubject<HouseDetailModel> =
    new BehaviorSubject<HouseDetailModel>({
      open: false,
      idHouse: '',
    });
}

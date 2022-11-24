import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { openModal } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalStateSubject: BehaviorSubject<openModal> =
    new BehaviorSubject<openModal>({ isOpen: false, type: '' });
}

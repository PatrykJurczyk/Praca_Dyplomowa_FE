import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ToastService } from 'angular-toastify';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-popup',
  templateUrl: './nav-popup.component.html',
  styleUrls: ['./nav-popup.component.scss'],
})
export class NavPopupComponent {
  @Input() userName!: string | undefined;
  @Output() closePopup = new EventEmitter<void>();

  constructor(
    private userService: UserService,
    private modalService: ModalService,
    private _toastService: ToastService,
    private _router: Router
  ) {}

  protected logOut() {
    this.modalService.modalStateSubject.next({ isOpen: false, type: '' });
    this._toastService.error('Pomyślnie wylogowano');
    this._router.navigateByUrl('/').then(() => {
      window.sessionStorage.clear();
      window.location.reload();
    });
  }

  protected closeNavPopup() {
    this.closePopup.emit();
  }
}

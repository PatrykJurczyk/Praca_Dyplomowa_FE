import { Component, OnDestroy } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { UserService } from '../../services/user.service';
import { ModalService } from '../../services/modal.service';
import { UserModel } from '../../models/user.interface';
import { Subject, takeUntil } from 'rxjs';
import { UserStorage } from '../../enums/enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  protected readonly isLoggedIn: string = window.sessionStorage.getItem(
    UserStorage.USER_ROLE
  ) as string;
  protected user!: UserModel;
  protected userAvatar?: string;
  protected openNavPopup: boolean = false;
  private destroy$: Subject<void> = new Subject();

  constructor(
    private userService: UserService,
    private modalService: ModalService,
    private _toastService: ToastService,
    private _router: Router
  ) {
    if (window.sessionStorage.getItem(UserStorage.USER_KEY)) {
      this.getUsers();
    }

    this.userService.Refreshrequired.pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.getUsers();
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getUsers() {
    this.userService
      .getUser(window.sessionStorage.getItem(UserStorage.USER_KEY) as string)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: UserModel) => {
        this.userAvatar = value.avatar ? value.avatar : '';
        this.user = value;
      });
  }

  protected onClick() {
    !this.isLoggedIn
      ? this.modalService.modalStateSubject.next({
          isOpen: true,
          type: 'login',
        })
      : (this.modalService.modalStateSubject.next({ isOpen: false, type: '' }),
        this._router.navigateByUrl('/').then(() => {
          this._toastService.error('Pomyślnie wylogowano');
          window.sessionStorage.clear();
          window.location.reload();
        }));
  }

  protected onAvatarClick() {
    this.openNavPopup = !this.openNavPopup;
  }

  protected closeNavPopup() {
    this.openNavPopup = false;
  }
}

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
  protected navLink: string = '/';

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
        if (window.sessionStorage.getItem(UserStorage.USER_KEY)) {
          this.getUsers();
        }
      }
    );
    if (window.sessionStorage.getItem(UserStorage.USER_ROLE) === 'Admin') {
      this.navLink = '/admin';
    }
    if (window.sessionStorage.getItem(UserStorage.USER_ROLE) === 'Manager') {
      this.navLink = '/manager';
    }
    if (window.sessionStorage.getItem(UserStorage.USER_ROLE) === 'User') {
      this.navLink = '/';
    }
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
        window.sessionStorage.clear(),
        this._router.navigateByUrl('/').then(() => {
          this._toastService.error('Pomyślnie wylogowano');
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

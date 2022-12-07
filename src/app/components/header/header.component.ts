import { Component, OnDestroy } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { UserService } from '../../services/user.service';
import { ModalService } from '../../services/modal.service';
import { UserModel } from '../../models/user.interface';
import { Subject, takeUntil } from 'rxjs';
import { UserStorage } from '../../enums/enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  protected readonly isLoggedIn: string | null = window.sessionStorage.getItem(
    UserStorage.USER_ROLE
  );
  protected user!: UserModel;
  protected userAvatar?: string;
  protected openNavPopup: boolean = false;

  private destroy$: Subject<void> = new Subject();

  constructor(
    private userService: UserService,
    private modalService: ModalService,
    private _toastService: ToastService
  ) {
    this.userService.Refreshrequired.pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.getUsers();
      }
    );
  }

  ngOnInit(): void {
    window.sessionStorage.getItem(UserStorage.USER_KEY)
      ? this.getUsers()
      : null;
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
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClick() {
    !this.isLoggedIn
      ? this.modalService.modalStateSubject.next({
          isOpen: true,
          type: 'login',
        })
      : (window.sessionStorage.clear(),
        this.modalService.modalStateSubject.next({ isOpen: false, type: '' }),
        this._toastService.error('Pomyślnie wylogowano'),
        setTimeout(() => {
          window.location.reload();
        }, 2000));
  }

  onAvatarClick() {
    this.openNavPopup = !this.openNavPopup;
  }

  closeNavPopoup() {
    this.openNavPopup = false;
  }
}

import { Component, OnDestroy } from '@angular/core';
import { UserModel } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { UserStorage } from '../../enums/enum';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  form!: FormGroup;
  protected isSignInClicked: boolean = true;

  private destroy$: Subject<void> = new Subject();

  constructor(
    private userService: UserService,
    private modalService: ModalService,
    private fb: FormBuilder,
    private _toastService: ToastService
  ) {
    this.form = this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected onSubmit(data: UserModel): void {
    this.userService
      .loginUser(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: UserModel) => {
          console.log(data);
          window.sessionStorage.setItem(UserStorage.USER_KEY, data.id);
          window.sessionStorage.setItem(
            UserStorage.USER_ROLE,
            data.role as string
          );
          window.sessionStorage.setItem(
            UserStorage.TOKEN_KEY,
            data.token as string
          );
          window.location.reload();
        },
        error: (error) => this._toastService.error(error.error.message),
      });
  }

  protected setIsSignInClicked() {
    this.isSignInClicked = true;
    this.modalService.modalStateSubject.next({ isOpen: true, type: 'login' });
  }

  protected setIsSignUpClicked() {
    this.isSignInClicked = false;
    this.modalService.modalStateSubject.next({
      isOpen: true,
      type: 'register',
    });
  }

  private initForm(): FormGroup {
    return this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }
}

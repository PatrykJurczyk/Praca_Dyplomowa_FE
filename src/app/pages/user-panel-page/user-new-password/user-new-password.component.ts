import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ToastService } from 'angular-toastify';
import { ModalService } from '../../../services/modal.service';
import { Subject, takeUntil } from 'rxjs';

interface changePassword {
  password: string;
  newPassword: string;
  newPasswordRepeat: string;
}

@Component({
  selector: 'app-user-new-password',
  templateUrl: './user-new-password.component.html',
  styleUrls: ['./user-new-password.component.scss'],
})
export class UserNewPasswordComponent {
  form!: FormGroup;

  private destroy$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private _toastService: ToastService,
    private modalService: ModalService
  ) {
    this.form = this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected onSubmit(data: changePassword): void {
    this.userService
      .updateUserPassword(
        window.sessionStorage.getItem('auth-user') as string,
        data
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this._toastService.success('Pomyślnie zmieniono hasło');
          this.modalService.modalStateSubject.next({ isOpen: false, type: '' });
        },
        error: (err) => this._toastService.error(err.error.message),
      });
  }

  private initForm(): FormGroup {
    return this.fb.group({
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      newPassword: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      newPasswordRepeat: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }
}

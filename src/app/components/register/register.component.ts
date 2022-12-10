import { Component, OnDestroy } from '@angular/core';
import { UserModel } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  form!: FormGroup;
  protected isSignUpClicked: boolean = true;
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

  protected onSubmit(data: UserModel) {
    this.userService
      .createUser(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => (
          this.setIsSignInClicked(),
          this._toastService.success('Pomyślnie utworzono konto')
        ),
        error: (error) => this._toastService.error(error.error.message),
      });
  }

  protected setIsSignInClicked() {
    this.isSignUpClicked = true;
    this.modalService.modalStateSubject.next({ isOpen: true, type: 'login' });
  }

  protected setIsSignUpClicked() {
    this.isSignUpClicked = false;
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
      passwordRepeat: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }
}

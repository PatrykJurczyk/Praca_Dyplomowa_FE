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
    this.form = fb.group({
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(data: UserModel) {
    this.userService
      .createUser(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => (
          this.setIsSignInClicked(),
          this._toastService.success('Pomyślnie utworzono konto')
        ),
        (err) => this._toastService.error(err.error.message)
      );
  }

  setIsSignInClicked() {
    this.isSignUpClicked = true;
    this.modalService.modalStateSubject.next({ isOpen: true, type: 'login' });
  }

  setIsSignUpClicked() {
    this.isSignUpClicked = false;
    this.modalService.modalStateSubject.next({
      isOpen: true,
      type: 'register',
    });
  }
}

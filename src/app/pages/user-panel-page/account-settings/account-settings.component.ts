import { Component, OnDestroy } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { UserService } from '../../../services/user.service';
import { ToastService } from 'angular-toastify';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserStorage } from '../../../enums/enum';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnDestroy {
  form!: FormGroup;
  protected userAvatar?: string;
  protected userName?: string;
  protected userPhone?: string;
  protected userEmail?: string;
  private destroy$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private userService: UserService,
    private _toastService: ToastService
  ) {
    this.getUser();
    this.userService.Refreshrequired.pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.getUser();
      }
    );
    this.form = this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getUser() {
    this.userService
      .getUser(window.sessionStorage.getItem(UserStorage.USER_KEY) as string)
      .subscribe((value) => {
        this.userAvatar = value.avatar ? value.avatar : '';
        this.userName = value.name ? value.name : '';
        this.userPhone = value.phone ? value.phone : '';
        this.userEmail = value.email ? value.email : '';
      });
  }

  protected sendImage(img: any) {
    const file: File = img.files[0];

    const formData: FormData = new FormData();
    formData.append('avatar', file);
    this.confirm(formData);
  }

  protected confirm(data: any) {
    this.userService
      .updateUser(
        window.sessionStorage.getItem(UserStorage.USER_KEY) as string,
        data
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this._toastService.success('Pomyślnie zaktualizowano użytkownika');
        },
        (err) => this._toastService.error(err.error.message)
      );
    this.form.get('name')?.disable();
    this.form.get('phone')?.disable();
    this.form.get('avatar')?.disable();
  }

  protected editPasswordClick() {
    this.modalService.modalStateSubject.next({
      isOpen: true,
      type: 'changePassword',
    });
  }

  private initForm(): FormGroup {
    return this.fb.group({
      name: new FormControl({
        value: this.userName,
        disabled: true,
      }),
      phone: new FormControl({
        value: this.userPhone,
        disabled: true,
      }),
      avatar: new FormControl({
        value: this.userAvatar,
        disabled: true,
      }),
    });
  }
}

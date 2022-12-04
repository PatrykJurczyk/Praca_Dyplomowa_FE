import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { UserService } from '../../../services/user.service';
import { ToastService } from 'angular-toastify';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserStorage } from '../../../enums/enum';

interface editUserInterface {
  name?: string;
  phone?: string;
  avatar?: File;
}

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {
  form!: FormGroup;
  protected userAvatar?: string;
  protected userName?: string;
  protected userPhone?: string;
  protected userEmail?: string;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private userService: UserService,
    private _toastService: ToastService
  ) {
    this.userService
      .getUser(window.sessionStorage.getItem(UserStorage.USER_KEY) as string)
      .subscribe((value) => {
        this.userAvatar = value.avatar ? value.avatar : '';
        this.userName = value.name ? value.name : '';
        this.userPhone = value.phone ? value.phone : '';
        this.userEmail = value.email ? value.email : '';
      });
    this.form = fb.group({
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

  ngOnInit(): void {}

  confirm(data: editUserInterface) {
    this.userService
      .updateUser(
        window.sessionStorage.getItem(UserStorage.USER_KEY) as string,
        data
      )
      .subscribe(
        () => {
          this._toastService.success('Pomyślnie zaktualizowano użytkownika');
        },
        (err) => this._toastService.error(err.error.message)
      );
    this.form.get('name')?.disable();
    this.form.get('phone')?.disable();
  }

  editPasswordClick() {
    this.modalService.modalStateSubject.next({
      isOpen: true,
      type: 'changePassword',
    });
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-popup-accept-cancel',
  templateUrl: './popup-accept-cancel.component.html',
  styleUrls: ['./popup-accept-cancel.component.scss'],
})
export class PopupAcceptCancelComponent {
  @Output() isOpened = new EventEmitter<void>();
  @Input() openPopup!: boolean;
  @Input() title!: string;
  @Input() userId!: string;
  @Input() isBlocked!: boolean

  constructor(private userService: UserService) {}

  protected blockPerson() {
    this.isBlocked  ? this.userService.updateUserRestore(this.userId, {}).subscribe() : this.userService.updateUserDeletion(this.userId, {}).subscribe();
  }

  protected cancel() {
    this.isOpened.emit();
  }
}

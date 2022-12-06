import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-popup-accept-cancel',
  templateUrl: './popup-accept-cancel.component.html',
  styleUrls: ['./popup-accept-cancel.component.scss'],
})
export class PopupAcceptCancelComponent implements OnInit {
  @Output() isOpened = new EventEmitter<void>();
  @Input() openPopup!: boolean;
  @Input() title!: string;
  @Input() userId!: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  blockPerson() {
    this.userService.updateUserDeletion(this.userId, {}).subscribe();
  }

  cancel() {
    this.isOpened.emit();
  }
}

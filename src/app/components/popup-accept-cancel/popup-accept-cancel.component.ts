import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}

  blockPerson() {}

  cancel() {
    this.isOpened.emit();
  }
}

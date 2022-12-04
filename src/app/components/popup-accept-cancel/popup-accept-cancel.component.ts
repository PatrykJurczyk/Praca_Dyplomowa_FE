import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-accept-cancel',
  templateUrl: './popup-accept-cancel.component.html',
  styleUrls: ['./popup-accept-cancel.component.scss'],
})
export class PopupAcceptCancelComponent implements OnInit {
  @Input() isOpened!: boolean;
  @Input() title!: string;

  constructor() {}

  ngOnInit(): void {}
}

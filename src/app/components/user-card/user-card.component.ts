import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.interface';
import { HouseModel } from '../../models/houseModel';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  protected userHouses: HouseModel[] = [];

  @Input() set person(user: UserModel) {
    this.user = user;
    this.createdDatePerson = user.createdAt?.split('T')[0];
  }

  @Input() set houses(houses: HouseModel[]) {
    if (!houses) {
      return;
    }
    this.userHouses = houses.filter(
      (house: HouseModel) => house.owner === this.user._id
    );
  }

  protected user!: UserModel;
  protected createdDatePerson?: string;

  constructor() {}

  ngOnInit(): void {}
}

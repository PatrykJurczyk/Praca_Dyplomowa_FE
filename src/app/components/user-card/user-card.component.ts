import { Component, Input } from '@angular/core';
import { UserModel } from '../../models/user.interface';
import { HouseModel } from '../../models/houseModel';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  protected userHouses: HouseModel[] = [];
  protected openPopup: boolean = false;
  protected userId!: string;
  protected title: string = 'Czy chcesz zablokować użytkownika?';
  protected isBlocked: boolean = false

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

  protected restorePerson(id: string) {
    this.userId = id;
    this.openPopup = true;
    this.isBlocked = true
  }

  protected user!: UserModel;
  protected createdDatePerson?: string;

  protected blockPerson(id: string) {
    this.userId = id;
    this.openPopup = true;
    this.isBlocked = false
  }

  protected closePopup() {
    this.openPopup = false;
  }
}

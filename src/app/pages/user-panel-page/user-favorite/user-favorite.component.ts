import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { HouseService } from '../../../services/house.service';
import { HouseModel } from '../../../models/houseModel';

@Component({
  selector: 'app-user-favorite',
  templateUrl: './user-favorite.component.html',
  styleUrls: ['./user-favorite.component.scss'],
})
export class UserFavoriteComponent implements OnInit {
  house!: HouseModel[];
  isLoggedIn: boolean = !!window.sessionStorage.getItem('auth-user');
  favourites: string[] = [];
  userId!: string;

  constructor(private userService: UserService, private houses: HouseService) {
    this.userService
      .getUser(window.sessionStorage.getItem('auth-user') as string)
      .subscribe((value) => {
        this.userId = value.id;
        this.favourites = value.favorites as string[];
      });
    this.houses
      .getHouses()
      .subscribe(
        (value1) =>
          (this.house = value1.filter((element: HouseModel) =>
            this.favourites?.includes(element._id)
          ))
      );
  }

  ngOnInit(): void {}
}

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

  constructor(private userService: UserService, private houses: HouseService) {
    this.isLoggedIn
      ? this.userService
          .getUser(window.sessionStorage.getItem('auth-user') as string)
          .subscribe((value) => {
            this.favourites = value.favorites as string[];
            this.houses
              .getHouses()
              .subscribe(
                (value1) =>
                  (this.house = value1.filter((element: HouseModel) =>
                    value.favorites?.includes(element._id)
                  ))
              );
          })
      : null;
  }

  ngOnInit(): void {
    console.log(this.house);
  }
}

import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserService } from '../../../services/user.service';
import { HouseService } from '../../../services/house.service';
import { HouseModel } from '../../../models/houseModel';
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-user-favorite',
  templateUrl: './user-favorite.component.html',
  styleUrls: ['./user-favorite.component.scss'],
})
export class UserFavoriteComponent implements OnInit, OnDestroy {
  house!: HouseModel[];
  isLoggedIn: boolean = !!window.sessionStorage.getItem('auth-user');
  favourites: string[] = [];
  userId!: string;
  private destroy$: Subject<void> = new Subject();

  constructor(private userService: UserService, private houses: HouseService) {

    this.userService.Refreshrequired.pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.userService
          .getUser(window.sessionStorage.getItem('auth-user') as string)
          .subscribe((value) => {
            this.userId = value._id;
            this.favourites = value.favorites as string[];
          });
      }
    );

    this.userService
      .getUser(window.sessionStorage.getItem('auth-user') as string)
      .subscribe((value) => {
        this.userId = value._id;
        this.favourites = value.favorites as string[];
      });

    this.houses.Refreshrequired.pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.houses
          .getHouses()
          .subscribe(
            (value1) =>
              (this.house = value1.filter((element: HouseModel) =>
                this.favourites?.includes(element._id)
              ))
          );
      }
    );

    this.houses
      .getHouses()
      .subscribe(
        (value1) =>
          (this.house = value1.filter((element: HouseModel) =>
            this.favourites?.includes(element._id)
          ))
      );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {}
}

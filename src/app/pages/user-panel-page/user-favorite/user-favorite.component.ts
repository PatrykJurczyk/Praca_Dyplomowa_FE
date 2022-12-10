import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { HouseService } from '../../../services/house.service';
import { HouseModel } from '../../../models/houseModel';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-favorite',
  templateUrl: './user-favorite.component.html',
  styleUrls: ['./user-favorite.component.scss'],
})
export class UserFavoriteComponent implements OnDestroy {
  protected house!: HouseModel[];
  protected isLoggedIn: boolean = !!window.sessionStorage.getItem('auth-user');
  protected favourites: string[] = [];
  protected userId!: string;

  private destroy$: Subject<void> = new Subject();

  constructor(private userService: UserService, private houses: HouseService) {
    this.getUser();
    this.getHouses();

    this.userService.Refreshrequired.pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.getUser();
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getUser() {
    this.userService
      .getUser(window.sessionStorage.getItem('auth-user') as string)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.userId = value._id;
        this.favourites = value.favorites as string[];
        this.getHouses();
      });
  }

  private getHouses() {
    this.houses
      .getHouses()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (value1) =>
          (this.house = value1.filter((element: HouseModel) =>
            this.favourites?.includes(element._id)
          ))
      );
  }
}

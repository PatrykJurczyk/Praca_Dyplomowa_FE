import { Component, Input, OnDestroy } from '@angular/core';
import { HouseService } from '../../services/house.service';
import { HouseModel } from '../../models/houseModel';
import { isReserved, UserStorage } from '../../enums/enum';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnDestroy {
  protected valueOfButton: string = 'Cena rosnąco';
  protected houses: HouseModel[] = [];
  favourites: string[] = [];
  userId!: string;
  isLoggedIn: boolean = !!window.sessionStorage.getItem(UserStorage.USER_KEY);

  private destroy$: Subject<void> = new Subject();
  constructor(
    private housesService: HouseService,
    private userService: UserService
  ) {
    housesService
      .getHouses()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.houses = value.filter(
          (house: HouseModel) => house.isReserved !== isReserved.archiwizowany
        );
      });
    this.isLoggedIn
      ? this.userService
          .getUser(
            window.sessionStorage.getItem(UserStorage.USER_KEY) as string
          )
          .pipe(takeUntil(this.destroy$))
          .subscribe((value) => {
            this.userId = value._id;
            this.favourites = value.favorites as string[];
          })
      : null;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // todo
  onClick(): void {
    this.valueOfButton = this.valueOfButton;
  }
}

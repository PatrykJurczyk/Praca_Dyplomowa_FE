import { Component, OnDestroy } from '@angular/core';
import { HouseService } from '../../services/house.service';
import { HouseModel } from '../../models/houseModel';
import { isReserved, UserStorage } from '../../enums/enum';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnDestroy {
  protected selectedOption: string = 'Wybierz opcję sortowania';
  protected houses: HouseModel[] = [];
  protected favourites: string[] = [];
  protected userId!: string;
  protected isLoggedIn: boolean = !!window.sessionStorage.getItem(
    UserStorage.USER_KEY
  );
  protected listOption: string[] = [
    'Wybierz opcję sortowania',
    'Cena rosnąco',
    'Cena malejąco',
    'Data dodania: najnowsze',
    'Data dodania: najstarsze',
    'Powierzchnia: rosnąco',
    'Powierzchnia: malejąco',
  ];

  private destroy$: Subject<void> = new Subject();

  constructor(
    private housesService: HouseService,
    private userService: UserService
  ) {
    this.getHouses();
    this.housesService.Refreshrequired.pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.getHouses();
      }
    );

    if (this.isLoggedIn) {
      this.getUser();
    }

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
      .getUser(window.sessionStorage.getItem(UserStorage.USER_KEY) as string)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.userId = value._id;
        this.favourites = value.favorites as string[];
      });
  }

  private getHouses() {
    this.housesService
      .getHouses()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.houses = value.filter(
          (house: HouseModel) =>
            house.isExist !== isReserved.archiwizowany && house.isAccepted === 2
        );
      });
  }

  protected onClick(): void {
    if (this.selectedOption === 'Cena rosnąco') {
      this.houses = this.houses.sort((a, b) => a.price - b.price);
    }
    if (this.selectedOption === 'Cena malejąco') {
      this.houses = this.houses.sort((a, b) => b.price - a.price);
    }
    if (this.selectedOption === 'data dodania: najnowsze') {
      this.houses = this.houses.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    if (this.selectedOption === 'data dodania: najstarsze') {
      this.houses = this.houses.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
    if (this.selectedOption === 'powierzchnia: od najmniejszej') {
      this.houses = this.houses.sort((a, b) => a.dimension - b.dimension);
    }
    if (this.selectedOption === 'powierzchnia: od największej') {
      this.houses = this.houses.sort((a, b) => b.dimension - a.dimension);
    }
  }
}

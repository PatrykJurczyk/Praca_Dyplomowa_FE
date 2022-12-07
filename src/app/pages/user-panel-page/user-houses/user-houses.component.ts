import { Component, OnDestroy } from '@angular/core';
import { HouseService } from '../../../services/house.service';
import { Subject, takeUntil } from 'rxjs';
import { HouseModel } from '../../../models/houseModel';
import { isReserved, UserStorage } from '../../../enums/enum';

@Component({
  selector: 'app-user-houses',
  templateUrl: './user-houses.component.html',
  styleUrls: ['./user-houses.component.scss'],
})
export class UserHousesComponent implements OnDestroy {
  protected myHouses!: HouseModel[];
  protected archivedHouses!: HouseModel[];

  private destroy$: Subject<void> = new Subject();
  constructor(private houseService: HouseService) {
    this.getHouses();
    this.houseService.Refreshrequired.pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.getHouses();
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getHouses() {
    this.houseService
      .getHouses()
      .pipe(takeUntil(this.destroy$))
      .subscribe((houses: HouseModel[]) => {
        this.myHouses = houses.filter(
          (house: HouseModel) =>
            house.owner === window.sessionStorage.getItem(UserStorage.USER_KEY)
        );

        this.archivedHouses = houses.filter(
          (house: HouseModel) =>
            house.owner ===
              window.sessionStorage.getItem(UserStorage.USER_KEY) &&
            house.isExist === isReserved.archiwizowany
        );
        console.log(this.myHouses);
        console.log(this.archivedHouses);
      });
  }
}

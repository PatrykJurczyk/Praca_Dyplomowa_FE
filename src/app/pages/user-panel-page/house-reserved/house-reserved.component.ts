import { Component, OnDestroy } from '@angular/core';
import { HouseService } from '../../../services/house.service';
import { HouseModel } from '../../../models/houseModel';
import { UserStorage } from '../../../enums/enum';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-house-reserved',
  templateUrl: './house-reserved.component.html',
  styleUrls: ['./house-reserved.component.scss'],
})
export class HouseReservedComponent implements OnDestroy {
  protected houseReserved: HouseModel[] = [];
  protected userId: string = window.sessionStorage.getItem(
    UserStorage.USER_KEY
  ) as string;

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

  private getHouses() {
    this.houseService
      .getHouses()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (value: HouseModel[]) =>
          (this.houseReserved = value.filter(
            (value: HouseModel) => value.reservedBy === this.userId
          ))
      );
  }
}

import { Component, OnDestroy } from '@angular/core';
import { HouseService } from '../../../services/house.service';
import { Subject, takeUntil } from 'rxjs';
import { HouseModel } from '../../../models/houseModel';
import { isReserved, UserStorage } from '../../../enums/enum';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-user-houses',
  templateUrl: './user-houses.component.html',
  styleUrls: ['./user-houses.component.scss'],
})
export class UserHousesComponent implements OnDestroy {
  protected myHouses!: HouseModel[];
  protected archivedHouses!: HouseModel[];
  protected houseId!: string;
  protected openModalDetails: { open: boolean; idHouse: string } = {
    open: false,
    idHouse: '',
  };

  private destroy$: Subject<void> = new Subject();

  constructor(
    private houseService: HouseService,
    private modalDetail: ModalService
  ) {
    this.getHouses();
    this.houseService.Refreshrequired.pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.getHouses();
      }
    );

    this.modalDetail.modalDetailSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.openModalDetails = data));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getHouses() {
    this.houseService
      .getHouses()
      .pipe(takeUntil(this.destroy$))
      .subscribe((houses: HouseModel[]) => {
        this.myHouses = houses.filter(
          (house: HouseModel) =>
            house.owner ===
              window.sessionStorage.getItem(UserStorage.USER_KEY) &&
            house.isExist !== isReserved.archiwizowany
        );

        this.archivedHouses = houses.filter(
          (house: HouseModel) =>
            house.owner ===
              window.sessionStorage.getItem(UserStorage.USER_KEY) &&
            house.isExist === isReserved.archiwizowany
        );
      });
  }

  protected openOptions(_id: string) {
    if (_id === this.houseId) {
      this.houseId = '';
    } else {
      this.houseId = _id;
    }
  }

  protected archive(_id: string, number: number) {
    this.houseService
      .statusExist(_id, { isExist: number })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => (this.houseId = ''));
  }

  protected showMoreInfo(_id: string) {
    this.openModalDetails.open = true;
    this.openModalDetails.idHouse = _id;
  }
}

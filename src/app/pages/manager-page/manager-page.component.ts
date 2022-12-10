import { Component, OnDestroy } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { managerPage } from '../../models/user.interface';
import { Subject, takeUntil } from 'rxjs';
import { HouseService } from '../../services/house.service';
import { HouseModel } from '../../models/houseModel';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.scss'],
})
export class ManagerPageComponent implements OnDestroy {
  protected selectedPage!: managerPage;
  protected houseAccepted!: HouseModel[];
  protected houseToAccepted!: HouseModel[];
  protected houseRejected!: HouseModel[];

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private modalService: ModalService,
    private houseService: HouseService
  ) {
    this.modalService.managerPageSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: managerPage) => (this.selectedPage = value));

    this.getHouses();
    this.houseService.Refreshrequired.subscribe(() => {
      this.getHouses();
    });
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
        this.houseRejected = houses.filter(
          (house: HouseModel) => house.isAccepted === 0
        );
        this.houseToAccepted = houses.filter(
          (house: HouseModel) => house.isAccepted === 1 && house.isExist !== 3
        );
        this.houseAccepted = houses.filter(
          (house: HouseModel) => house.isAccepted === 2
        );
      });
  }

  protected mode(type: managerPage) {
    this.modalService.managerPageSubject.next(type);
  }
}

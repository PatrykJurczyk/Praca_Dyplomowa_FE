import { Component, Input, OnDestroy } from '@angular/core';
import { HouseModel } from '../../models/houseModel';
import { isReserved, UserStorage } from '../../enums/enum';
import { UserService } from '../../services/user.service';
import { ModalService } from '../../services/modal.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.scss'],
})
export class HouseCardComponent implements OnDestroy {
  @Input() house!: HouseModel;
  isLoggedIn: boolean = !!window.sessionStorage.getItem(UserStorage.USER_KEY);
  isReservedHouse: number = isReserved.zarezerwowany;
  favourites: string[] = [];
  userId!: string;

  openModalDetails: { open: boolean; idHouse: string } = {
    open: false,
    idHouse: '',
  };

  private destroy$: Subject<void> = new Subject();
  constructor(
    private userService: UserService,
    private modalDetail: ModalService
  ) {
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
    this.modalDetail.modalDetailSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.openModalDetails = data));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openDetailsModal(id: string) {
    this.openModalDetails.open = true;
    this.openModalDetails.idHouse = id;
  }
}

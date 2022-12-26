import { Component, Input, OnDestroy } from '@angular/core';
import { HouseModel } from '../../models/houseModel';
import { isReserved } from '../../enums/enum';
import { ModalService } from '../../services/modal.service';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.interface';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.scss'],
})
export class HouseCardComponent implements OnDestroy {
  @Input() house!: HouseModel;
  @Input() favourites: string[] = [];
  @Input() userId!: string;
  @Input() isLoggedIn!: boolean;
  @Input() manager!: boolean;
  @Input() info!: string;
  @Input() color!: any;
  @Input() buttons!: boolean;
  @Input() houseReservedPage!: boolean;

  protected email!: string | null;

  protected isReservedHouse: number = isReserved.zarezerwowany;
  protected openModalDetails: { open: boolean; idHouse: string } = {
    open: false,
    idHouse: '',
  };

  private destroy$: Subject<void> = new Subject();

  constructor(
    private modalDetail: ModalService,
    private userService: UserService
  ) {
    this.modalDetail.modalDetailSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.openModalDetails = data));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected openDetailsModal(id: string, owner: string) {
    this.getEmail(owner);
    this.openModalDetails.open = true;
    this.openModalDetails.idHouse = id;
  }

  protected getEmail(ownerId: string) {
    this.userService
      .getUser(ownerId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: UserModel) => {
        if (value) {
          this.email = value.email;
          return;
        }
        this.email = null;
      });
  }

  protected updateFavorite(id: string) {
    this.userService
      .updateUserFavorites(this.userId, { favorites: id })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}

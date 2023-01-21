import { Component, Input, OnDestroy, Output } from '@angular/core';
import { UserModel } from '../../models/user.interface';
import { HouseModel } from '../../models/houseModel';
import { UserService } from '../../services/user.service';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnDestroy {
  protected userHouses: HouseModel[] = [];
  protected openPopup: boolean = false;
  protected userId!: string;
  protected title!: string;
  protected isBlocked: boolean = false;
  protected modifyRole: boolean = false;

  @Input() addRole!: boolean;
  @Input() set person(user: UserModel) {
    this.user = user;
    this.createdDatePerson = user.createdAt?.split('T')[0];
    this.title = `Czy chcesz zablokować użytkownika ${user.email}?`;
  }

  @Input() set houses(houses: HouseModel[]) {
    if (!houses) {
      return;
    }
    this.userHouses = houses.filter(
      (house: HouseModel) => house.owner === this.user._id
    );
  }

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private userService: UserService,
    private modalService: ModalService
  ) {}
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  protected restorePerson(id: string) {
    this.userId = id;
    this.openPopup = true;
    this.isBlocked = true;
    this.title = `Czy na pewno chcesz odblokować użytkownika ${this.user.email}?`;
  }

  protected user!: UserModel;
  protected createdDatePerson?: string;

  protected blockPerson(id: string) {
    this.userId = id;
    this.openPopup = true;
    this.isBlocked = false;
  }

  protected closePopup() {
    this.openPopup = false;
  }

  protected addRoleFn(id: string) {
    this.modifyRole = true;
    this.userId = id;
  }

  protected closeRoleFn() {
    this.modifyRole = false;
  }

  protected manageRole(id: string, role: string) {
    this.userService
      .updateUser(id, { role: role })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.modalService.adminPageSubject.next({
          user: true,
          manager: false,
          manageRoleUser: false,
        });
      });
  }
}

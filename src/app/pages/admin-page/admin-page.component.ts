import { Component, OnDestroy } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { adminPage, UserModel } from '../../models/user.interface';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';
import { HouseService } from '../../services/house.service';
import { HouseModel } from '../../models/houseModel';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnDestroy {
  protected selectedPage!: adminPage;
  protected users!: UserModel[];
  protected managers!: UserModel[];
  protected houses!: HouseModel[];

  private destroy$: Subject<void> = new Subject();

  constructor(
    private modalService: ModalService,
    private userService: UserService,
    private houseService: HouseService
  ) {
    this.modalService.adminPageSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: adminPage) => (this.selectedPage = value));

    this.getUsers();
    this.userService.Refreshrequired.pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.getUsers();
      }
    );

    this.houseService
      .getHouses()
      .pipe(takeUntil(this.destroy$))
      .subscribe((house: HouseModel[]) => (this.houses = house));
  }

  private getUsers() {
    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: UserModel[]) => {
        this.users = value.filter((value: UserModel) => value.role === 'User');
        this.managers = value.filter(
          (value: UserModel) => value.role === 'Manager'
        );
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  userClicked() {
    this.modalService.adminPageSubject.next({ user: true, manager: false });
  }

  managerClicked() {
    this.modalService.adminPageSubject.next({ user: false, manager: true });
  }
}

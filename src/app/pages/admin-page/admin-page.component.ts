import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { adminPage, UserModel } from '../../models/user.interface';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit, OnDestroy {
  protected selectedPage!: adminPage;
  protected users!: UserModel[];
  protected managers!: UserModel[];

  tam: any = ['sd', 'asdf', 'asdf'];

  private destroy$: Subject<void> = new Subject();

  constructor(
    private modalService: ModalService,
    private userService: UserService
  ) {
    this.modalService.adminPageSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: adminPage) => (this.selectedPage = value));

    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: UserModel[]) => {
        this.users = value.filter((value: UserModel) => value.role === 'User');
        this.managers = value.filter(
          (value: UserModel) => value.role === 'Manager'
        );
        console.log(this.users);
        console.log(this.managers);
      });
  }

  ngOnInit(): void {}

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

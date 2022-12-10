import { Component, Input, OnDestroy } from '@angular/core';
import { HouseModel } from '../../models/houseModel';
import { ModalService } from '../../services/modal.service';
import * as moment from 'moment/moment';
import { HouseService } from '../../services/house.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss'],
})
export class DetailsModalComponent implements OnDestroy {
  @Input() set house(value: HouseModel) {
    this.time = moment(value?.createdAt).format('DD-MM-YYYY HH:mm');
    this.houseData = value;
  }
  @Input() isOpen!: boolean;
  @Input() favourites: string[] = [];
  @Input() userId!: string;
  @Input() manager!: boolean;
  @Input() info!: string;
  @Input() color!: any;
  @Input() buttons!: boolean;
  @Input() email!: string;

  protected time!: string;
  protected houseData!: HouseModel;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private modalDetail: ModalService,
    private houseService: HouseService
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected reserveHouse(id: string) {
    this.houseService
      .statusExist(id, { isExist: 2, reservedBy: this.userId })
      .pipe(takeUntil(this.destroy$))
      .pipe(tap(() => this.onClose()))
      .subscribe();
  }

  protected onClose() {
    this.modalDetail.modalDetailSubject.next({
      open: false,
      idHouse: '',
    });
  }

  protected updateStatus(id: string, statusHouse: number) {
    this.houseService
      .updateStatus(id, { isAccepted: statusHouse })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.onClose());
  }
}

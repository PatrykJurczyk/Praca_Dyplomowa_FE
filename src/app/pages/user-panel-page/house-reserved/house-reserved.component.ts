import { Component, OnInit } from '@angular/core';
import { HouseService } from '../../../services/house.service';
import { HouseModel } from '../../../models/houseModel';
import { UserStorage } from '../../../enums/enum';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-house-reserved',
  templateUrl: './house-reserved.component.html',
  styleUrls: ['./house-reserved.component.scss'],
})
export class HouseReservedComponent implements OnInit {
  protected houseReserved: HouseModel[] = [];
  protected userId: string = window.sessionStorage.getItem(
    UserStorage.USER_KEY
  ) as string;
  private destroy$: Subject<void> = new Subject();

  constructor(private houseService: HouseService) {
    houseService
      .getHouses()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (value: HouseModel[]) =>
          (this.houseReserved = value.filter(
            (value: HouseModel) => value.reservedBy === this.userId
          ))
      );
  }

  ngOnInit(): void {}
}

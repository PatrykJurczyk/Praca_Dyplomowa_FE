import { Component, OnDestroy } from '@angular/core';
import { HouseService } from '../../services/house.service';
import { HouseModel } from '../../models/houseModel';
import { isReserved } from '../../enums/enum';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnDestroy {
  protected valueOfButton: string = 'Cena rosnąco';
  protected houses: HouseModel[] = [];

  private destroy$: Subject<void> = new Subject();
  constructor(private housesService: HouseService) {
    housesService
      .getHouses()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.houses = value.filter(
          (house: HouseModel) => house.isReserved !== isReserved.archiwizowany
        );
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // todo
  onClick(): void {
    this.valueOfButton = this.valueOfButton;
  }
}

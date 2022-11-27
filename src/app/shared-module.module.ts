import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HouseCardComponent } from './components/house-card/house-card.component';
import { DetailsModalComponent } from './components/details-modal/details-modal.component';
import { NgIconsModule } from '@ng-icons/core';
import {
  bootstrapCheckSquareFill,
  bootstrapHeart,
  bootstrapHeartFill,
  bootstrapX,
} from '@ng-icons/bootstrap-icons';

@NgModule({
  imports: [
    CommonModule,
    NgIconsModule.withIcons({
      bootstrapHeart,
      bootstrapHeartFill,
      bootstrapX,
      bootstrapCheckSquareFill,
    }),
  ],
  declarations: [HouseCardComponent, DetailsModalComponent],
  exports: [
    HouseCardComponent,
    DetailsModalComponent,
    CommonModule,
    FormsModule,
  ],
})
export class SharedModule {}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HouseService } from '../../../services/house.service';

@Component({
  selector: 'app-user-new-house',
  templateUrl: './user-new-house.component.html',
  styleUrls: ['./user-new-house.component.scss'],
})
export class UserNewHouseComponent implements OnInit {
  images: File[] = [];
  form!: FormGroup;
  constructor(private fb: FormBuilder, private houseService: HouseService) {
    this.form = fb.group({
      owner: '6379e8f9f37778e961dfb271',
      country: [null, Validators.compose([Validators.required])],
      province: [null, Validators.compose([Validators.required])],
      city: [null, Validators.compose([Validators.required])],
      street: [null, Validators.compose([Validators.required])],
      houseNr: [null, Validators.compose([Validators.required])],
      yearBuilt: [null, Validators.compose([Validators.required])],
      price: [null, Validators.compose([Validators.required])],
      dimension: [null, Validators.compose([Validators.required])],
      floorsInBuilding: [null, Validators.compose([Validators.required])],
      floor: [null, Validators.compose([Validators.required])],
      roomsNumber: [null, Validators.compose([Validators.required])],
      bathroomNumber: [null, Validators.compose([Validators.required])],
      otherFeatures: [
        ['asda', 'asd'],
        Validators.compose([Validators.required]),
      ],
      descriptionField: ['', Validators.compose([Validators.required])],
    });
  }

  addImages(rawImages: EventTarget | null) {
    if (rawImages !== null) {
      //@ts-ignore
      this.images = Array.from(rawImages.files);
    }
  }

  ngOnInit(): void {}
  submit(event: any) {
    const payload = new FormData();

    this.images.forEach((image: File) =>
      payload.append('images', image, image.name)
    );
    console.log(this.form.value);
    Object.entries(this.form.value).forEach(
      //@ts-ignore
      ([key, value]: [key: string, value: string | number]) =>
        payload.append(key, `${value}`)
    );

    this.houseService
      .createHouse(payload)
      .subscribe((data: any) => console.log(data));
  }
}

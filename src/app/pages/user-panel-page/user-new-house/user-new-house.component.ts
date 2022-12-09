import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HouseService } from '../../../services/house.service';
import { UserStorage } from '../../../enums/enum';

@Component({
  selector: 'app-user-new-house',
  templateUrl: './user-new-house.component.html',
  styleUrls: ['./user-new-house.component.scss'],
})
export class UserNewHouseComponent {
  images: File[] = [];
  arrayOfImages = { photo: [] };
  form!: FormGroup;
  constructor(private fb: FormBuilder, private houseService: HouseService) {
    this.form = fb.group({
      owner: window.sessionStorage.getItem(UserStorage.USER_KEY),
      country: ['', Validators.compose([Validators.required])],
      province: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      street: ['', Validators.compose([Validators.required])],
      houseNr: ['', Validators.compose([Validators.required])],
      yearBuilt: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      dimension: ['', Validators.compose([Validators.required])],
      floorsInBuilding: ['', Validators.compose([Validators.required])],
      floor: ['', Validators.compose([Validators.required])],
      roomsNumber: ['', Validators.compose([Validators.required])],
      bathroomNumber: ['', Validators.compose([Validators.required])],
      otherFeatures: [[], Validators.compose([Validators.required])],
      descriptionField: ['', Validators.compose([Validators.required])],
    });
  }

  addImages(rawImages: EventTarget | null) {
    if (rawImages !== null) {
      //@ts-ignore
      this.images = Array.from(rawImages.files);

      //@ts-ignore
      let files = rawImages.files;
      let file;
      for (let i = 0; i < files.length; i++) {
        let reader = new FileReader();
        file = files[i];
        reader.onload = (file) => {
          //@ts-ignore
          this.arrayOfImages.photo[i] = reader.result;
        };
        reader.readAsDataURL(file);
      }
    }

    console.log(this.arrayOfImages);
  }

  submit(event: any) {
    let payload = new FormData();

    this.images.forEach((image: File) =>
      payload.append('images', image, image.name)
    );

    Object.entries(event.value).forEach(
      //@ts-ignore
      ([key, value]: [key: string, value: string | Blob]) => {
        payload.append(key, value);
      }
    );

    this.houseService.createHouse(payload).subscribe();
  }
}

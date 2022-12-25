import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HouseService } from '../../../services/house.service';
import { UserStorage } from '../../../enums/enum';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-user-new-house',
  templateUrl: './user-new-house.component.html',
  styleUrls: ['./user-new-house.component.scss'],
})
export class UserNewHouseComponent {
  protected arrayOfImages = { photo: [] };
  arrayOfFacilities: string[] = [
    'Garaż',
    'Ogród',
    'Balkon',
    'Piwnica',
    'Basen',
    'Sauna',
    'Alarm',
    'rolety antywłamaniowe',
    'drzwi / okna antywłamaniowe',
    'domofon / wideofon',
    'monitoring / ochrona',
    'Ogrodzenie',
    'Ogrzewanie gazowe',
    'Fotowoltaika',
    'Pompa cipła',
    'Oczyszczalnia',
    'Kostka brukowa',
    'Strych',
    'Klimatyzacja',
    'Umeblowanie',
  ];

  form!: FormGroup;
  private images: File[] = [];

  constructor(
    private fb: FormBuilder,
    private houseService: HouseService,
    private _toastService: ToastService
  ) {
    this.form = this.initForm();
    this.form.markAllAsTouched();

    this.arrayOfFacilities.forEach((name: string) =>
      this.getOtherFeatures.push(this.initOtherFacilitiesForm(name))
    );
  }

  get getOtherFeatures() {
    return this.form.get('otherFeatures') as FormArray;
  }

  protected addImages(rawImages: EventTarget | null) {
    //@ts-ignore
    if (rawImages.files !== null) {
      //@ts-ignore
      this.images = Array.from(rawImages.files).slice(0, 4);

      //@ts-ignore
      let files = rawImages.files;
      let file;

      for (
        let i = 0;
        //@ts-ignore
        i < (rawImages.files.length > 3 ? 4 : rawImages.files.length);
        i++
      ) {
        let reader = new FileReader();
        file = files[i];
        reader.onload = () => {
          //@ts-ignore
          this.arrayOfImages.photo[i] = reader.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  protected initOtherFacilitiesForm(name: string) {
    return this.fb.group({
      name: name,
      checked: false,
    });
  }

  protected submit(event: any) {
    let payload = new FormData();

    this.images.forEach((image: File) =>
      payload.append('images', image, image.name)
    );

    Object.entries(event.value).forEach(
      //@ts-ignore
      ([key, value]: [key: string, value: string | Blob]) => {
        if (key !== 'otherFeatures') {
          payload.append(key, value);
        }
      }
    );

    this.getOtherFeatures.controls
      .filter((control: AbstractControl) => control.value.checked === true)
      .forEach((control: AbstractControl) => {
        if (!control.value.name) {
          return payload.append('otherFeatures', '');
        }
        return payload.append('otherFeatures', control.value.name);
      });

    this.houseService.createHouse(payload).subscribe({
      next: () => {
        this.form.reset();
        this._toastService.success('Pomyślnie dodano nowy dom.');
        this.form
          .get('owner')
          ?.setValue(window.sessionStorage.getItem(UserStorage.USER_KEY));
      },
      error: () => {
        this._toastService.error('Sprawdz poprawność formularza!');
      },
    });
  }

  private initForm(): FormGroup {
    return this.fb.nonNullable.group({
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
      otherFeatures: this.fb.array([]),
      descriptionField: ['', Validators.compose([Validators.required])],
    });
  }
}

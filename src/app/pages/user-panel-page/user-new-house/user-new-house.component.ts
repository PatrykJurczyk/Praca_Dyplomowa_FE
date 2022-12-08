import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-new-house',
  templateUrl: './user-new-house.component.html',
  styleUrls: ['./user-new-house.component.scss'],
})
export class UserNewHouseComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = fb.group({
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
    });
  }

  images(img: any){
    const file: FileList = img.files;
    const images: File[] = Array.from(file)

    const formData: FormData = new FormData();
    images.forEach((image) => formData.append('images', image));

    console.log(this.form.value)
    //@ts-ignore
    Object.entries(this.form.value).forEach(([key, value]: [key: any, value: string | number | null]) =>
      formData.append(key, `${value}`)
    );

    console.log(formData)
  }

  ngOnInit(): void {}
  submit(event: any) {
    console.log(event.value);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainServiceService } from '../main-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pharma-add-item',
  templateUrl: './pharma-add-item.component.html',
  styleUrls: ['./pharma-add-item.component.css'],
})
export class PharmaAddItemComponent implements OnInit {
  constructor(
    private mainService: MainServiceService,
    private _snackBar: MatSnackBar
  ) {}
  newItemForm = new FormGroup({
    item_name: new FormControl(null, Validators.required),
    company: new FormControl(null, Validators.required),
    gst: new FormControl(null, Validators.required),
    category_needed: new FormControl(null, Validators.required),
    initial_stock: new FormControl(null, Validators.required),
    HSN: new FormControl(null, Validators.required),
  });
  medicineOptions: any[] = [];
  ngOnInit(): void {}
  onSubmit() {
    this.mainService.addMedicine(this.newItemForm.value).then(() => {
      this._snackBar.open('Medicine Saved', 'Close');
    });
  }
  medicineName(val: string) {
    this.mainService.getMedicine(val).then((data: any) => {
      this.medicineOptions = data;
    });
  }
}

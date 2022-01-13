import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainServiceService } from '../main-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pharma-purchase',
  templateUrl: './pharma-purchase.component.html',
  styleUrls: ['./pharma-purchase.component.css'],
})
export class PharmaPurchaseComponent implements OnInit, OnDestroy {
  constructor(
    private mainService: MainServiceService,
    private _snackBar: MatSnackBar
  ) {}
  medicineList: any[] = [];
  partyOptions: any[] = [];
  medicineOption: any[] = [];
  partyId = '';
  newItemForm = new FormGroup({
    party_name: new FormControl(null, Validators.required),
    setOne: new FormGroup({
      item_name: new FormControl(null, Validators.required),
      item_id: new FormControl(null),
      gst: new FormControl(null, Validators.required),
      packing: new FormControl(null, Validators.required),
      quantity_a: new FormControl(null, Validators.required),
      quantity_b: new FormControl(null, Validators.required),
      unit: new FormControl(null, Validators.required),
      rate: new FormControl(null, Validators.required),
      mrp: new FormControl(null, Validators.required),
      batch_no: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      expiry_date: new FormControl(null, Validators.required),
      company: new FormControl(null, Validators.required),
      discount: new FormControl(null, Validators.required),
    }),
    discount_total: new FormControl(null, Validators.required),
    grand_total: new FormControl(null, Validators.required),
    sub_total: new FormControl(null, Validators.required),
    total_gst: new FormControl(null, Validators.required),
  });
  ngOnInit() {}
  onSubmit() {
    let obj = {
      batches: this.medicineList,
      discount: this.newItemForm.value.discount_total,
      total: this.newItemForm.value.grand_total,
      partyId: this.partyId,
      date: new Date(),
    };
    console.log(obj);

    this.mainService.pharmaPurchase(obj).then(() => {
      this._snackBar.open('Purchase Saved', 'Close');
    });
  }
  getMedicine(val: string) {
    this.mainService.getMedicine(val).then((data: any) => {
      console.log(data);
      this.medicineOption = data;
    });
  }
  matchParty(val: string) {
    this.mainService.matchParty(val).then((data: any) => {
      console.log(data);
      this.partyOptions = data;
    });
  }
  onSelectParty(val: string) {
    console.log(val);
    this.partyId = val;
  }
  medicineSelect(val: any) {
    this.newItemForm.patchValue({
      setOne: {
        item_id: val._id,
        company: val.company,
      },
    });
  }
  addToSet() {
    let y = this.newItemForm.value.setOne;
    this.newItemForm.patchValue({
      setOne: {
        unit: (y.quantity_a + y.quantity_b) * y.packing,
      },
    });
    this.medicineList.push(this.newItemForm.value.setOne);
    console.log(y.gst);
    let sub_total = y.rate * y.quantity_a;
    let total_gst = (y.gst / 100) * sub_total;
    let grand_total = sub_total + total_gst;
    this.newItemForm.patchValue({
      sub_total: this.newItemForm.value.sub_total + sub_total,
      total_gst: this.newItemForm.value.total_gst + total_gst,
      grand_total: this.newItemForm.value.grand_total + grand_total,
    });
  }
  removeItem(i: number) {
    this.medicineList.splice(i, 1);
  }
  calcDiscount(val: any) {
    console.log(val);
    this.newItemForm.patchValue({
      grand_total:
        this.newItemForm.value.sub_total +
        this.newItemForm.value.total_gst -
        Number(val),
    });
  }
  ngOnDestroy() {}
}

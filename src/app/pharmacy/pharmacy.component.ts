import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainServiceService } from '../main-service.service';
import { SellMedicineSet } from '../models/sellMedicineSet';
@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css'],
})
export class PharmacyComponent implements OnInit {
  constructor(private mainService: MainServiceService) {}
  itemsSet: SellMedicineSet[] = [];
  medicineOption: any[] = [];
  patientList: any[] = [];
  public timer: any;
  gst = -1;
  customerId = '';
  patientRegNumber = '';
  newSellForm = new FormGroup({
    setOne: new FormGroup({
      item_name: new FormControl(null, Validators.required),
      gst: new FormControl(null),
      batch: new FormControl(null),
      exp: new FormControl(null),
      unit: new FormControl(null, Validators.required),
      mrp: new FormControl(null, Validators.required),
      packing: new FormControl(null),
      HSN: new FormControl(null),
    }),
    setTwo: new FormGroup({
      customername: new FormControl(null, Validators.required),
      discount: new FormControl(null, Validators.required),
      total: new FormControl(null, Validators.required),
      payment_option: new FormControl(null, Validators.required),
      grand_total: new FormControl(null, Validators.required),
    }),
  });
  ngOnInit(): void {}
  onSubmit() {
    let obj = this.newSellForm.value.setTwo;
    obj.patient_id = this.customerId;
    obj.patientRegNumber = this.patientRegNumber;
    let arr: {
      item_id: string;
      batch_id: string;
      quantity: number;
      amount: number;
    }[] = [];
    this.itemsSet.forEach((element) => {
      arr.push({
        item_id: element._id,
        batch_id: element.batch,
        quantity: element.unit,
        amount: element.unit * element.mrp,
      });
    });
    obj.items = arr;
    console.log(obj);
    this.mainService.pharmaSell(obj).then(() => {
      this.mainService.printPharmacy.next({
        array: this.itemsSet,
        obj: obj,
      });
      setTimeout(() => {
        window.print();
      }, 0);
    });
  }
  addNewSet() {
    this.itemsSet.push(this.newSellForm.value.setOne);
    console.log(this.newSellForm.value.setOne);
    this.settingValues();
  }
  onMedicineSelect(option: any, event: any) {
    if (event.isUserInput) {
      this.newSellForm.patchValue({
        setOne: {
          item_id: option.item_id._id,
          gst: option.gst,
          HSN: option.item_id.HSN,
          mrp: option.mrp,
          batch: option._id,
          packing: option.packing,
          exp: option.expiry_date,
        },
      });
    }
  }
  getMedicine(val: string) {
    clearTimeout(this.timer);
    this.medicineOption = [];
    this.timer = setTimeout(() => {
      this.mainService.matchMedicine(val).then((arr: any) => {
        console.log(arr);
        this.medicineOption = arr;
      });
    }, 500);
  }
  calculate_disc() {
    let long = this.newSellForm.value.setTwo;
    this.newSellForm.patchValue({
      setTwo: {
        grand_total: long.total - long.discount,
      },
    });
  }
  settingValues() {
    let long = this.newSellForm.value.setOne;
    this.newSellForm.patchValue({
      setTwo: {
        total:
          this.newSellForm.value.setTwo.total +
          long.unit * (long.mrp / long.packing),
      },
    });
  }
  removeItem(i: number) {
    this.itemsSet.splice(i, 1);
  }
  matchPatient(val: string) {
    this.mainService.matchPatient(val).then((data: any) => {
      this.patientList = data;
    });
  }
  onPatientSelect(option: any, event: any) {
    if (event.isUserInput) {
      this.customerId = option.patientId;
      this.patientRegNumber = option.registration_no;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { SellMedicineSet } from '../models/sellMedicineSet';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-pharma-sell-print',
  templateUrl: './pharma-sell-print.component.html',
  styleUrls: ['./pharma-sell-print.component.css'],
})
export class PharmaSellPrintComponent implements OnInit {
  constructor(private mainService: MainServiceService) {}
  itemsSet: SellMedicineSet[] = [];
  d = new Date();
  gstNumber = '';
  date = `${this.d.getDate()}/${this.d.getMonth() + 1}/${this.d.getFullYear()}`;
  obj = {
    customername: '',
    discount: '',
    total: '',
    payment_option: '',
    grand_total: '',
    customerId: '',
    patientRegNumber: '',
  };
  ngOnInit() {
    this.mainService.printPharmacy.subscribe((data) => {
      this.itemsSet = data.array;
      this.obj = data.obj;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainServiceService } from '../main-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pharma-add-party',
  templateUrl: './pharma-add-party.component.html',
  styleUrls: ['./pharma-add-party.component.css'],
})
export class PharmaAddPartyComponent implements OnInit {
  constructor(
    private mainService: MainServiceService,
    private _snackBar: MatSnackBar
  ) {}
  newItemForm = new FormGroup({
    party_name: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    gst_no: new FormControl(null, Validators.required),
    ifsc_code: new FormControl(null, Validators.required),
    account_no: new FormControl(null, Validators.required),
  });
  newcompany = new FormGroup({
    name: new FormControl(null, Validators.required),
    // phone: new FormControl(null, Validators.required),
  });
  myControl = new FormControl();
  companyOptions: any[] = [];
  ngOnInit(): void {}
  onSubmit() {
    this.mainService.addParty(this.newItemForm.value).then(() => {
      this._snackBar.open('Party Saved', 'Close');
    });
  }
  newCompany(val: string) {
    let obj = {
      name: val,
      detail: 'lkjh',
    };
    this.mainService.newCompany(obj).then(() => {
      this._snackBar.open('Company Saved', 'Close');
    });
  }
  companyName(val: string) {
    this.mainService.matchParty(val).then((data: any) => {
      this.companyOptions = data;
    });
  }
  onCompanySelect(option: any, event: any) {
    if (event.isUserInput) {
      this.newItemForm.patchValue({
        company: option.name,
      });
    }
  }
}

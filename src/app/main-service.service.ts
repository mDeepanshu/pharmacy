import { Injectable } from '@angular/core';
import { ResponseType } from './models/responseType';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ErrMsgModuleComponent } from './err-msg-module/err-msg-module.component';
import { MatDialog } from '@angular/material/dialog';
import { NavbarArray } from './models/narBar';
import { NewMedicine } from './models/newMedicine';
import { NewParty } from './models/newParty';
import { PharmaPurchase } from './models/pharmaPurchase';
import { PharmaSell } from './models/pharmaSell';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MainServiceService {
  private url: string = 'http://192.168.1.7:3000';
  localWorking: string = 'http://localhost:3000';
  localNotWorking: string = 'https://hospital-hoshangabad.herokuapp.com';
  login = new Subject<boolean>();
  navBarFor = 0;
  printPharmacy = new Subject<any>();
  printOpd = new Subject<any>();
  constructor(private http: HttpClient, public dialog: MatDialog) {}
  makeLogin(pin: String) {
    return new Promise((response, reject) => {
      this.http
        .get<ResponseType>(`${this.url}/authorize?pin=${pin}`)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  checkForErr(statusCode: Number, message: String) {
    if (statusCode != 200) {
      this.dialog.open(ErrMsgModuleComponent, { data: message });
      return true;
    } else {
      return false;
    }
  }
  addPatient(obj: any) {
    return new Promise((response, reject) => {
      this.http
        .post<ResponseType>(`${this.url}/patient/new`, obj)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  addMedicine(obj: NewMedicine) {
    return new Promise((response, reject) => {
      this.http
        .post<ResponseType>(
          `${this.url}/pharmacy/item/new
        `,
          obj
        )
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  addParty(obj: NewParty) {
    return new Promise((response, reject) => {
      this.http
        .post<ResponseType>(`${this.url}/pharmacy/party/new`, obj)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  pharmaSell(obj: PharmaSell) {
    return new Promise((response, reject) => {
      this.http
        .post<ResponseType>(`${this.url}/pharmacy/sale/new`, obj)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  pharmaPurchase(obj: any) {
    return new Promise((response, reject) => {
      this.http
        .post<ResponseType>(`${this.url}/pharmacy/purchase/new`, obj)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  getMedicine(val: string) {
    return new Promise((response, reject) => {
      this.http
        .get<ResponseType>(
          `${this.url}/pharmacy/item/match?type=item_name&value=${val}&limit=3`
        )
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  matchParty(name: string) {
    return new Promise((response, reject) => {
      this.http
        .get<ResponseType>(
          `${this.url}/pharmacy/party/match?type=party_name&value=${name}&limit=3`
        )
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  matchMedicine(item_name: string) {
    return new Promise((response, reject) => {
      this.http
        .get<ResponseType>(
          `${this.url}/pharmacy/batch/match?value=${item_name}&limit=3`
        )
        .pipe(
          map((resData: any) => {
            console.log('resData.message', resData.message);
            for (let index = 0; index < resData.message.length; index++) {
              let date = new Date(resData.message[index].expiry_date);
              resData.message[index].expiry_date = `${date.getDate()}/${
                date.getMonth() + 1
              }/${date.getFullYear()}`;
            }
            return resData;
          })
        )
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  newCompany(obj: any) {
    return new Promise((response, reject) => {
      this.http
        .post<ResponseType>(`${this.url}/pharmacy/company/new`, obj)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  matchPatient(name: string) {
    return new Promise((response, reject) => {
      this.http
        .get<ResponseType>(
          `${this.url}/patient/match?type=first_name&value=${name}&limit=20`
        )
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
}

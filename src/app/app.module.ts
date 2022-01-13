import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PharmaPurchaseComponent } from './pharma-purchase/pharma-purchase.component';
import { PharmaAddPartyComponent } from './pharma-add-party/pharma-add-party.component';
import { PharmaAddItemComponent } from './pharma-add-item/pharma-add-item.component';
import { PharmaSellPrintComponent } from './pharma-sell-print/pharma-sell-print.component';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { Routes, RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { ErrMsgModuleComponent } from './err-msg-module/err-msg-module.component';

//
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
//
const routes: Routes = [
  { path: '', component: PharmacyComponent },
  { path: 'pharmaPurchase', component: PharmaPurchaseComponent },
  { path: 'addPharmaParty', component: PharmaAddPartyComponent },
  { path: 'pharmaAddItem', component: PharmaAddItemComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PharmacyComponent,
    PharmaPurchaseComponent,
    PharmaAddPartyComponent,
    PharmaAddItemComponent,
    PharmaSellPrintComponent,
    ErrMsgModuleComponent,
    NavBarComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatSnackBarModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NoopAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    MatDialogModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}

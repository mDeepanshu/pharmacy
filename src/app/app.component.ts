import { Component, OnInit } from '@angular/core';
import { MainServiceService } from './main-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'hospital';
  login = true;

  constructor(private mainService: MainServiceService) {}

  ngOnInit() {
    this.mainService.login.subscribe((val) => {
      this.login = val;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-account-registration',
  templateUrl: './account-registration.component.html',
  styleUrls: ['./account-registration.component.css']
})
export class AccountRegistrationComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}

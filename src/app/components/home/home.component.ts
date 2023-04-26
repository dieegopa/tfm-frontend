import {Component, OnInit} from '@angular/core';
import {faExclamationCircle, faMap, faRetweet, faUserPlus} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faExclamationCircle = faExclamationCircle;
  faMap = faMap;
  faRetweet = faRetweet;
  faUserPlus = faUserPlus;

  constructor() {
  }

  ngOnInit(): void {
  }

}

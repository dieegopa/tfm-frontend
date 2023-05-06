import {Component, OnInit} from '@angular/core';
import {UserService} from "../../data/services/user.service";
import {Router} from "@angular/router";
import {UniversityService} from "../../data/services/university.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private universityService: UniversityService,
  ) {
  }

  ngOnInit(): void {
  }

}

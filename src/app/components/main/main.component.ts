import {Component, OnInit} from '@angular/core';
import {UserService} from "../../data/services/user.service";
import {Router} from "@angular/router";
import {ExampleService} from "../../data/services/example.service";
import {Loading} from 'notiflix/build/notiflix-loading-aio';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private exampleService: ExampleService,
  ) {
  }

  ngOnInit(): void {
    Loading.pulse();
    setTimeout(() => {
      try {
        this.exampleService.accessDashboard().subscribe(
          r => {
            console.log(r);
          }
        );
      } catch (e) {
      }

      Loading.remove();
    }, 1000);
  }

}

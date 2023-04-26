import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {faBuilding} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-university-details',
  templateUrl: './university-details.component.html',
  styleUrls: ['./university-details.component.css']
})
export class UniversityDetailsComponent implements OnInit {

  faBuilding = faBuilding;

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['slug']);
  }

}

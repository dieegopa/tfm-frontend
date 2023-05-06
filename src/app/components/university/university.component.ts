import {Component, OnInit} from '@angular/core';
import {faBuilding} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup} from "@angular/forms";
import {University} from "../../shared/models/university.model";
import {UniversityService} from "../../data/services/university.service";
import {Loading} from "notiflix/build/notiflix-loading-aio";

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent implements OnInit {

  faBuilding = faBuilding;
  formSearch: FormGroup;
  search = new FormControl('', []);
  searchInput: string = '';

  universities: University[] = [];

  constructor(
    private universityService: UniversityService,
  ) {
    this.formSearch = new FormGroup({
      search: this.search,
    })
  }

  ngOnInit(): void {
    Loading.pulse('', {
      backgroundColor: 'rgba(0,0,0,0.3)',
      svgColor: '#1F2937',
    });
    setTimeout(() => {
      try {
        this.setUniversities();
      } catch (e) {
      }

      Loading.remove();
    }, 1000);
  }

  onSubmit() {
    if (this.searchInput.trim() == '') {
      this.setUniversities();
    } else {
      this.setUniversity(this.searchInput);
    }
  }

  resetSearch() {
    this.searchInput = '';
    this.setUniversities();
  }

  setUniversities() {
    this.universities = [];
    this.universityService.getUniversities()
      .subscribe(data => {
        data?.map((university: University) => {
          this.universities.push(
            new University(university.id, university.name, university.image_url, university.slug, university.degrees, university.users)
          )
        })
      });
  }

  setUniversity(query: string) {
    this.universities = [];
    this.universityService.getFilteredUniversity(query)
      .subscribe(data => {
        data?.map((university: University) => {
          this.universities.push(university)
        })
      });
  }

}

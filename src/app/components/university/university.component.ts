import {Component, OnInit} from '@angular/core';
import {faBuilding} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup} from "@angular/forms";
import {Notify} from "notiflix/build/notiflix-notify-aio";
import {Router} from "@angular/router";

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

  constructor(private router: Router) {
    this.formSearch = new FormGroup({
      search: this.search,
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.searchInput.trim() != '') {
      this.router.navigate(['/main'], {queryParams: {q: this.searchInput}});
    } else {
      Notify.failure('Ingresa un valor para buscar', {
        position: 'center-top',
        distance: '4px',
        failure: {
          background: '#B91C1B',
          notiflixIconColor: '#ffffff',
        },
      });
    }
  }

}

import {Component, OnInit} from '@angular/core';
import {faBuilding} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {University} from "../../shared/models/university.model";

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
  universities: University[] = [
    new University(1, 'Universidad de Almería', 'https://cofradiadeestudiantes.com/wp-content/uploads/2019/03/05-Logotipo-Vertical.png', 'universidad-de-almeria', [], []),
    new University(2, 'Universidad de Cádiz', 'https://1000marcas.net/wp-content/uploads/2019/12/UCA.jpg', 'universidad-de-cadiz', [], []),
    new University(3, 'Universidad de Córdoba', 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Logounicordoba.svg', 'universidad-de-cordoba', [], []),
    new University(4, 'Universidad de Granada', 'https://canal.ugr.es/wp-content/uploads/2017/07/logo-UGR-color-vertical.jpg', 'universidad-de-granada', [], []),
    new University(6, 'Universidad Politécnica de Madrid', 'https://www.upm.es/sfs/Rectorado/Gabinete%20del%20Rector/Logos/UPM/Logotipo/LOGOTIPO%202%20tintas%20PNG.png', 'universidad-politecnica-madrid', [], []),
  ];

  universitiesFiltered: University[] = [];

  constructor(private router: Router) {
    this.formSearch = new FormGroup({
      search: this.search,
    })
  }

  ngOnInit(): void {
    this.universitiesFiltered = [...this.universities];
  }

  onSubmit() {
    if (this.searchInput.trim() == '') {
      this.universitiesFiltered = [...this.universities];
    } else {
      this.universitiesFiltered = this.universities.filter((university) => {
        return university.name.toLowerCase().includes(this.searchInput.toLowerCase());
      });
    }
  }

  resetSearch() {
    this.searchInput = '';
    this.universitiesFiltered = [...this.universities];
  }

}

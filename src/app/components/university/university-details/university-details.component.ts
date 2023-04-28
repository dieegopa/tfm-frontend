import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {University} from "../../../shared/models/university.model";
import {Degree} from "../../../shared/models/degree.model";
import {UserService} from "../../../data/services/user.service";

@Component({
  selector: 'app-university-details',
  templateUrl: './university-details.component.html',
  styleUrls: ['./university-details.component.css']
})
export class UniversityDetailsComponent implements OnInit {

  degrees: Degree[] = [
    new Degree(1, 'Grado en Ingeniería Informática1', 'grado-en-ingenieria-informatica1', 'Escuela Técnica Superior de Ingeniería de Sistemas Informáticos', null, [], []),
    new Degree(2, 'Grado en Ingeniería Informática2', 'grado-en-ingenieria-informatica2', 'Escuela Técnica Superior de Ingeniería de Sistemas Informáticos', null, [], []),
    new Degree(3, 'Grado en Ingeniería Informática3', 'grado-en-ingenieria-informatica3', 'Escuela Técnica Superior de Ingeniería de Sistemas Informáticos', null, [], []),
    new Degree(4, 'Grado en Ingeniería Informática4', 'grado-en-ingenieria-informatica4', 'Escuela Técnica Superior de Ingeniería de Sistemas Informáticos', null, [], []),
  ];
  universities: University[] = [
    new University(1, 'Universidad de Almería', 'https://cofradiadeestudiantes.com/wp-content/uploads/2019/03/05-Logotipo-Vertical.png', 'universidad-de-almeria', [], []),
    new University(2, 'Universidad de Cádiz', 'https://1000marcas.net/wp-content/uploads/2019/12/UCA.jpg', 'universidad-de-cadiz', [], []),
    new University(3, 'Universidad de Córdoba', 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Logounicordoba.svg', 'universidad-de-cordoba', [], []),
    new University(4, 'Universidad de Granada', 'https://canal.ugr.es/wp-content/uploads/2017/07/logo-UGR-color-vertical.jpg', 'universidad-de-granada', [], []),
    new University(6, 'Universidad Politécnica de Madrid', 'https://www.upm.es/sfs/Rectorado/Gabinete%20del%20Rector/Logos/UPM/Logotipo/LOGOTIPO%202%20tintas%20PNG.png', 'universidad-politecnica-madrid', this.degrees, []),
  ];

  university: University;
  starName: string = 'star_border';
  favorite : boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) {

    this.university = this.universities.filter((university) => {
      return university.slug == this.route.snapshot.params['slug'];
    })[0];
  }

  ngOnInit(): void {
  }

  addFavorite() {
    if (!this.userService.isLogged()) {
      this.router.navigate(['/login']);
    }

    this.favorite = !this.favorite;

    this.starName = this.favorite ? 'star' : 'star_border';
  }

  return() {
    this.router.navigate(['/university']);
  }

  addFavoriteDegree() {
    if (!this.userService.isLogged()) {
      this.router.navigate(['/login']);
    }
  }


}

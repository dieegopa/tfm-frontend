import {Component, OnInit} from '@angular/core';
import {faTwitter, faInstagram, faYoutube} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faYoutube = faYoutube;


  constructor() {
  }

  ngOnInit(): void {
  }

}

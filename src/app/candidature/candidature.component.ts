import {Component, OnInit} from '@angular/core';
import {CandidatureService} from "../shared/candidature.service";

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit{


  candidatures!: any[]; // Remplacez 'any[]' par le type approprié pour les candidatures (peut-être une interface)

  constructor(private candidatureService: CandidatureService) { }

  ngOnInit() {
    // Récupérer les candidatures depuis le service
    this.candidatures = this.candidatureService.getCandidatures();
  }

}

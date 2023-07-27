import { Component } from '@angular/core';
import {JobOfferService} from "../shared/job-offer.service";

@Component({
  selector: 'app-jobs-confirmation',
  templateUrl: './jobs-confirmation.component.html',
  styleUrls: ['./jobs-confirmation.component.css']
})
export class JobsConfirmationComponent {

  offresFavorables: any[] = [];

  constructor(private offreEmploiService: JobOfferService) { }

  ngOnInit(): void {
    this.rechercherOffresFavorables();
  }

  rechercherOffresFavorables(): void {
    // Appelez le service pour récupérer les offres d'emploi avec un avis favorable pour l'utilisateur
    this.offresFavorables = this.offreEmploiService.getOffresFavorables();
  }
}

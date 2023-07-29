import { Component, ChangeDetectorRef } from '@angular/core';
import {JobOfferService} from "../shared/job-offer.service";

@Component({
  selector: 'app-jobs-offer',
  templateUrl: './jobs-offer.component.html',
  styleUrls: ['./jobs-offer.component.css']
})
export class JobsOfferComponent {


  titreDuPoste!: string;
  lieu!: string;
  // Ajoutez d'autres propriétés de filtre de recherche ici si nécessaire

  offres: any[] = [];

  constructor(private offreEmploiService: JobOfferService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Vous pouvez éventuellement charger toutes les offres d'emploi au chargement de la page ici
  }

  rechercherJobs(): void {
    // Appelez le service pour rechercher les offres d'emploi en fonction des filtres de recherche
    this.offres = this.offreEmploiService.rechercherOffres(this.titreDuPoste, this.lieu);
    this.cdr.detectChanges();
  }

  afficherDetails(offre: any): void {
    offre.afficherDetails = true;
    this.cdr.detectChanges();
  }

  reduireDetails(offre: any): void {
    offre.afficherDetails = false;
    this.cdr.detectChanges();
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ServiceApp } from '../../../services/serviceApp/service-app';
import { AppartementDTO } from '../../../interfaces/gestions/Appartement/AppartementDTO';
import { StatutAppartement } from '../../../interfaces/gestions/Appartement/StatutAppartement';
import { TypeAppartement } from '../../../interfaces/gestions/Appartement/TypeAppartement';
import { ServiceImage } from '../../../services/servicesImage/service-image';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  appartements: AppartementDTO[] = [];
  pagedAppartements: AppartementDTO[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;

  selectedAppartement?: AppartementDTO;

  StatutAppartement = StatutAppartement;
  TypeAppartement = TypeAppartement;

  constructor(private serviceApp: ServiceApp, private imageService:ServiceImage) {}

  ngOnInit(): void {
    this.serviceApp.getAllAppartementDto().subscribe({
      next: (data) => {
        this.appartements = data;
        this.totalPages = Math.ceil(this.appartements.length / this.pageSize);
        this.updatePagedAppartements();

        
    /**
     * preparer les images
     */
    this.prepareCardImage();
      },
      error: (err) => console.error('Erreur chargement appartements:', err)
    });

  }

  updatePagedAppartements() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedAppartements = this.appartements.slice(start, end);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedAppartements();
  }

  deleteAppartement(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet appartement ?')) {
      this.serviceApp.deleteAppartement(id).subscribe({
        next: () => {
          this.appartements = this.appartements.filter(a => a.id !== id);
          this.totalPages = Math.ceil(this.appartements.length / this.pageSize);
          if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
          this.updatePagedAppartements();
        },
        error: (err) => console.error('Erreur suppression appartement:', err)
      });
    }
  }

  openDetails(appart: AppartementDTO) {
    this.selectedAppartement = appart;
    
  }

  closeDetails() {
    this.selectedAppartement = undefined;
  }

  trackByAppartementId(index: number, item: AppartementDTO) {
    return item.id;
  }

  /**
   * Prepare la preview des images pour affichage
   */

  private prepareCardImage(): void{
      this.appartements.forEach(appart=> {
        (appart.images ?? []).forEach(img => {
          if(!img.previewUrl && img.nomFichier){
            img.previewUrl = this.imageService.getImageFileUrl(img.nomFichier);
            console.log(`Image URL préparée: ${img.previewUrl}`);
          }
        });
      });
  }


  // getImageUrl(img: any): string {
  //   // Si l’URL a déjà été préparée
  //   if (img?.previewUrl) return img.previewUrl;
  //   // Si le nom du fichier existe, génère l’URL
  //   if (img?.nomFichier) return this.imageService.getImageFileUrl(img.nomFichier);
  //   // Sinon, image par défaut
  //   return 'https://via.placeholder.com/400x200';
  // }

  getImageUrl(appart: AppartementDTO): string {
    return appart.images && appart.images.length > 0 
      ? appart.images[0].previewUrl 
      : 'https://via.placeholder.com/400x200';
  }


}

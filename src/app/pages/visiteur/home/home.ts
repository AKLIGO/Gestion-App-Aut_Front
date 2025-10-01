import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ServiceApp } from '../../../services/serviceApp/service-app';
import { AppartementCreate } from '../../../interfaces/gestions/Appartement/AppartementCreate';
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

  appartements: AppartementCreate[] = [];
  pagedAppartements: AppartementCreate[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;

  selectedAppartement?: AppartementCreate;

  StatutAppartement = StatutAppartement;
  TypeAppartement = TypeAppartement;

  constructor(private serviceApp: ServiceApp, private imageService:ServiceImage) {}

  ngOnInit(): void {
    this.serviceApp.getAllAppartement().subscribe({
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

  openDetails(appart: AppartementCreate) {
    this.selectedAppartement = appart;
  }

  closeDetails() {
    this.selectedAppartement = undefined;
  }

  trackByAppartementId(index: number, item: AppartementCreate) {
    return item.id;
  }

  /**
   * Prepare la preview des images pour affichage
   */

  private prepareCardImage(): void{
    this.appartements.forEach(appart => {
      const firstImage = (appart.images ?? [])[0];
      if(firstImage && !firstImage.previewUrl){
        if(firstImage.photo){
          const mine = firstImage.typeMime || 'image/jpeg';
          firstImage.previewUrl = `data:${mine};base64,${firstImage.photo}`;
        } else if(firstImage.id){
              this.imageService.getImageById(firstImage.id).subscribe({
                next:(blob:Blob)=>{
                  firstImage.previewUrl = this.imageService.createImageUrl(blob);
                },
                error:err => console.error('erreur recuperation image', err)
              });
        }
      }
    })
  }




}

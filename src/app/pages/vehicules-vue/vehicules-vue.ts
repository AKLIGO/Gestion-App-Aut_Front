import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehiculeService } from '../../services/serviceVehicule/VehiculeService';
import { VehiculeDTO } from '../../interfaces/gestions/Vehicules/VehiculeDTO';
import { Carburant } from '../../interfaces/gestions/Vehicules/Carburant';
import { StatutVehicule } from '../../interfaces/gestions/Vehicules/StatutVehicule';
import { TypeVehicule } from '../../interfaces/gestions/Vehicules/TypeVehicule';
import { ServiceImage } from '../../services/servicesImage/service-image';

@Component({
  selector: 'app-vehicules-vue',
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicules-vue.html',
  styleUrl: './vehicules-vue.css'
})
export class VehiculesVue implements OnInit {

  vehicules: VehiculeDTO[] = [];
  selectedVehicule?: VehiculeDTO;
  selectedImageIndex: number = 0;

  StatutVehicule = StatutVehicule;
  TypeVehicule = TypeVehicule;
  Carburant = Carburant;

    constructor(private vehiculeService: VehiculeService, private imageService: ServiceImage) {}

  ngOnInit(): void {
    this.loadVehicules();
  }

  loadVehicules() {
    this.vehiculeService.listVehiculesVue().subscribe({
      next: data => {
        this.vehicules = data;
        this.prepareImages();
        console.log('Véhicules reçus:', data);
      },
      error: err => console.error('Erreur chargement véhicules:', err)
    });
  }
    private prepareImages() {
    this.vehicules.forEach(v => {
      (v.images ?? []).forEach(img => {
        if (!img.previewUrl && img.nomFichier) {
          img.previewUrl = this.imageService.getImageFileUrl(img.nomFichier);
        }
      });
    });
  }

    getImageUrl(img: any): string {
    if (img?.previewUrl) return img.previewUrl;
    if (img?.nomFichier) return this.imageService.getImageFileUrl(img.nomFichier);
    return 'https://via.placeholder.com/400x200';
  }

    openDetails(vehicule: VehiculeDTO) {
    this.selectedVehicule = vehicule;
    this.selectedImageIndex = 0;
  }

  closeDetails() {
    this.selectedVehicule = undefined;
  }

    prevImage() {
    if (!this.selectedVehicule?.images?.length) return;
    const len = this.selectedVehicule.images.length;
    this.selectedImageIndex = (this.selectedImageIndex - 1 + len) % len;
  }

  nextImage() {
    if (!this.selectedVehicule?.images?.length) return;
    const len = this.selectedVehicule.images.length;
    this.selectedImageIndex = (this.selectedImageIndex + 1) % len;
  }

  trackByVehiculeId(index: number, item: VehiculeDTO) {
    return item.id;
  }
}

import { Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VehiculeDTO } from '../../interfaces/gestions/Vehicules/VehiculeDTO';
import { ServiceImage } from '../../services/servicesImage/service-image';
import { VehiculeService } from '../../services/serviceVehicule/VehiculeService';

@Pipe({ name: 'filePreview' })
export class FilePreviewPipe implements PipeTransform {
  transform(file: File | null): string | null {
    if (!file) return null;
    return URL.createObjectURL(file);
  }
}
@Component({
  selector: 'app-image-vehicule',
  standalone: true,
  imports: [FormsModule, CommonModule, FilePreviewPipe],
  templateUrl: './image-vehicule.html',
  styleUrls: ['./image-vehicule.css']
})
export class ImageVehicule implements OnInit {

  file: File | null = null;
  libelle: string = '';
  immatriculationVehicule: string = '';

  message: string = '';
  isSuccess: boolean = false;

  vehicules: VehiculeDTO[] = [];

  constructor(
    private imageService: ServiceImage,
    private vehiculeService: VehiculeService
  ) {}

  ngOnInit(): void {
    this.loadVehicules();
  }

  loadVehicules(): void {
    this.vehiculeService.listVehicules().subscribe({
      next: (data) => this.vehicules = data,
      error: (err) => {
        console.error('Erreur de chargement des véhicules', err);
        this.message = 'Impossible de charger les véhicules.';
        this.isSuccess = false;
      }
    });
  }

  onFileSelected(event: any): void {
    const selected = event.target.files?.[0];
    if (selected) {
      this.file = selected;
    }
  }

  uploadImage(): void {
    // Validation
    if (!this.file) {
      this.message = 'Veuillez sélectionner un fichier.';
      this.isSuccess = false;
      return;
    }
    if (!this.libelle.trim()) {
      this.message = 'Veuillez saisir un libellé.';
      this.isSuccess = false;
      return;
    }
    if (!this.immatriculationVehicule) {
      this.message = 'Veuillez sélectionner un véhicule.';
      this.isSuccess = false;
      return;
    }

    // Appel service
    this.imageService.uploadImageToVehicule(
       this.libelle,
      this.file,
      this.immatriculationVehicule
     
    ).subscribe({
      next: (response) => {
        this.message = 'Image ajoutée avec succès !';
        this.isSuccess = true;
        console.log('Upload réussi:', response);
        this.resetForm();
      },
      error: (err) => {
        this.message = err.error || 'Erreur lors de l\'upload de l\'image.';
        this.isSuccess = false;
        console.error('Erreur upload:', err);
      }
    });
  }

  resetForm(): void {
    this.file = null;
    this.libelle = '';
    this.immatriculationVehicule = '';
    // Réinitialiser le input type="file"
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }
}

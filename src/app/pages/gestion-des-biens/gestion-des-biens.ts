import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TypeAppartement } from '../../interfaces/gestions/Appartement/TypeAppartement';
import { StatutAppartement } from '../../interfaces/gestions/Appartement/StatutAppartement';
import { ServiceApp } from '../../services/serviceApp/service-app';
import { ServiceImm } from '../../services/servicesImm/service-imm';
import { ImmeubleCreate } from '../../interfaces/gestions/Immeuble/ImmeubleCreate';

@Component({
  selector: 'app-gestion-des-biens',
  templateUrl: './gestion-des-biens.html',
  styleUrls: ['./gestion-des-biens.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class GestionDesBiens implements OnInit {

  ajoutForm: FormGroup;
  selectedFiles: File[] = [];
  previewImages: string[] = [];
  appartementId?: number;
  existingImages: any[] = [];
  immeubleOptions: ImmeubleCreate[] = [];

  typeOptions = Object.values(TypeAppartement);
  statutOptions = Object.values(StatutAppartement);

  constructor(
    private fb: FormBuilder,
    private serviceApp: ServiceApp,
    private serviceImm: ServiceImm,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialisation du formulaire
    this.ajoutForm = this.fb.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      prix: [0, [Validators.required, Validators.min(1)]],
      numero: [0, Validators.required],
      superficie: ['', Validators.required],
      nbrDePieces: [0, Validators.required],
      description: [''],
      type: [null, Validators.required],   // TypeAppartement
      statut: [null, Validators.required], // StatutAppartement
      createdAt: [''],
      lastModifiedDate: [''],
      immeubleId: [null, Validators.required], // ID de l'immeuble sélectionné
      images: [[]] // tableau vide par défaut
    });
  }

  ngOnInit(): void {
    // Récupération des immeubles pour le select
    this.serviceImm.getAllImmeubles().subscribe({
      next: (res) => this.immeubleOptions = res,
      error: (err) => console.error('Erreur récupération immeubles :', err)
    });
  }

  submit() {
    if (this.ajoutForm.invalid) {
      console.warn('Formulaire invalide');
      return;
    }

    // Récupérer les valeurs du formulaire
    const formValue = this.ajoutForm.value;

    // Récupérer l'objet Immeuble correspondant à l'ID sélectionné

    const selectedImmeuble = this.immeubleOptions.find(i => i.id === Number(formValue.immeubleId));

    if (!selectedImmeuble) {
      alert('Veuillez sélectionner un immeuble valide');
      return;
    }

    // Construire l'objet à envoyer au backend
    const newAppartement = {
      ...formValue,
      immeuble: { id: selectedImmeuble.id } // relation ManyToOne
    };

    // Appel au service pour créer un appartement
    this.serviceApp.addAppartement(newAppartement).subscribe({
      next: (res) => {
        console.log('Appartement ajouté avec succès :', res);
        this.router.navigate(['/appartements']);
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout de l’appartement :', err);
        alert('Impossible d’ajouter l’appartement. Vérifiez la console pour plus de détails.');
      }
    });
  }
}

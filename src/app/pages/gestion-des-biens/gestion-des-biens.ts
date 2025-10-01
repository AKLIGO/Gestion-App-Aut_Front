import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceApp } from '../../services/serviceApp/service-app';
import { ServiceImm } from '../../services/servicesImm/service-imm';
import { ImmeubleCreate } from '../../interfaces/gestions/Immeuble/ImmeubleCreate';
import { TypeAppartement } from '../../interfaces/gestions/Appartement/TypeAppartement';
import { StatutAppartement } from '../../interfaces/gestions/Appartement/StatutAppartement';
import { AppartementCreate } from '../../interfaces/gestions/Appartement/AppartementCreate';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-des-biens',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './gestion-des-biens.html',
  styleUrls: ['./gestion-des-biens.css']
})
export class GestionDesBiens implements OnInit {

  ajoutForm: FormGroup;
  immeubleOptions: ImmeubleCreate[] = [];
  appartements: AppartementCreate[] = [];
  isEditMode = false;
  editingAppartementId?: number;

  typeOptions = Object.values(TypeAppartement);
  statutOptions = Object.values(StatutAppartement);

  constructor(
    private fb: FormBuilder,
    private serviceApp: ServiceApp,
    private serviceImm: ServiceImm,
    private router: Router
  ) {
    this.ajoutForm = this.fb.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      prix: [0, [Validators.required, Validators.min(1)]],
      numero: [0, Validators.required],
      superficie: ['', Validators.required],
      nbrDePieces: [0, Validators.required],
      description: [''],
      type: [null, Validators.required],
      statut: [null, Validators.required],
      immeubleId: [null, Validators.required]
    });
  }

  getImmeubleNom(app: AppartementCreate): string {
    const immeuble = this.immeubleOptions.find(i => i.id === app.immeubleId);
    return immeuble ? immeuble.nom : 'N/A';
  }

  ngOnInit(): void {
    this.loadImmeubles();
    this.loadAppartements();
  }

  loadImmeubles() {
    this.serviceImm.getAllImmeubles().subscribe({
      next: res => this.immeubleOptions = res,
      error: err => console.error('Erreur récupération immeubles :', err)
    });
  }

  loadAppartements() {
    this.serviceApp.getAllAppartement().subscribe({
      next: res => this.appartements = res,
      error: err => console.error('Erreur récupération appartements :', err)
    });
  }

  submit() {
    if (this.ajoutForm.invalid) return;

    const formValue = this.ajoutForm.value;
    const selectedImmeuble = this.immeubleOptions.find(i => i.id === Number(formValue.immeubleId));
    if (!selectedImmeuble) return alert('Veuillez sélectionner un immeuble valide');

    // payload correct pour le backend
    const payload: AppartementCreate = {
      ...formValue,
      immeubleId: selectedImmeuble.id
    };

    if (this.isEditMode && this.editingAppartementId) {
      this.serviceApp.updateAppartement(this.editingAppartementId, payload).subscribe({
        next: () => {
          this.loadAppartements();
          this.cancelEdit();
        },
        error: err => console.error('Erreur mise à jour appartement :', err)
      });
    } else {
      this.serviceApp.addAppartement(payload).subscribe({
        next: () => {
          this.loadAppartements();
          this.ajoutForm.reset();
        },
        error: err => console.error('Erreur ajout appartement :', err)
      });
    }
  }

  editAppartement(app: AppartementCreate) {
    this.isEditMode = true;
    this.editingAppartementId = app.id;
    this.ajoutForm.patchValue({
      nom: app.nom,
      adresse: app.adresse,
      prix: app.prix,
      numero: app.numero,
      superficie: app.superficie,
      nbrDePieces: app.nbrDePieces,
      description: app.description,
      type: app.type,
      statut: app.statut,
      immeubleId: app.immeubleId // correction ici
    });
  }

  cancelEdit() {
    this.isEditMode = false;
    this.editingAppartementId = undefined;
    this.ajoutForm.reset();
  }

  deleteAppartement(id: number) {
    if (!confirm('Voulez-vous vraiment supprimer cet appartement ?')) return;
    this.serviceApp.deleteAppartement(id).subscribe({
      next: () => this.loadAppartements(),
      error: err => console.error('Erreur suppression appartement :', err)
    });
  }
}

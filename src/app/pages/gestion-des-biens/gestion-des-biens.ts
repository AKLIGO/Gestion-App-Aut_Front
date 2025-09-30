import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TypeAppartement } from '../../interfaces/gestions/Appartement/TypeAppartement';
import { StatutAppartement } from '../../interfaces/gestions/Appartement/StatutAppartement';
import { ServiceApp } from '../../services/serviceApp/service-app';
import { ServiceImm } from '../../services/servicesImm/service-imm';
import { ImmeubleCreate } from '../../interfaces/gestions/Immeuble/ImmeubleCreate';
@Component({
  selector: 'app-gestion-des-biens',
  imports: [CommonModule,ReactiveFormsModule ],
  templateUrl: './gestion-des-biens.html',
  styleUrl: './gestion-des-biens.css'
})
export class GestionDesBiens implements OnInit{

  ajoutForm: FormGroup;
  selectedFiles: File[] = [];
  previewImages: string[] = [];
  appartementId?: number;
  existingImages: any[] = [];
  immeubleOptions:ImmeubleCreate[]=[];

  typeOptions = Object.values(TypeAppartement);
  statutOptions = Object.values(StatutAppartement);

  constructor(
    private fb: FormBuilder,
    private serviceApp: ServiceApp,
    private serviceImm:ServiceImm,
    private router: Router,
    private route: ActivatedRoute
  ){
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
      immeubleId: [null],
      images: [[]] // tableau vide par défaut
    })

  }

  ngOnInit():void{

    this.serviceImm.getAllImmeubles().subscribe({
      next: (res)=> this.immeubleOptions = res,
      error: (err) => console.error('erreur recuperation immeubles :', err)
    })

  }

  submit() {
    if(this.ajoutForm.invalid){
      console.warn('formulaire invalid')
      return;
    }// Récupérer les données du formulaire
    const newAppartement = this.ajoutForm.value;

     // Récupérer l'objet Immeuble correspondant à l'ID sélectionné

    // const selectedImmeuble = this.immeubleOptions.find(i => i.id === formValue.immeubleId);
    
     // Appel au service pour créer un appartement (JSON simple)
  this.serviceApp.addAppartement(newAppartement).subscribe({
    next: (res) => {
      console.log('Appartement ajouté avec succès :', res);
      // Rediriger vers la liste des appartements ou autre page
      this.router.navigate(['/appartements']);
    },
    error: (err) => {
      console.error('Erreur lors de l’ajout de l’appartement :', err);
      alert('Impossible d’ajouter l’appartement. Vérifiez la console pour plus de détails.');
    }
  })

    ;

    }

}

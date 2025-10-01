import { Component,OnInit } from '@angular/core';
import { ImmeubleCreate } from '../../interfaces/gestions/Immeuble/ImmeubleCreate';
import { TypeImmeuble } from '../../interfaces/gestions/Immeuble/TypeImmeuble ';
import { ServiceImm } from '../../services/servicesImm/service-imm';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-immeuble',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './immeuble.html',
  styleUrl: './immeuble.css'
})
export class Immeuble implements OnInit {

  immeubles:ImmeubleCreate[]=[];
  newImmeuble:Partial<ImmeubleCreate>={};

  editingImmeuble: ImmeubleCreate | null=null;
  isLoading = false;
  ngOnInit(): void {
    this.loadImmeubles();
  }

  /**
   * pour remplir le select
   */

  types= Object.values(TypeImmeuble);

  constructor(private immeubleService:ServiceImm){}

  /**
   * charger tous les immeubles
   */

  loadImmeubles():void {
    this.isLoading = true;
    this.immeubleService.getAllImmeubles().subscribe({
      next:(data)=> {
        this.immeubles = data;
        this.isLoading=false;
      },
      error: (err) => {
        console.error('erreur de chargement des immeubles', err);
        this.isLoading = false;
      }
    });
  }

  /**
   * Ajout
   */

  addImmeuble():void {
    if (!this.newImmeuble.nom || !this.newImmeuble.ville || !this.newImmeuble.type) {
      alert('Veuillez remplir les champs obligatoires.');
      return;
    }

    const immeubleToAdd: ImmeubleCreate={
      ...this.newImmeuble,
      id:0, //backend genera l'ID
      utilisateurId: 1, // à remplacer par l’utilisateur connecté
      nbrAppartment:this.newImmeuble.nbrAppartment ||0,
      nbrEtage: this.newImmeuble.nbrEtage || 0,
      description: this.newImmeuble.description || "",
      type: this.newImmeuble.type as TypeImmeuble,
    } as ImmeubleCreate;

    this.immeubleService.addImmeuble(immeubleToAdd).subscribe({
      next: (res)=> {
        this.immeubles.push(res);
        this.newImmeuble={};
      },
      error:(err)=>console.error('erreur ajout immeuble', err)
    });
  }

  /**
   * suppression
   */

  deleteImmeuble(id:number):void {
    if(confirm('voulez-vous vraiment supprimer cet immeuble ?')){
      this.immeubleService.deleteImmeuble(id).subscribe({
        next: ()=> {
          this.immeubles = this.immeubles.filter(i => i.id !==id);
        },
        error:(err) => console.error('Erreur suppression immeuble',err)
      });
    }
  }

  /**
   * preparer la modification
   */
  editImmeuble(immeuble:ImmeubleCreate): void {
    this.editingImmeuble={...immeuble};

  }
  /**
   * sauvegarde
   */

  updateImmeuble(): void {
    if (!this.editingImmeuble) return;
  
    this.immeubleService.updateImmeuble(this.editingImmeuble.id, this.editingImmeuble).subscribe({
      next: (res) => {
        const index = this.immeubles.findIndex(i => i.id === res.id);
        if (index !== -1) this.immeubles[index] = res;
        this.editingImmeuble = null;
      },
      error: (err) => console.error('Erreur update immeuble', err)
    });
  }

  // Annuler le modification

  cancelEdit():void {
    this.editingImmeuble=null;
  }

}

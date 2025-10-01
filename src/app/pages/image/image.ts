import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ServiceImage } from '../../services/servicesImage/service-image';

@Component({
  standalone: true,
  selector: 'app-image',
  imports: [FormsModule, CommonModule,ReactiveFormsModule ],
  templateUrl: './image.html',
  styleUrl: './image.css'
})
export class Image implements OnInit{
  libelle:string='';
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isUploading: boolean = false;
  dragOver: boolean = false;
  appartementId: number | null = null;

  constructor(
    private serviceImage:ServiceImage,
    private router:Router
  ){}

  ngOnInit():void{

  }

  // selection du fichier

  onFileSelected(event:any):void{

    const file=event.target.files[0];

    if(file){
      this.handleFileSelection(file);
    }

  }

  private handleFileSelection(file:File): void{
      this.selectedFile=file;
      this.createPreview(file);
  }



  //creation de l'appercu de l'image
  private createPreview(file:File):void{
    const reader = new FileReader();
    reader.onload=(e:any)=> {
      this.previewUrl=e.target.result;
    };

    reader.readAsDataURL(file);
  }

  //Upload de l'image

  uploadImage():void{
    if (!this.selectedFile) {
      console.warn("Aucun fichier sélectionné !");
      return;
    }
    this.isUploading=true;
    this.serviceImage.uploadImageWithAppartement(this.libelle, this.selectedFile,this.appartementId as number)
          .subscribe({
             next:(response)=>{
              this.router.navigate(['/appartement']);
             }
          })

  }

  /**
   * Reinitialisation du formulaire
   */

  private resetForm(): void{
    this.libelle='';
    this.selectedFile=null;
    this.previewUrl=null;
    this.isUploading=false;
    this.appartementId=null;
  }

  /**
   * Suppression de l'appercu
   */

  removePreview():void {
    this.selectedFile=null;
    this.previewUrl = null;
  }


  //gestion du drag et du drog

  onDragOver(event:DragEvent):void{
    event.preventDefault();
    event.stopPropagation();
    this.dragOver=true;
  }

  onDragLeave(event:DragEvent):void {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver=false;
  }

  onDrop(event:DragEvent):void{
    event.preventDefault();
    event.stopPropagation();
    this.dragOver= false;

    const files =event.dataTransfer?.files;
    if(files && files?.length > 0) {
      this.handleFileSelection(files[0]);
    }
  }


}

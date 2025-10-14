import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImagesCreate } from '../../interfaces/gestions/image/ImagesCreate';
@Injectable({
  providedIn: 'root'
})
export class ServiceImage {

  private apiUrl = 'http://localhost:8080/api/image';

  constructor(private http: HttpClient) {}

    /**
   * Upload image en liant à un appartement via son ID
   */
    uploadImageWithAppartement(libelle: string, file: File, appartementId: number): Observable<ImagesCreate> {
      const formData = new FormData();
      formData.append('libelle', libelle);
      formData.append('file', file);
      formData.append('appartementId', appartementId.toString());
  
      return this.http.post<ImagesCreate>(`${this.apiUrl}/ajoutImageApp`, formData);
    }

    uploadImageToVehicule(
    
    libelle: string,
    file: File,
    immatriculationVehicule: string,
  ): Observable<ImagesCreate | string> {

    const formData = new FormData();
    formData.append('libelle', libelle);
    formData.append('file', file);
    formData.append('immatriculationVehicule', immatriculationVehicule);

    return this.http.post<ImagesCreate | string>(`${this.apiUrl}/ajoutImageTovehicule`, formData);
  }

      //   //liste des images
      //   getAllImages():Observable<ImagesCreate[]>{
      //     return this.http.get<ImagesCreate[]>(this.apiUrl);
  
      // }

        /**
   * Upload image en liant à un appartement via son nom
   */
  uploadImageWithAppartementByName(libelle: string, file: File, appartementNom: string): Observable<ImagesCreate> {
    const formData = new FormData();
    formData.append('libelle', libelle);
    formData.append('file', file);
    formData.append('appartementNom', appartementNom);

    return this.http.post<ImagesCreate>(`${this.apiUrl}/ajoutImaAppNom`, formData);
  }

  /**
   * recuperer une image a partir de son identifiant
   */

  getImageById(id:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  /**
   * Recuperation du fichier physique
   */

  getImageFileUrl(fileName: string): string {
    return `${this.apiUrl}/file/${encodeURIComponent(fileName)}`;
  }

    // Récupérer toutes les images libres
  getAllImagesLibres(): Observable<ImagesCreate[]> {
    return this.http.get<ImagesCreate[]>(`${this.apiUrl}/libres`);
  }

    // Uploader une image libre
  uploadImageLibre(libelle: string, file: File): Observable<ImagesCreate> {
    const formData = new FormData();
    formData.append('libelle', libelle);
    formData.append('file', file, file.name);
    return this.http.post<ImagesCreate>(`${this.apiUrl}/upload`, formData);
  }

   //creer une url d'image
//    createImageUrl(blob:Blob):string{   
//     return URL.createObjectURL(blob);
// }

 listImagesVehicules(): Observable<ImagesCreate[]> {
    return this.http.get<ImagesCreate[]>(`${this.apiUrl}/vehicules`);
  }

  listImagesAppartements(): Observable<ImagesCreate[]> {
    return this.http.get<ImagesCreate[]>(`${this.apiUrl}/appartements`);
  }

  
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppartementCreate } from '../../interfaces/gestions/Appartement/AppartementCreate';
import { App } from '../../app';
import { StatutAppartement } from '../../interfaces/gestions/Appartement/StatutAppartement';
import { AppartementDTO } from '../../interfaces/gestions/Appartement/AppartementDTO';
@Injectable({
  providedIn: 'root'
})
export class ServiceApp {
 
  private apiUrl = 'http://localhost:8080/api/appartement';

  constructor(private http: HttpClient) { }

  /**
   * Recuperer tous les appartements
   */

  getAllAppartement(): Observable<AppartementCreate[]> {
    return this.http.get<AppartementCreate[]>(this.apiUrl);
  }

  /**
   * recupereer les appartement et les images associer
   */

  getAllAppartementDto():Observable<AppartementDTO[]>{
    return this.http.get<AppartementDTO[]>(`${this.apiUrl}/list`);
  }

  /**
   * recuperer un appartement a partir de son identifiant
   
   */
  
    getAppartementById(id:number):Observable<AppartementCreate> {
      return this.http.get<AppartementCreate>(`${this.apiUrl}/${id}`);
    }


    /**
     * ajout d'appartement
     */

      addAppartement(newAppartement:AppartementCreate): Observable<AppartementCreate>{
        return this.http.post<AppartementCreate>(this.apiUrl, newAppartement);
      }

      /**
       * Modifier un appartement
       */

      updateAppartement(id:number, updateAppart:AppartementCreate):Observable<AppartementCreate>{
        return this.http.put<AppartementCreate>(`${this.apiUrl}/${id}`, updateAppart);

      }

      /**
       * supprimer un appartement
       */

      deleteAppartement(id:number):Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
      }

      /**
       * changer le statut d'un appartement 
       */

      changerStatut(id:number, statut:StatutAppartement):Observable<AppartementCreate>{
        const params =new HttpParams().set('statut',statut);

        return this.http.patch<AppartementCreate>(`${this.apiUrl}/${id}/statut`,null,{params});
      }

      /**
       * verifier la disponibiliter d'un appartement
       */

      isDisponible(id:number):Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl}/${id}/disponible`);
      }

      // Créer un appartement (multipart/form-data)
    createWithForm(formData: FormData): Observable<AppartementCreate> {
    return this.http.post<AppartementCreate>(this.apiUrl, formData);
    }

     // Mettre à jour un appartement (multipart/form-data)
  updateWithForm(id: number, formData: FormData): Observable<AppartementCreate> {
    return this.http.put<AppartementCreate>(`${this.apiUrl}/${id}`, formData);
  }

}

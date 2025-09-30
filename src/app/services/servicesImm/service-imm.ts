import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImmeubleCreate } from '../../interfaces/gestions/Immeuble/ImmeubleCreate';
@Injectable({
  providedIn: 'root'
})
export class ServiceImm {

  private apiUrl = 'http://localhost:8080/api/immeubles';

  constructor(private http: HttpClient){};

  /**
   * Recuperer tous les immeubles
   */

  getAllImmeubles():Observable<ImmeubleCreate[]>{
    return this.http.get<ImmeubleCreate[]>(this.apiUrl);
  }

  // ajouter un nouvel immeuble

  addImmeuble(newImmeuble: ImmeubleCreate):Observable<ImmeubleCreate>{
    return this.http.post<ImmeubleCreate>(this.apiUrl,newImmeuble);
  }

  /**
   * suprimer un immeuble
   
   */
  
    deleteImmeuble(id:number):Observable<void>{
      return this.http.delete<void>(`${this.apiUrl}/${id}`);

    }

    /**
     * mettre a jour un immeuble
     */
    
    updateImmeuble(id:number, immeubleUpdate:ImmeubleCreate):Observable<ImmeubleCreate>{
      return this.http.put<ImmeubleCreate>(`${this.apiUrl}/${id}`,immeubleUpdate);
    }

    
}

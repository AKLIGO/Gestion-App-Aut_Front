import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModePaiement } from '../../interfaces/gestions/paiements/ModePaiement';
import { Paiement } from '../../pages/paiement/paiement';
import { PaiementDTO } from '../../interfaces/gestions/paiements/PaiementDTO';
@Injectable({
  providedIn: 'root'
})
export class ServicePaiement {

  private apiUrl = 'http://localhost:8080/api/paiement';
  constructor(private http: HttpClient) {   };

    // Effectuer un paiement pour une réservation spécifique
    effectuerPaiement(reservationId: number, montant: number, modePaiement: ModePaiement): Observable<Paiement> {
      const params = new HttpParams()
        .set('reservationId', reservationId.toString())
        .set('montant', montant.toString())
        .set('modePaiement', modePaiement); 
      return this.http.post<Paiement>(`${this.apiUrl}/ajouter`, null, { params });
    }

    // Récupérer tous les paiements
    getAllPaiements(): Observable<PaiementDTO[]> {
      return this.http.get<PaiementDTO[]>(`${this.apiUrl}/tous`);
    }

    // Récupérer un paiement par reservation
      getPaiementsByReservation(reservationId: number): Observable<PaiementDTO[]> {
            return this.http.get<PaiementDTO[]>(`${this.apiUrl}/reservation/${reservationId}`);
      }

}
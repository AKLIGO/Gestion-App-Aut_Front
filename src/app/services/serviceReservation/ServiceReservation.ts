import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationRequest } from '../../interfaces/gestions/Reservations/ReservationRequest';
import { Reservations } from '../../interfaces/gestions/Reservations/Reservations';
import { ReservationResponseDTO } from '../../interfaces/gestions/Reservations/ReservationResponseDTO';
import { ReservationRequestVehi } from '../../interfaces/gestions/Reservations/ReservationRequestVehi';  
@Injectable({
  providedIn: 'root'
})
export class ServiceReservation {
    private apiUrl = 'http://localhost:8080/api/reservations';
    private apiUrls = 'http://localhost:8080/api/reservations/vehicule';
    constructor(private http: HttpClient) { }

    // Créer une nouvelle réservation
    createreservation(request: ReservationRequest):Observable<Reservations>{
      return this.http.post<Reservations>(this.apiUrl, request);
    }

    // Mise a jour du Statut d'une réservation
    updateReservationStatus(id: number, statut: string): Observable<ReservationResponseDTO> {
    return this.http.put<ReservationResponseDTO>(`${this.apiUrl}/${id}/status?statut=${statut}`, {});
  }

    // Récupérer toutes les réservations d'un appartement
  getReservationsByAppartement(appartementId: number): Observable<ReservationResponseDTO[]> {
    return this.http.get<ReservationResponseDTO[]>(`${this.apiUrl}/appartement/${appartementId}`);
  }

    // Récupérer toutes les réservations
  getAllReservations(): Observable<ReservationResponseDTO[]> {
    return this.http.get<ReservationResponseDTO[]>(this.apiUrl);
  }
  /**
   * Supprimer une réservation par son ID
   * @param id ID de la réservation à supprimer
   */
  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * crrer la reservation d'un véhicule
   */
   
  createReservationVehi(request: ReservationRequestVehi): Observable<Reservations> {
    return this.http.post<Reservations>(this.apiUrls, request);
  }


}
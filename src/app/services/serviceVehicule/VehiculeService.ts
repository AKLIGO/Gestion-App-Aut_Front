import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehiculeDTO } from '../../interfaces/gestions/Vehicules/VehiculeDTO';
import { ImageDTOv } from '../../interfaces/gestions/image/ImageDTOv';
@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  private baseUrl = 'http://localhost:8080/api/vehicules'; // ton backend Spring

  constructor(private http: HttpClient) {}

  // Ajouter un véhicule
  addVehicule(vehicule: VehiculeDTO): Observable<VehiculeDTO> {
    return this.http.post<VehiculeDTO>(`${this.baseUrl}/ajouter`, vehicule);
  }

  // Mettre à jour un véhicule
  updateVehicule(id: number, vehicule: VehiculeDTO): Observable<VehiculeDTO> {
    return this.http.put<VehiculeDTO>(`${this.baseUrl}/modifier/${id}`, vehicule);
  }

  // Supprimer un véhicule
  removeVehicule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/supprimer/${id}`);
  }

  // Changer le statut d’un véhicule
  changerStatut(id: number, statut: string): Observable<VehiculeDTO> {
    return this.http.patch<VehiculeDTO>(`${this.baseUrl}/${id}/statut?statut=${statut}`, {});
  }

  // Lister tous les véhicules
  listVehicules(): Observable<VehiculeDTO[]> {
    return this.http.get<VehiculeDTO[]>(`${this.baseUrl}/list`);
  }

    // 1️⃣ Lister tous les véhicules
  listVehiculesVue(): Observable<VehiculeDTO[]> {
    return this.http.get<VehiculeDTO[]>(`${this.baseUrl}/lists`);
  }

  // Vérifier si un véhicule est disponible
  isDisponible(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/${id}/disponible`);
  }

  // Obtenir un véhicule par id
  getVehiculeById(id: number): Observable<VehiculeDTO> {
    return this.http.get<VehiculeDTO>(`${this.baseUrl}/${id}`);
  }

  // Obtenir les images associées à un véhicule
  getImagesVehicule(id: number): Observable<ImageDTOv[]> {
    return this.http.get<ImageDTOv[]>(`${this.baseUrl}/${id}/images`);
  }
}

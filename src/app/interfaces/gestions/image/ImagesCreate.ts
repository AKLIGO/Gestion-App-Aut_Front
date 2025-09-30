export interface ImagesCreate{
    id: number;
    libelle: string;
    photo?: string; 
    nomFichier?: string;
    typeMime?: string;
    appartementId?: number; 
    vehiculeId?: number;
}
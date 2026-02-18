export interface OffreModel {
    id: number;
    idoffre?: number; // Alias often used in legacy
    code?: string;

    // Display fields
    specialite: string;
    centre: string;
    diplome: string;

    // Dates
    debutformation: string;
    finformation?: string;

    // Details
    session?: string;
    nbplaces?: number;
    foyer?: string;
    hebergement?: string;
    bourse?: string;

    // Status
    etat?: string;
    etatnumerique?: number; // Template uses lowercase

    // Legacy / Alternative casing
    etatNumerique?: number;

    // Nested Offre Object (from History API)
    offre?: {
        id: number;
        specialite?: string;
        centre?: string;
        diplome?: string;
        debutformation?: string;
        finformation?: string;
        session?: string;
        hebergement?: string;
        bourse?: string;
        nbplaces?: number;
    };
}

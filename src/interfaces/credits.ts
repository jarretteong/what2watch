export interface Cast {
    adult: boolean;
    cast_id: number;
    character: string;
    credit_id: string;
    gender: boolean;
    id: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string;
}

export interface Crew {
  adult: boolean;
  cast_id?: number;
  character: string;
  credit_id: string;
  gender: boolean;
  id: number;
  job?: string;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[]; 
}
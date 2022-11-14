export interface APIStats <T=any> {
  loading: boolean;
  data: T | null;
  error?: string | null;
}

export interface Entity {
  id: string;
}
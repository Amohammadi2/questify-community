export interface APIStats <T=any> {
  loading: boolean;
  data: T | null;
  error?: string | null;
  getNext?: (section: string)=>void;
}

export interface Entity {
  id: string;
}
export interface APIStats <T=any> {
  loading: boolean;
  data: T | null;
  error?: string | null;
}
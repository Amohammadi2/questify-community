export interface APIStats <T=any> {
  loading: boolean;
  data: T;
  error?: string | null;
}
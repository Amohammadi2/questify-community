export type ApiResponse<CB> = CB extends () => Promise<infer Response> ? Response : any;

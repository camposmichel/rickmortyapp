export interface Info {
  count: number;
  pages: number;
  next: string;
  prev?: string;
}

export interface ApiResponse<T> {
  info: Info;
  results: T[];
}

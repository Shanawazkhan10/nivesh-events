export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  // Add other event properties
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

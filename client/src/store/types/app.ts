export interface IAlert {
  text: string;
  isError?: boolean;
}

export interface AppState {
  isLoading: boolean;
  alert: IAlert | null;
}

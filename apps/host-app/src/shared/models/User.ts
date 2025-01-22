export interface AuthResponse {
  message: string;
  result?: {
    token: string;
    username: string;
  };
}

export interface NovaContaDTO {
  username: string;
  email: string;
  password: string;
}

export type AxiosRespData = {
  message: string;
  result?: {
    username: string;
    email: string;
    password: string;
    id: string;
  };
};

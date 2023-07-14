export interface JwtUserPayload {
  id: string;
  email: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface JwtUserPayload {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

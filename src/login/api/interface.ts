export interface Login {
  phone: string | null;
  password: string | null;
}

export interface ValidRes {
  phone?: boolean;
  password?: boolean;
}

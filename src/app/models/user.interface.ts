export interface openModal {
  isOpen: boolean;
  type: 'login' | 'register' | 'changePassword' | '';
  isSingIn?: boolean;
}

export interface UserModel {
  _id: string;
  name?: string;
  email: string;
  password: string;
  passwordRepeat: string;
  phone?: string;
  avatar?: string;
  status?: number;
  favorites?: string[];
  token?: string;
  role?: string;
}

export interface errorMessage {
  message: string;
  status: string;
}

export interface openModal {
  isOpen: boolean;
  type: 'login' | 'register' | 'changePassword' | '';
  isSingIn?: boolean;
}

export interface UserModel {
  id: string;
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
  createdAt?: string;
}

export interface adminPage {
  user: boolean;
  manager: boolean;
  manageRoleUser: boolean;
}

export interface managerPage {
  type: 'toAccept' | 'accepted' | 'rejected';
}

export interface AccountCreator {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  avatar: string;
}

export interface BaseDto {
  id: string;
  createdAt?: Date | null;
  editedAt?: Date | null;
  creator?: AccountCreator | null;
  editor?: AccountCreator | null;
}

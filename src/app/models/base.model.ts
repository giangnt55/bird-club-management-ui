export interface AccountCreator {
  id: string;
  fullname: string;
  username: string;
  email: string;
  phone_number: string;
  avatar: string;
}

export interface BaseDto {
  id: string;
  created_at?: Date | null;
  edited_at?: Date | null;
  creator?: AccountCreator | null;
  editor?: AccountCreator | null;
}

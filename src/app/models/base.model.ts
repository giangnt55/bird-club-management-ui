export interface AccountCreator {
  id: string;
  fullname: string;
  email: string;
  phonenumber: string;
  avatar: string;
}

export interface BaseDto {
  id: string;
  created_at?: Date | null;
  edited_at?: Date | null;
  creator?: AccountCreator | null;
  editor?: AccountCreator | null;
}

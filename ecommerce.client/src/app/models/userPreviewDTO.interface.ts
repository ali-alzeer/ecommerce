import { Image } from './image.interface';

export interface UserPreviewDTO {
  id: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  createdOn: Date;
  updatedOn: Date;
  lastLoggingIn: Date;
  image: Image | null;
}

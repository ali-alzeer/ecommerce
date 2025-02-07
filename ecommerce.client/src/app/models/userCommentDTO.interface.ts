import { Image } from './image.interface';

export interface UserCommentDTO {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  createdOn: Date;
  updatedOn: Date;
  lastLoggingIn: Date;
  image: Image | null;
}

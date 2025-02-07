import { Comment } from './comment.interface';
import { Image } from './image.interface';

export interface ProductCart {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number | null;
  createdByUserId: number;
  createdOn: Date;
  comments: Comment[];
  images: Image[];
  categoryId: number;
  quantity: number;
}

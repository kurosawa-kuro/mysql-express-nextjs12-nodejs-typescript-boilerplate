export interface Profile {
  id: number;
  bio: string;
  profileImageUrl: string;
  userId: number;
  user: UserType;
}

export interface UserType {
  id: number;
  name: string;
  email: string;
}

export interface PostType {
  id: number;
  description: string;
  imagePath: string;
  user: UserType;
  createdAt: string;
}

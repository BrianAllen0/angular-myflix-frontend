export interface Movie {
  _id: string;
  Description: string;
  Director: {
    Name: string;
    Bio: string;
    Birthyear: number;
    Deathyear: number;
  };
  Featured: boolean;
  Genre: {
    Name: string;
    Description: string;
  };
  ImagePath: string;
  Released: string;
  Title: string;
}

export interface User {
  _id: string;
  Username: string;
  Password: string;
  Email: string;
  Birthday: string;
  FavoriteMovies: Movie[];
}

export interface GeneralResponse {
  message: string;
}

export interface UserLoginRequest {
  Username: string;
  Password: string;
}

export interface UserChangeRequest {
  Email: string;
  Password: string;
}

export interface UserRegRequest extends UserLoginRequest {
  Email: string;
  Birthday: string;
}

export interface UserLoginResponse {
  token: string;
  user: User;
}

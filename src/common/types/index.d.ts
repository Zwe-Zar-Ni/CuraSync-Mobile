export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
};

export type ApiError = {
  data: {
    message: string;
    data: [];
    errors: {
      string: string[];
    };
  };
};

export type UserProfile = {};

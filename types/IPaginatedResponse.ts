export type IPaginatedResponse<T> = IPagination & {
  content: T[];
};

export type IPagination = {
  pageNumber: number;
  last: boolean;
  size: number;
  totalPages: number;
  totalElements: number;
  message: string | null;
};

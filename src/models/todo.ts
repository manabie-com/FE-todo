export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ALL = 'ALL',
  CLEAR_ALL_TODOS = 'CLEAR_ALL_TODOS',
}

export interface Todo {
  id: string;
  user_id: string;
  content: string;
  status?: TodoStatus;
  created_date: string;
  isEdit?: boolean;
}

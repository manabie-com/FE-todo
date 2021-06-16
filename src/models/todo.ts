export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export enum ActionUpadte {
  UPDATE = 'UPDATE', 
  DISCARD = 'DISCARD'
}

export interface Todo {
  id: string
  user_id: string
  content : string
  status?: TodoStatus
  created_date: string
}
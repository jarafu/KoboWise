export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export enum Category {
  FOOD = 'Food',
  TRANSPORT = 'Transport',
  UTILITIES = 'Utilities',
  RENT = 'Rent',
  TRANSFERS = 'Transfers',
  SALARY = 'Salary',
  FREELANCE = 'Freelance',
  OTHER = 'Other'
}

export interface Transaction {
  id: string;
  amount: number;
  date: string; // ISO date string
  type: TransactionType;
  category: Category;
  description: string;
  isBankSynced?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  bankConnected: boolean;
}

export interface InsightData {
  summary: string;
  actionableTips: string[];
  lastUpdated: number;
}
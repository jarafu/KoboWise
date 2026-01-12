import { Transaction, TransactionType, Category } from './types';

export const APP_NAME = "KoboWise";
export const CURRENCY_SYMBOL = "₦";

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    amount: 350000,
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    type: TransactionType.INCOME,
    category: Category.SALARY,
    description: 'Monthly Salary - Zenith Bank',
    isBankSynced: true,
  },
  {
    id: '2',
    amount: 4500,
    date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    type: TransactionType.EXPENSE,
    category: Category.FOOD,
    description: 'Chicken Republic',
    isBankSynced: true,
  },
  {
    id: '3',
    amount: 15000,
    date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    type: TransactionType.EXPENSE,
    category: Category.UTILITIES,
    description: 'Ikeja Electric Token',
    isBankSynced: false,
  },
  {
    id: '4',
    amount: 50000,
    date: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
    type: TransactionType.EXPENSE,
    category: Category.RENT,
    description: 'Service Charge Savings',
    isBankSynced: true,
  },
  {
    id: '5',
    amount: 2500,
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    type: TransactionType.EXPENSE,
    category: Category.TRANSPORT,
    description: 'Uber Ride',
    isBankSynced: true,
  },
];

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);
};
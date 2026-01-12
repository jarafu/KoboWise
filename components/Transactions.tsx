import React, { useState } from 'react';
import { Transaction, TransactionType, Category } from '../types';
import { formatCurrency } from '../constants';
import { Plus, X, Check } from 'lucide-react';

interface TransactionsProps {
  transactions: Transaction[];
  onAdd: (t: Transaction) => void;
}

const Transactions: React.FC<TransactionsProps> = ({ transactions, onAdd }) => {
  const [isAdding, setIsAdding] = useState(false);
  
  // Form State
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>(Category.FOOD);
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      description,
      category,
      type,
      date: new Date().toISOString(),
      isBankSynced: false
    };

    onAdd(newTransaction);
    setIsAdding(false);
    // Reset
    setAmount('');
    setDescription('');
    setCategory(Category.FOOD);
  };

  if (isAdding) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Add Transaction</h2>
          <button onClick={() => setIsAdding(false)} className="bg-slate-100 p-2 rounded-full text-slate-500">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Type</label>
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-xl">
              <button 
                type="button"
                onClick={() => setType(TransactionType.EXPENSE)}
                className={`py-2 rounded-lg text-sm font-medium transition-all ${type === TransactionType.EXPENSE ? 'bg-white shadow text-red-500' : 'text-slate-400'}`}
              >
                Expense
              </button>
              <button 
                type="button"
                onClick={() => setType(TransactionType.INCOME)}
                className={`py-2 rounded-lg text-sm font-medium transition-all ${type === TransactionType.INCOME ? 'bg-white shadow text-green-600' : 'text-slate-400'}`}
              >
                Income
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Amount (₦)</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full text-3xl font-bold text-slate-900 placeholder:text-slate-200 border-b-2 border-slate-100 py-2 focus:outline-none focus:border-green-500 transition-colors"
              placeholder="0.00"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Description</label>
            <input 
              type="text" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-100"
              placeholder="What is this for?"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-100 appearance-none"
            >
              {Object.values(Category).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg mt-4 shadow-lg shadow-green-200 active:scale-[0.98] transition-all flex justify-center items-center gap-2"
          >
            <Check size={20} />
            Save Transaction
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="relative min-h-[500px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-800">History</h2>
        <div className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">{transactions.length} items</div>
      </div>

      <div className="space-y-3 pb-20">
        {transactions.map(t => (
          <div key={t.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                t.type === TransactionType.INCOME ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'
              }`}>
                {t.category.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-slate-800">{t.category}</p>
                <p className="text-xs text-slate-400">{t.date.split('T')[0]} • {t.description}</p>
              </div>
            </div>
            <span className={`font-semibold ${
              t.type === TransactionType.INCOME ? 'text-green-600' : 'text-slate-900'
            }`}>
              {t.type === TransactionType.INCOME ? '+' : '-'}{formatCurrency(t.amount)}
            </span>
          </div>
        ))}
      </div>

      <button 
        onClick={() => setIsAdding(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-slate-900 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform z-10"
      >
        <Plus size={28} />
      </button>
    </div>
  );
};

export default Transactions;
import React from 'react';
import { Transaction, TransactionType } from '../types';
import { formatCurrency, CURRENCY_SYMBOL } from '../constants';
import { Eye, EyeOff, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  transactions: Transaction[];
  onAddTransaction: () => void;
  onConnectBank: () => void;
  bankConnected: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, onAddTransaction, onConnectBank, bankConnected }) => {
  const [showBalance, setShowBalance] = React.useState(true);

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === TransactionType.INCOME)
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  const totalExpense = transactions
    .filter(t => t.type === TransactionType.EXPENSE)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  // Prepare chart data (cumulative balance over last 7 transactions for visual)
  const chartData = transactions
    .slice(0, 10)
    .reverse()
    .map((t, i) => ({
      name: i,
      amount: t.amount,
      type: t.type
    }));

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 text-white shadow-lg shadow-green-200">
        <div className="flex justify-between items-start mb-4">
          <span className="text-green-100 text-sm font-medium">Total Balance</span>
          <button onClick={() => setShowBalance(!showBalance)} className="text-green-100 hover:text-white">
            {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
        <div className="mb-6">
          <h2 className="text-3xl font-bold tracking-tight">
            {showBalance ? formatCurrency(balance) : `${CURRENCY_SYMBOL}****`}
          </h2>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/10 rounded-xl p-3 flex-1 backdrop-blur-sm">
            <div className="flex items-center gap-1 text-green-100 text-xs mb-1">
              <ArrowDownRight size={14} /> Income
            </div>
            <p className="font-semibold text-lg">{showBalance ? formatCurrency(totalIncome) : '****'}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 flex-1 backdrop-blur-sm">
            <div className="flex items-center gap-1 text-red-100 text-xs mb-1">
              <ArrowUpRight size={14} /> Spent
            </div>
            <p className="font-semibold text-lg">{showBalance ? formatCurrency(totalExpense) : '****'}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={onAddTransaction}
          className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center gap-2 text-green-700 font-semibold hover:bg-green-50 active:scale-95 transition-all"
        >
          <div className="bg-green-100 p-1.5 rounded-full">
            <Plus size={18} />
          </div>
          Add Cash
        </button>
        <button 
          onClick={onConnectBank}
          className={`p-4 rounded-2xl shadow-sm border flex items-center justify-center gap-2 font-semibold active:scale-95 transition-all ${
            bankConnected 
            ? 'bg-green-50 border-green-200 text-green-700' 
            : 'bg-slate-900 text-white border-slate-900'
          }`}
        >
          {bankConnected ? 'Bank Synced' : 'Connect Bank'}
        </button>
      </div>

      {/* Spending Trend (Mini Chart) */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="text-slate-800 font-semibold mb-4 text-sm">Spending Trend</h3>
        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip cursor={false} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorAmt)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions List Preview */}
      <div>
        <div className="flex justify-between items-center mb-3 px-1">
          <h3 className="text-slate-800 font-semibold">Recent</h3>
          <button className="text-green-600 text-xs font-semibold">View All</button>
        </div>
        <div className="space-y-3">
          {transactions.slice(0, 4).map(t => (
            <div key={t.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  t.type === TransactionType.INCOME ? 'bg-green-100 text-green-600' : 'bg-red-50 text-red-500'
                }`}>
                  {t.type === TransactionType.INCOME ? <ArrowDownRight size={18} /> : <ArrowUpRight size={18} />}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{t.category}</p>
                  <p className="text-xs text-slate-400">{t.description}</p>
                </div>
              </div>
              <span className={`font-semibold text-sm ${
                t.type === TransactionType.INCOME ? 'text-green-600' : 'text-slate-900'
              }`}>
                {t.type === TransactionType.INCOME ? '+' : '-'}{formatCurrency(t.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
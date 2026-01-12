import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import TaxView from './components/TaxView';
import InsightsView from './components/InsightsView';
import BankConnect from './components/BankConnect';
import { Transaction, UserProfile, Category, TransactionType } from './types';
import { MOCK_TRANSACTIONS } from './constants';
import { Lock } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [showBankConnect, setShowBankConnect] = useState(false);
  const [user, setUser] = useState<UserProfile>({
    name: 'Tunde',
    email: 'tunde@example.com',
    bankConnected: false,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleBankSuccess = () => {
    setUser({ ...user, bankConnected: true });
    // Simulate importing new transactions
    const imported: Transaction[] = [
        {
            id: 'bank-1',
            amount: 25000,
            category: Category.OTHER,
            description: 'Bank Transfer - Imported',
            type: TransactionType.EXPENSE,
            date: new Date().toISOString(),
            isBankSynced: true
        }
    ];
    setTransactions(prev => [...imported, ...prev]);
  };

  // Auth Screen (Simplified for MVP)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-xl">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-green-600 mx-auto">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-center text-slate-900 mb-2">Welcome to KoboWise</h1>
          <p className="text-center text-slate-500 mb-8 text-sm">Secure Nigerian financial tracking.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase">Email</label>
              <input type="email" defaultValue="tunde@example.com" className="w-full border-b-2 border-slate-200 py-2 focus:outline-none focus:border-green-500" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase">Password</label>
              <input type="password" defaultValue="password" className="w-full border-b-2 border-slate-200 py-2 focus:outline-none focus:border-green-500" />
            </div>
            <button className="w-full bg-green-600 text-white py-4 rounded-xl font-bold mt-4 shadow-lg shadow-green-200 hover:bg-green-700 transition-colors">
              Sign In
            </button>
          </form>
          <p className="text-center mt-6 text-xs text-slate-400">Mock Login. Just click Sign In.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Layout 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onLogout={() => setIsAuthenticated(false)}
        userName={user.name}
      >
        <div className="animate-in fade-in duration-500">
          {activeTab === 'dashboard' && (
            <Dashboard 
              transactions={transactions} 
              onAddTransaction={() => setActiveTab('transactions')}
              onConnectBank={() => setShowBankConnect(true)}
              bankConnected={user.bankConnected}
            />
          )}
          {activeTab === 'transactions' && (
            <Transactions transactions={transactions} onAdd={handleAddTransaction} />
          )}
          {activeTab === 'insights' && (
            <InsightsView transactions={transactions} />
          )}
          {activeTab === 'tax' && (
            <TaxView transactions={transactions} />
          )}
        </div>
      </Layout>

      <BankConnect 
        isOpen={showBankConnect} 
        onClose={() => setShowBankConnect(false)} 
        onSuccess={handleBankSuccess}
      />
    </>
  );
};

export default App;
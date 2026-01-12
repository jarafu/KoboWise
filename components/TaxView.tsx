import React from 'react';
import { Transaction, TransactionType } from '../types';
import { formatCurrency } from '../constants';
import { ShieldCheck, AlertTriangle, FileText } from 'lucide-react';

interface TaxViewProps {
  transactions: Transaction[];
}

const TaxView: React.FC<TaxViewProps> = ({ transactions }) => {
  const totalIncome = transactions
    .filter(t => t.type === TransactionType.INCOME)
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Simplified Nigerian Tax Estimation (Hypothetical MVP Logic)
  // Assuming a rough effective tax rate of 15% after consolidated relief allowance for simplicity
  const estimatedTax = totalIncome * 0.15;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 text-slate-300 mb-4 text-xs uppercase tracking-wider font-bold">
            <ShieldCheck size={16} className="text-green-400" />
            Tax Readiness
        </div>
        
        <div className="mb-6">
            <p className="text-slate-400 text-sm mb-1">Est. Taxable Income</p>
            <h2 className="text-3xl font-bold">{formatCurrency(totalIncome)}</h2>
        </div>

        <div className="border-t border-slate-700 pt-4">
             <div className="flex justify-between items-center mb-1">
                <span className="text-slate-300 text-sm">Est. PAYE Liability</span>
                <span className="font-bold text-orange-300">~{formatCurrency(estimatedTax)}</span>
             </div>
             <p className="text-[10px] text-slate-500">Based on a hypothetical 15% effective rate. Actual rate depends on CRA and specifics.</p>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex gap-3">
        <AlertTriangle className="text-orange-500 flex-shrink-0" size={24} />
        <div>
            <h3 className="font-bold text-orange-800 text-sm">Disclaimer</h3>
            <p className="text-orange-700 text-xs mt-1 leading-relaxed">
                KoboWise does <strong>not</strong> file your taxes. This data is for estimation purposes only. Please consult a qualified tax consultant or the FIRS for official filing.
            </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        <h3 className="font-bold text-slate-800 mb-3">Resources</h3>
        <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                    <FileText className="text-slate-400" size={20} />
                    <span className="text-sm font-medium text-slate-700">Download Statement</span>
                </div>
                <span className="text-green-600 text-xs font-bold">PDF</span>
            </div>
             <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                    <FileText className="text-slate-400" size={20} />
                    <span className="text-sm font-medium text-slate-700">FIRS Tax Guide</span>
                </div>
                <span className="text-slate-400 text-xs font-bold">Ext</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TaxView;
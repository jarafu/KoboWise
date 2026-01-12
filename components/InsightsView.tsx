import React, { useEffect, useState } from 'react';
import { Transaction, InsightData } from '../types';
import { generateFinancialInsights } from '../services/geminiService';
import { Sparkles, Lightbulb, RefreshCw } from 'lucide-react';

interface InsightsViewProps {
  transactions: Transaction[];
}

const InsightsView: React.FC<InsightsViewProps> = ({ transactions }) => {
  const [data, setData] = useState<InsightData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    const result = await generateFinancialInsights(transactions);
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    // Initial fetch only if we haven't fetched recently or at all
    if (!data) {
      fetchInsights();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20">
            <Sparkles size={100} />
        </div>
        <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Sparkles className="text-yellow-300" />
                AI Insights
            </h2>
            <p className="text-indigo-100 text-sm">Personalized financial advice powered by Gemini.</p>
        </div>
      </div>

      {loading ? (
         <div className="space-y-4 animate-pulse">
            <div className="h-32 bg-slate-200 rounded-3xl"></div>
            <div className="h-16 bg-slate-200 rounded-2xl"></div>
            <div className="h-16 bg-slate-200 rounded-2xl"></div>
         </div>
      ) : data ? (
        <>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-2">Monthly Summary</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                    {data.summary}
                </p>
            </div>

            <div>
                <h3 className="font-bold text-slate-800 mb-4 px-1">Actionable Tips</h3>
                <div className="space-y-3">
                    {data.actionableTips.map((tip, index) => (
                        <div key={index} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-3">
                            <div className="bg-yellow-50 text-yellow-600 p-2 rounded-xl h-fit">
                                <Lightbulb size={20} />
                            </div>
                            <p className="text-slate-700 text-sm font-medium pt-1">{tip}</p>
                        </div>
                    ))}
                </div>
            </div>

            <button 
                onClick={fetchInsights}
                className="w-full py-3 text-sm font-semibold text-slate-500 flex items-center justify-center gap-2 hover:text-slate-800 transition-colors"
            >
                <RefreshCw size={16} />
                Refresh Analysis
            </button>
        </>
      ) : (
        <div className="text-center py-10 text-slate-400">
            <p>Unable to load insights.</p>
            <button onClick={fetchInsights} className="text-green-600 font-bold mt-2">Try Again</button>
        </div>
      )}
    </div>
  );
};

export default InsightsView;
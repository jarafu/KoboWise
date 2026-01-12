import React, { useState } from 'react';
import { Loader2, CheckCircle2, Building2 } from 'lucide-react';

interface BankConnectProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const BankConnect: React.FC<BankConnectProps> = ({ isOpen, onClose, onSuccess }) => {
    const [status, setStatus] = useState<'idle' | 'connecting' | 'success'>('idle');

    if (!isOpen) return null;

    const handleConnect = () => {
        setStatus('connecting');
        // Simulate API delay for Open Banking (Mono/Okra)
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => {
                onSuccess();
                onClose();
                setStatus('idle');
            }, 1000);
        }, 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                {status === 'idle' && (
                    <>
                        <div className="text-center mb-6">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                                <Building2 size={32} />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900">Link your Bank</h2>
                            <p className="text-slate-500 text-sm mt-2">Connect via our secure partners (Mono/Okra) to import transactions automatically.</p>
                        </div>
                        <div className="space-y-3">
                             <button 
                                onClick={handleConnect}
                                className="w-full bg-black text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-colors"
                            >
                                Connect with Mono
                            </button>
                            <button 
                                onClick={onClose}
                                className="w-full py-3.5 text-slate-500 font-semibold"
                            >
                                Cancel
                            </button>
                        </div>
                        <p className="text-[10px] text-center text-slate-400 mt-4">
                            Read-only access. We cannot move your money.
                        </p>
                    </>
                )}

                {status === 'connecting' && (
                    <div className="text-center py-8">
                        <Loader2 className="animate-spin text-green-600 mx-auto mb-4" size={48} />
                        <h3 className="font-bold text-slate-800">Connecting...</h3>
                        <p className="text-xs text-slate-400 mt-2">Verifying credentials securely</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="text-center py-8">
                        <CheckCircle2 className="text-green-500 mx-auto mb-4 animate-bounce" size={48} />
                        <h3 className="font-bold text-slate-800">Connected!</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BankConnect;

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { getItemById } from '../services/itemService';

export default function ClaimItem() {
    const { id } = useParams();
    const navigate = useNavigate();

    const item = getItemById(id);

    const [proof, setProof] = useState('');
    const [contact, setContact] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        setError('');

        if (proof.trim().length < 20) {
            setError('Please provide at least 20 characters of proof.');
            return;
        }

        if (!contact.trim()) {
            setError('Please enter your contact information.');
            return;
        }

        const claims = JSON.parse(
            localStorage.getItem('demoClaims') || '[]'
        );

        const newClaim = {
            id: Date.now(),
            itemId: item.id,
            itemTitle: item.title,
            proof: proof.trim(),
            contact: contact.trim(),
            status: 'Pending',
            date: new Date().toLocaleDateString()
        };

        localStorage.setItem(
            'demoClaims',
            JSON.stringify([...claims, newClaim])
        );

        alert('Claim submitted successfully! (Demo only)');
        navigate('/my-claims');
    }

    if (!item || item.type !== 'FOUND') {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold">
                    Item not available for claiming
                </h2>

                <button
                    onClick={() => navigate('/')}
                    className="mt-5 text-blue-600 font-semibold"
                >
                    Back to Homepage
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">

            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-600 mb-6"
            >
                <ArrowLeft size={20} />
                Back
            </button>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">

                <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck
                        size={32}
                        className="text-blue-600"
                    />

                    <div>
                        <h1 className="text-2xl font-bold">
                            Claim Found Item
                        </h1>

                        <p className="text-slate-500 text-sm">
                            Submit a request to verify ownership
                        </p>
                    </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                    <p className="text-sm text-slate-500">
                        Selected Item
                    </p>

                    <h2 className="font-bold text-lg">
                        {item.title}
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block font-semibold mb-2">
                            Proof of Ownership
                        </label>

                        <textarea
                            value={proof}
                            onChange={(e) => setProof(e.target.value)}
                            placeholder="Describe unique details about the item..."
                            rows={5}
                            maxLength={1000}
                            required
                            className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <p className="text-xs text-slate-500 mt-1">
                            Minimum 20 characters
                        </p>
                    </div>

                    <div>
                        <label className="block font-semibold mb-2">
                            Contact Information
                        </label>

                        <input
                            type="text"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            placeholder="Demo email or phone"
                            maxLength={100}
                            required
                            className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {error && (
                        <p className="text-red-600 text-sm">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
                    >
                        Submit Claim
                    </button>

                </form>
            </div>
        </div>
    );
}

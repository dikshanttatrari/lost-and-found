
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    ClipboardList,
    Clock,
    CheckCircle,
    XCircle,
    Package
} from 'lucide-react';

export default function MyClaims() {
    const navigate = useNavigate();

    const [claims] = useState(() => {
        try {
            const saved = JSON.parse(
                localStorage.getItem('demoClaims') || '[]'
            );

            return Array.isArray(saved) ? saved : [];
        } catch {
            return [];
        }
    });

    const totalClaims = claims.length;

    const pendingClaims = claims.filter(
        (claim) => claim.status === 'Pending'
    ).length;

    const approvedClaims = claims.filter(
        (claim) => claim.status === 'Approved'
    ).length;

    const rejectedClaims = claims.filter(
        (claim) => claim.status === 'Rejected'
    ).length;

    function getStatusStyle(status) {
        switch (status) {
            case 'Approved':
                return 'bg-green-100 text-green-700';

            case 'Rejected':
                return 'bg-red-100 text-red-700';

            default:
                return 'bg-yellow-100 text-yellow-700';
        }
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">

            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6"
            >
                <ArrowLeft size={20} />
                Back to Homepage
            </button>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">
                    My Claims
                </h1>

                <p className="text-slate-500 mt-2">
                    Track your submitted item claims.
                </p>
            </div>

            {/* Dashboard Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

                <StatCard
                    title="Total Claims"
                    value={totalClaims}
                    icon={<ClipboardList size={24} />}
                    color="text-blue-600"
                />

                <StatCard
                    title="Pending"
                    value={pendingClaims}
                    icon={<Clock size={24} />}
                    color="text-yellow-600"
                />

                <StatCard
                    title="Approved"
                    value={approvedClaims}
                    icon={<CheckCircle size={24} />}
                    color="text-green-600"
                />

                <StatCard
                    title="Rejected"
                    value={rejectedClaims}
                    icon={<XCircle size={24} />}
                    color="text-red-600"
                />

            </div>

            {/* Claims List */}
            {claims.length === 0 ? (

                <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">

                    <Package
                        size={60}
                        className="mx-auto text-slate-300 mb-4"
                    />

                    <h2 className="text-xl font-bold text-slate-800">
                        No Claims Yet
                    </h2>

                    <p className="text-slate-500 mt-2">
                        You haven't submitted any item claims.
                    </p>

                    <button
                        onClick={() => navigate('/')}
                        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
                    >
                        Browse Found Items
                    </button>

                </div>

            ) : (

                <div className="space-y-4">

                    {claims.map((claim) => (

                        <div
                            key={claim.id}
                            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
                        >

                            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">

                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">
                                        {claim.itemTitle}
                                    </h2>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Claim ID: {claim.id}
                                    </p>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Submitted: {claim.date}
                                    </p>
                                </div>

                                <span
                                    className={`self-start px-4 py-2 rounded-full text-sm font-bold ${getStatusStyle(claim.status)}`}
                                >
                                    {claim.status}
                                </span>

                            </div>

                            <div className="border-t border-slate-100 mt-5 pt-4">

                                <p className="text-sm font-semibold text-slate-700">
                                    Proof of Ownership
                                </p>

                                <p className="text-sm text-slate-500 mt-1 whitespace-pre-wrap break-words">
                                    {claim.proof}
                                </p>

                            </div>

                            <button
                                onClick={() => navigate(`/items/${claim.itemId}`)}
                                className="mt-5 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                            >
                                View Item Details
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

function StatCard({ title, value, icon, color }) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

            <div className={`mb-3 ${color}`}>
                {icon}
            </div>

            <p className="text-sm text-slate-500">
                {title}
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-1">
                {value}
            </h2>

        </div>
    );
}

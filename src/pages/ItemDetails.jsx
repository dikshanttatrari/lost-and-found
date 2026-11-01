
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, PackageOpen } from 'lucide-react';
import { getItemById } from '../services/itemService';

export default function ItemDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const item = getItemById(id);

    if (!item) {
        return (
            <div className="max-w-4xl mx-auto text-center py-20">
                <h1 className="text-2xl font-bold">
                    Item Not Found
                </h1>

                <p className="text-slate-500 mt-2">
                    This item does not exist.
                </p>

                <button
                    onClick={() => navigate('/')}
                    className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
                >
                    Back to Homepage
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">

            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6"
            >
                <ArrowLeft size={20} />
                Back
            </button>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

                <div className="grid grid-cols-1 md:grid-cols-2">

                    <div className="bg-slate-100 min-h-80 flex items-center justify-center">
                        {item.img ? (
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full max-h-[450px] object-cover"
                            />
                        ) : (
                            <div className="text-center text-slate-400">
                                <PackageOpen size={64} className="mx-auto mb-3" />
                                <p>No Image Available</p>
                            </div>
                        )}
                    </div>

                    <div className="p-8">

                        <span
                            className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${item.type === 'LOST'
                                ? 'bg-red-100 text-red-600'
                                : 'bg-green-100 text-green-600'
                                }`}
                        >
                            {item.type}
                        </span>

                        <h1 className="text-3xl font-bold text-slate-900 mt-5">
                            {item.title}
                        </h1>

                        <p className="text-blue-600 font-semibold mt-2">
                            {item.category}
                        </p>

                        <h2 className="text-lg font-bold mt-8">
                            Description
                        </h2>

                        <p className="text-slate-600 mt-2">
                            {item.desc}
                        </p>

                        <div className="border-t border-slate-200 mt-8 pt-6 space-y-4">

                            <div className="flex items-center gap-3 text-slate-600">
                                <MapPin size={20} />
                                <span>{item.loc}</span>
                            </div>

                            <div className="flex items-center gap-3 text-slate-600">
                                <Clock size={20} />
                                <span>{item.time}</span>
                            </div>

                        </div>

                        {item.type === 'FOUND' ? (
                            <button
                                type="button"
                                onClick={() => navigate(`/claim/${item.id}`)}
                                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-colors"
                            >
                                Claim This Item
                            </button>
                        ) : (
                            <div className="mt-8 p-4 bg-amber-50 text-amber-800 rounded-xl text-sm">
                                This item has been reported lost.
                                Only found items can be claimed through this form.
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

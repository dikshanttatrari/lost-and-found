
import { useNavigate } from 'react-router-dom';
import {
    MapPin,
    Clock,
    ArrowUpRight,
    PackageOpen
} from 'lucide-react';

export default function ItemCard({ item }) {
    const navigate = useNavigate();

    const isLost = item.type === 'LOST';

    return (
        <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">

            {/* Item Image */}
            <div className="relative h-52 bg-slate-100">

                {item.img ? (
                    <img
                        src={item.img}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                        <PackageOpen size={48} />
                        <p className="text-sm mt-2">
                            No Image Available
                        </p>
                    </div>
                )}

                {/* Lost / Found Badge */}
                <span
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${
                        isLost
                            ? 'bg-red-100 text-red-700'
                            : 'bg-green-100 text-green-700'
                    }`}
                >
                    {item.type}
                </span>

                {item.isNew && (
                    <span className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        NEW
                    </span>
                )}

            </div>

            {/* Item Information */}
            <div className="p-5">

                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                    {item.category}
                </p>

                <h2 className="text-lg font-bold text-slate-900 mt-2 line-clamp-1">
                    {item.title}
                </h2>

                <p className="text-sm text-slate-500 mt-2 line-clamp-2 min-h-10">
                    {item.desc}
                </p>

                <div className="space-y-3 mt-5">

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin
                            size={17}
                            className="text-slate-400 shrink-0"
                        />

                        <span className="truncate">
                            {item.loc}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock
                            size={17}
                            className="text-slate-400 shrink-0"
                        />

                        <span>
                            {item.time}
                        </span>
                    </div>

                </div>

                {/* View Details */}
                <button
                    type="button"
                    onClick={() => navigate(`/items/${item.id}`)}
                    className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    View Details
                    <ArrowUpRight size={18} />
                </button>

            </div>
        </article>
    );
}

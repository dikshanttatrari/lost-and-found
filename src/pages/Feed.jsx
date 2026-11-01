// src/pages/Feed.jsx
import { useState } from 'react';
import { Search, Sparkles, Filter, PackageSearch } from 'lucide-react';
import { getItems } from '../services/itemService';
import ItemCard from '../components/ItemCard';



export default function Feed() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const [items] = useState(() => getItems());

  const filteredItems = items.filter((item) => {
    const query = search.trim().toLowerCase();

    const matchesFilter =
      filter === 'ALL' || item.type === filter;

    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query) ||
      item.loc.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto pb-12">

      {/* Modern Hero Section with Soft Gradient Mesh */}
      <div className="relative overflow-hidden bg-white border border-slate-200/60 rounded-[2rem] p-8 sm:p-12 mb-10 shadow-sm">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-blue-100/50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-purple-100/50 blur-3xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-wide uppercase mb-4">
              <Sparkles size={14} /> Campus Network
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
              Lost it? <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Let's find it together.</span>
            </h1>
            <p className="text-slate-500 text-lg">Browse recent reports or post a new item to help keep our campus community connected.</p>
          </div>

          {/* Search & Filter Controls inside Hero */}
          <div className="w-full md:w-auto flex flex-col gap-3">
            <div className="relative group">
              <Search className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search headphones, keys..."
                className="w-full md:w-80 pl-12 pr-4 py-3 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm text-slate-700 font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex p-1.5 bg-slate-100/80 backdrop-blur-md rounded-2xl border border-slate-200/60">
              {['ALL', 'LOST', 'FOUND'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${filter === f
                    ? 'bg-white shadow-sm text-slate-900 scale-100'
                    : 'text-slate-500 hover:text-slate-700 scale-95 hover:scale-100 hover:bg-slate-200/50'
                    }`}
                >
                  {f === 'ALL' ? 'All Items' : f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid Header */}
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Filter size={20} className="text-slate-400" />
          Active Reports
        </h2>
        <span className="text-sm font-medium text-slate-500">{filteredItems.length} results</span>
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center bg-white border border-slate-200 rounded-2xl py-16 px-6">

          <PackageSearch
            size={56}
            className="mx-auto text-slate-300 mb-4"
          />

          <h2 className="text-xl font-bold text-slate-800">
            No Items Found
          </h2>

          <p className="text-slate-500 mt-2">
            Try another search term or change your filter.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch('');
              setFilter('ALL');
            }}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Clear Filters
          </button>

        </div>
      )}

      {/* Premium Framed Card Grid */}

      {filteredItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">

          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
            />
          ))}

        </div>
      )}

    </div>
  );
}
// src/pages/Feed.jsx
import { useState } from 'react';
import { MapPin, Search, Clock, PackageOpen, Sparkles, Filter, ChevronRight } from 'lucide-react';

const mockItems = [
  { id: 1, type: 'LOST', category: 'Electronics', title: 'Sony WH-1000XM4 Headphones', desc: 'Black headphones in a hard case. Left earcup has a small scratch.', loc: 'Main Library, 2nd Floor', time: '2 hours ago', img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=600&q=80', isNew: true },
  { id: 2, type: 'FOUND', category: 'Accessories', title: 'Brown Leather Wallet', desc: 'Contains a student ID and some cash. Handed to security.', loc: 'BCA Block, Room 102', time: '5 hours ago', img: null, isNew: true },
  { id: 3, type: 'FOUND', category: 'Electronics', title: 'iPad Pro with Pencil', desc: 'Silver iPad with a blue magnetic case. Locked screen.', loc: 'Cafeteria', time: '1 day ago', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80', isNew: false },
  { id: 4, type: 'LOST', category: 'Keys', title: 'Honda Car Keys', desc: 'Attached to a red Marvel lanyard.', loc: 'Parking Lot B', time: '2 days ago', img: null, isNew: false }
];

export default function Feed() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filteredItems = mockItems.filter(item => 
    (filter === 'ALL' || item.type === filter) &&
    (item.title.toLowerCase().includes(search.toLowerCase()) || item.desc.toLowerCase().includes(search.toLowerCase()))
  );

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
                  className={`flex-1 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                    filter === f 
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
        <div className="text-center py-24 bg-white border border-slate-200/60 rounded-[2rem] shadow-sm">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
            <PackageOpen className="text-slate-300" size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No items found</h3>
          <p className="text-slate-500 mt-2">No reports match your current search criteria.</p>
        </div>
      )}

      {/* Premium Framed Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="group bg-white border border-slate-200/60 rounded-[2rem] p-3 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-200/50 transition-all duration-500 flex flex-col">
            
            {/* Framed Image Container */}
            <div className="relative h-56 bg-slate-50 rounded-[1.5rem] overflow-hidden mb-4 border border-slate-100">
              {item.img ? (
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                  <PackageOpen size={48} className="mb-2" />
                  <span className="text-sm font-medium">No Image Provided</span>
                </div>
              )}
              
              {/* Glassmorphism Overlay Top */}
              <div className="absolute top-3 left-3 flex gap-2">
                <div className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md border ${
                  item.type === 'LOST' 
                  ? 'bg-red-500/90 border-red-400/50 text-white' 
                  : 'bg-emerald-500/90 border-emerald-400/50 text-white'
                }`}>
                  {item.type}
                </div>
                {item.isNew && (
                  <div className="px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md bg-white/90 border border-slate-200 text-blue-600">
                    NEW
                  </div>
                )}
              </div>

              {/* Glassmorphism Overlay Bottom */}
              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-slate-900/70 backdrop-blur-md border border-white/10 rounded-xl p-2.5 flex items-center justify-between text-white shadow-lg translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    <Clock size={14} className="text-blue-300" />
                    {item.time}
                  </div>
                  <button className="flex items-center gap-1 text-xs font-bold text-white hover:text-blue-300 transition-colors">
                    View Details <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="px-3 pb-3 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.category}</span>
              </div>
              <h3 className="font-extrabold text-lg text-slate-900 leading-tight mb-2 line-clamp-1">{item.title}</h3>
              <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">{item.desc}</p>
              
              <div className="flex items-center text-sm font-medium text-slate-600 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                <MapPin size={16} className="mr-2 text-slate-400" /> 
                <span className="truncate">{item.loc}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
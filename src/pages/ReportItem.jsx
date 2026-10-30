// src/pages/ReportItem.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, MapPin, Tag, FileText, CheckCircle2 } from 'lucide-react';

export default function ReportItem() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ type: 'LOST', category: 'Electronics', location: '', title: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Report an Item</h1>
        <p className="text-gray-500 mt-1">Provide detailed information to help the matching algorithm.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Core Info */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Tag size={18} className="text-blue-500" /> The Basics
          </h2>
          
          <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
            {['LOST', 'FOUND'].map((type) => (
              <label key={type} className="flex-1 cursor-pointer">
                <input type="radio" name="type" className="peer sr-only" checked={formData.type === type} onChange={() => setFormData({...formData, type})} />
                <div className={`text-center py-2.5 rounded-lg font-semibold transition-all ${
                  formData.type === type 
                  ? (type === 'LOST' ? 'bg-white text-red-600 shadow-sm' : 'bg-white text-emerald-600 shadow-sm')
                  : 'text-gray-500 hover:text-gray-700'
                }`}>
                  I {type === 'LOST' ? 'Lost' : 'Found'} Something
                </div>
              </label>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Item Title</label>
              <input type="text" required placeholder="e.g., Blue Hydroflask" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700">
                <option>Electronics</option>
                <option>Keys & Wallets</option>
                <option>Books & Stationary</option>
                <option>Clothing & Accessories</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Details */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={18} className="text-blue-500" /> Details & Location
          </h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Last Known Location</label>
              <div className="relative group">
                <MapPin size={18} className="absolute left-3.5 top-3 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input type="text" required placeholder="Building, Room number, or landmark..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Identifying Features</label>
              <textarea required rows="4" placeholder="Include serial numbers, specific scratches, unique keychains, or wallpaper (if phone). DO NOT include this info if you found the item—make the claimant provide it." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"></textarea>
            </div>
          </div>
        </div>

        {/* Section 3: Media */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Photo (Recommended)</label>
          <div className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-xl p-8 flex flex-col items-center justify-center hover:bg-gray-100 hover:border-blue-400 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Upload className="text-blue-500" size={24} />
            </div>
            <span className="font-semibold text-gray-700">Click to upload or drag & drop</span>
            <span className="text-sm text-gray-500 mt-1">PNG, JPG, or HEIC (max 5MB)</span>
          </div>
        </div>

        <button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
          <CheckCircle2 size={20} />
          Submit Report
        </button>
      </form>
    </div>
  );
}
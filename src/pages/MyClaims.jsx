// src/pages/MyClaims.jsx
import { CheckCircle2, Clock, XCircle, ChevronRight } from 'lucide-react';

export default function MyClaims() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">My Dashboard</h1>
        <p className="text-gray-500 mt-1">Track the status of your claims and reports.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Active Claims Column */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Items I'm Claiming</h2>
            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-full">2 Active</span>
          </div>
          
          <div className="space-y-3">
            {/* Status: Pending */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <span className="flex items-center gap-1.5 text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                  <Clock size={14} /> Pending Verification
                </span>
                <span className="text-xs text-gray-400">Oct 26</span>
              </div>
              <h3 className="font-bold text-gray-900">Silver iPad Pro</h3>
              <p className="text-sm text-gray-500 mt-1">Awaiting approval from the finder. You submitted the MAC address as proof.</p>
              <div className="mt-3 text-sm font-semibold text-blue-600 flex items-center group-hover:translate-x-1 transition-transform">
                View Claim Details <ChevronRight size={16} />
              </div>
            </div>

            {/* Status: Approved */}
            <div className="bg-white border border-green-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
              <div className="flex justify-between items-start mb-2 pl-2">
                <span className="flex items-center gap-1.5 text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 size={14} /> Approved
                </span>
              </div>
              <h3 className="font-bold text-gray-900 pl-2">Car Keys (Honda)</h3>
              <p className="text-sm text-gray-500 mt-1 pl-2">The finder approved your proof. Click to reveal contact info to arrange meetup.</p>
              <button className="mt-3 ml-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors shadow-sm">
                Reveal Contact Info
              </button>
            </div>
          </div>
        </section>

        {/* My Reports Column */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">My Posted Reports</h2>
          </div>
          
          <div className="space-y-3">
            {/* Report: Found item waiting for claim */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-600 mb-1 block">FOUND ITEM</span>
                <h3 className="font-bold text-gray-900">Hydroflask Water Bottle</h3>
                <p className="text-sm text-gray-500">0 claims received</p>
              </div>
              <button className="text-gray-400 hover:text-gray-900 transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Report: Lost item marked resolved */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between opacity-75">
              <div>
                <span className="text-xs font-bold text-gray-500 mb-1 block flex items-center gap-1">
                  <CheckCircle2 size={12} /> RESOLVED
                </span>
                <h3 className="font-bold text-gray-700 line-through">Sony WH-1000XM4</h3>
                <p className="text-sm text-gray-500">Reunited on Oct 20</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
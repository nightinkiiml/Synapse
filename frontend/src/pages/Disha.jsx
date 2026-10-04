import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  Clock, 
  Search, 
  Navigation, 
  PhoneCall, 
  Layers,
  Sparkles
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import HellDeskAI from '../components/HellDeskAI';

// Custom Marker Icons for Leaflet
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-map-marker',
    html: `<div style="
      background-color: ${color};
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 10px ${color};
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });
};

const IIML_CENTER = [26.9207, 80.9396];

// Helper to pan to marker when selected
function MapController({ selectedPlace }) {
  const map = useMap();
  useEffect(() => {
    if (selectedPlace) {
      map.flyTo([selectedPlace.lat, selectedPlace.lng], 17, { duration: 1.2 });
    }
  }, [selectedPlace, map]);
  return null;
}

export default function Disha({ user, places, onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);

  const categories = [
    'ALL',
    'HOSTEL',
    'ACADEMIC',
    'LIBRARY',
    'MESS & CAFÉS',
    'SPORTS',
    'SHOPS & ATM',
    'MEDICAL',
    'ADMIN',
    'GATE & AUTO'
  ];

  const filteredPlaces = places.filter(p => {
    const matchCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case 'HOSTEL': return '#e53e3e';
      case 'ACADEMIC': return '#3182ce';
      case 'LIBRARY': return '#805ad5';
      case 'MESS & CAFÉS': return '#dd6b20';
      case 'SPORTS': return '#38a169';
      case 'MEDICAL': return '#e53e3e';
      default: return '#718096';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-[#242832] pb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-950/70 border border-sky-600/40 flex items-center justify-center text-sky-400">
            <Compass className="w-4 h-4" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight font-sans">
            DISHA <span className="text-[#8e98a8] font-normal text-base">· Campus Map & 24/7 Night Directory</span>
          </h1>
        </div>
        <p className="text-xs text-[#8e98a8] mt-1 font-mono">
          Spatial directory for IIM Lucknow. Find late-night food, print shops, ATM, and Bodhigriha halls instantly.
        </p>
      </div>

      {/* Hell Desk AI */}
      <HellDeskAI user={user} onNavigate={onNavigate} />

      {/* Map & Directory Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Leaflet Interactive Map */}
        <div className="lg:col-span-2 bg-[#14161b] border border-[#272b35] rounded-xl overflow-hidden shadow-2xl flex flex-col h-[520px]">
          <div className="p-3 bg-[#111317] border-b border-[#22262e] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-[#cbd5e1]">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>IIM Lucknow Campus · Prabandh Nagar (26.9207° N, 80.9396° E)</span>
            </div>
            <button
              onClick={() => setSelectedPlace({ lat: IIML_CENTER[0], lng: IIML_CENTER[1] })}
              className="px-2.5 py-1 rounded bg-[#1c2028] hover:bg-[#282e3a] text-white flex items-center gap-1 text-[11px]"
            >
              <Navigation className="w-3 h-3 text-red-400" />
              <span>Reset View</span>
            </button>
          </div>

          <div className="flex-1 w-full relative">
            <MapContainer
              center={IIML_CENTER}
              zoom={16}
              scrollWheelZoom={true}
              className="w-full h-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapController selectedPlace={selectedPlace} />

              {filteredPlaces.map((place) => (
                <Marker
                  key={place.id}
                  position={[place.lat, place.lng]}
                  icon={createCustomIcon(getCategoryColor(place.category))}
                  eventHandlers={{
                    click: () => setSelectedPlace(place)
                  }}
                >
                  <Popup>
                    <div className="p-1 font-sans">
                      <div className="text-[10px] font-mono font-bold text-red-400 uppercase">
                        {place.category}
                      </div>
                      <h4 className="font-bold text-sm text-white">{place.name}</h4>
                      <p className="text-xs text-[#94a3b8] mt-1">{place.desc}</p>
                      <div className="mt-2 text-xs font-mono text-amber-400 flex items-center gap-1 border-t border-[#333842] pt-1">
                        <Clock className="w-3 h-3" />
                        <span>{place.hours}</span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Right Col: Directory list */}
        <div className="bg-[#14161b] border border-[#272b35] rounded-xl p-5 shadow-2xl flex flex-col h-[520px]">
          <div className="mb-3">
            <h3 className="text-sm font-bold text-white font-mono uppercase mb-2 flex items-center justify-between">
              <span>Campus Directory</span>
              <span className="text-xs text-[#8e98a8]">({filteredPlaces.length} places)</span>
            </h3>

            {/* Search */}
            <div className="relative mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search places or services..."
                className="w-full bg-[#0d0e12] border border-[#262a34] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#505869] focus:outline-none focus:border-red-500"
              />
              <Search className="w-3.5 h-3.5 text-[#505869] absolute left-2.5 top-2" />
            </div>

            {/* Category Filter */}
            <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar">
              {categories.slice(0, 5).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-red-600 text-white font-bold'
                      : 'bg-[#1b1f27] text-[#8e98a8] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Place Cards */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {filteredPlaces.map((place) => (
              <div
                key={place.id}
                onClick={() => setSelectedPlace(place)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedPlace?.id === place.id
                    ? 'bg-[#1e232d] border-red-500/60 shadow-md'
                    : 'bg-[#0d0e12] border-[#22262e] hover:border-[#383e4c]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-red-400">
                    {place.category}
                  </span>
                  <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{place.hours}</span>
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white font-sans">{place.name}</h4>
                <p className="text-[11px] text-[#717a8a] mt-0.5 truncate font-sans">{place.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

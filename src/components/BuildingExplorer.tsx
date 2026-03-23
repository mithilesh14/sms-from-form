import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Eye, Maximize2, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useIntent } from '@/contexts/IntentContext';

interface Unit {
  id: string;
  name: string;
  floor: number;
  position: 'left' | 'right' | 'center';
  bedrooms: number;
  bathrooms: number;
  size: number;
  price: number;
  monthlyRate?: number;
  view: 'ocean' | 'mountain' | 'garden';
  sunlightHours: number;
  orientation: string;
  available: boolean;
}

const units: Unit[] = [
  // Floor 8 — Penthouses
  { id: 'PH-A', name: 'Penthouse A', floor: 8, position: 'left', bedrooms: 4, bathrooms: 4, size: 3200, price: 4200000, monthlyRate: 28000, view: 'ocean', sunlightHours: 12, orientation: 'NW', available: true },
  { id: 'PH-B', name: 'Penthouse B', floor: 8, position: 'right', bedrooms: 4, bathrooms: 3, size: 2800, price: 3800000, monthlyRate: 25000, view: 'ocean', sunlightHours: 11, orientation: 'NE', available: true },
  // Floor 7
  { id: '7A', name: 'Residence 7A', floor: 7, position: 'left', bedrooms: 3, bathrooms: 3, size: 2200, price: 2800000, monthlyRate: 18000, view: 'ocean', sunlightHours: 11, orientation: 'NW', available: true },
  { id: '7B', name: 'Residence 7B', floor: 7, position: 'center', bedrooms: 2, bathrooms: 2, size: 1600, price: 1900000, monthlyRate: 12000, view: 'ocean', sunlightHours: 10, orientation: 'N', available: false },
  { id: '7C', name: 'Residence 7C', floor: 7, position: 'right', bedrooms: 3, bathrooms: 2, size: 2000, price: 2400000, monthlyRate: 16000, view: 'mountain', sunlightHours: 9, orientation: 'NE', available: true },
  // Floor 6
  { id: '6A', name: 'Residence 6A', floor: 6, position: 'left', bedrooms: 3, bathrooms: 2, size: 2100, price: 2600000, monthlyRate: 17000, view: 'ocean', sunlightHours: 10, orientation: 'NW', available: true },
  { id: '6B', name: 'Residence 6B', floor: 6, position: 'center', bedrooms: 2, bathrooms: 2, size: 1500, price: 1700000, monthlyRate: 11000, view: 'garden', sunlightHours: 8, orientation: 'N', available: true },
  { id: '6C', name: 'Residence 6C', floor: 6, position: 'right', bedrooms: 3, bathrooms: 2, size: 2000, price: 2300000, monthlyRate: 15000, view: 'mountain', sunlightHours: 9, orientation: 'NE', available: false },
  // Floor 5
  { id: '5A', name: 'Residence 5A', floor: 5, position: 'left', bedrooms: 3, bathrooms: 2, size: 2100, price: 2400000, monthlyRate: 16000, view: 'ocean', sunlightHours: 9, orientation: 'NW', available: true },
  { id: '5B', name: 'Residence 5B', floor: 5, position: 'center', bedrooms: 2, bathrooms: 2, size: 1500, price: 1600000, monthlyRate: 10000, view: 'garden', sunlightHours: 7, orientation: 'N', available: true },
  { id: '5C', name: 'Residence 5C', floor: 5, position: 'right', bedrooms: 2, bathrooms: 2, size: 1800, price: 2100000, monthlyRate: 14000, view: 'mountain', sunlightHours: 8, orientation: 'NE', available: true },
  // Floor 4
  { id: '4A', name: 'Residence 4A', floor: 4, position: 'left', bedrooms: 3, bathrooms: 2, size: 2100, price: 2200000, monthlyRate: 15000, view: 'ocean', sunlightHours: 8, orientation: 'NW', available: false },
  { id: '4B', name: 'Residence 4B', floor: 4, position: 'center', bedrooms: 2, bathrooms: 1, size: 1400, price: 1500000, monthlyRate: 9500, view: 'garden', sunlightHours: 7, orientation: 'N', available: true },
  { id: '4C', name: 'Residence 4C', floor: 4, position: 'right', bedrooms: 2, bathrooms: 2, size: 1700, price: 1900000, monthlyRate: 13000, view: 'mountain', sunlightHours: 7, orientation: 'NE', available: true },
  // Floor 3
  { id: '3A', name: 'Residence 3A', floor: 3, position: 'left', bedrooms: 2, bathrooms: 2, size: 1800, price: 2000000, monthlyRate: 13000, view: 'ocean', sunlightHours: 7, orientation: 'NW', available: true },
  { id: '3B', name: 'Residence 3B', floor: 3, position: 'center', bedrooms: 2, bathrooms: 1, size: 1400, price: 1400000, monthlyRate: 9000, view: 'garden', sunlightHours: 6, orientation: 'N', available: true },
  { id: '3C', name: 'Residence 3C', floor: 3, position: 'right', bedrooms: 2, bathrooms: 2, size: 1700, price: 1800000, monthlyRate: 12000, view: 'garden', sunlightHours: 6, orientation: 'NE', available: true },
  // Floor 2
  { id: '2A', name: 'Residence 2A', floor: 2, position: 'left', bedrooms: 2, bathrooms: 2, size: 1800, price: 1800000, monthlyRate: 12000, view: 'garden', sunlightHours: 6, orientation: 'NW', available: true },
  { id: '2B', name: 'Residence 2B', floor: 2, position: 'center', bedrooms: 1, bathrooms: 1, size: 1100, price: 1100000, monthlyRate: 7500, view: 'garden', sunlightHours: 5, orientation: 'N', available: true },
  { id: '2C', name: 'Residence 2C', floor: 2, position: 'right', bedrooms: 2, bathrooms: 1, size: 1600, price: 1600000, monthlyRate: 11000, view: 'garden', sunlightHours: 5, orientation: 'NE', available: false },
  // Floor 1 — Ground
  { id: '1A', name: 'Garden Suite A', floor: 1, position: 'left', bedrooms: 2, bathrooms: 2, size: 2000, price: 1900000, monthlyRate: 13000, view: 'garden', sunlightHours: 5, orientation: 'NW', available: true },
  { id: '1B', name: 'Garden Suite B', floor: 1, position: 'center', bedrooms: 1, bathrooms: 1, size: 1200, price: 1200000, monthlyRate: 8000, view: 'garden', sunlightHours: 4, orientation: 'N', available: true },
  { id: '1C', name: 'Garden Suite C', floor: 1, position: 'right', bedrooms: 2, bathrooms: 2, size: 1900, price: 1700000, monthlyRate: 11000, view: 'garden', sunlightHours: 5, orientation: 'NE', available: true },
];

const viewColors: Record<string, string> = {
  ocean: 'bg-verso-teal',
  mountain: 'bg-accent',
  garden: 'bg-green-700',
};

const viewLabels: Record<string, string> = {
  ocean: 'Ocean View',
  mountain: 'Mountain View',
  garden: 'Garden View',
};

function SunlightBar({ hours }: { hours: number }) {
  return (
    <div className="flex items-center gap-2">
      <Sun className="h-3.5 w-3.5 text-accent" />
      <div className="flex gap-0.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-3 ${i < hours ? 'bg-accent' : 'bg-border'}`}
          />
        ))}
      </div>
      <span className="text-[10px] text-muted-foreground">{hours}h</span>
    </div>
  );
}

export function BuildingExplorer() {
  const { t } = useTranslation();
  const { mode } = useIntent();
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [filterView, setFilterView] = useState<string>('all');

  const floors = [8, 7, 6, 5, 4, 3, 2, 1];
  const isInvest = mode === 'invest';

  const getFloorUnits = (floor: number) => {
    return units.filter(u => u.floor === floor && (filterView === 'all' || u.view === filterView));
  };

  const getFloorLabel = (floor: number) => {
    if (floor === 8) return 'Penthouse';
    if (floor === 1) return 'Garden Level';
    return `Floor ${floor}`;
  };

  const formatPrice = (price: number) => {
    return `€${(price / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="relative">
      {/* View filter */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-caption text-muted-foreground">View:</span>
        {['all', 'ocean', 'mountain', 'garden'].map(v => (
          <button
            key={v}
            onClick={() => setFilterView(v)}
            className={`text-caption px-4 py-2 border transition-all duration-500 ${
              filterView === v
                ? 'bg-foreground text-background border-foreground'
                : 'bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground'
            }`}
          >
            {v === 'all' ? 'All' : viewLabels[v]}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        {/* Building SVG */}
        <div className="relative">
          {/* Building silhouette */}
          <div className="relative bg-secondary/30 border border-border/30 p-4 sm:p-6">
            {/* Ocean indicator at top */}
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px flex-1 bg-verso-teal/30" />
              <span className="text-caption text-verso-teal">← Ocean</span>
              <div className="h-px w-8 bg-verso-teal/30" />
              <span className="text-caption text-muted-foreground">Mountain →</span>
              <div className="h-px flex-1 bg-border/30" />
            </div>

            {floors.map(floor => {
              const floorUnits = getFloorUnits(floor);
              const isSelected = selectedFloor === floor;
              const isPenthouse = floor === 8;

              return (
                <motion.div
                  key={floor}
                  onClick={() => setSelectedFloor(isSelected ? null : floor)}
                  className={`relative mb-1 cursor-pointer transition-all duration-500 border ${
                    isSelected
                      ? 'border-accent bg-accent/5'
                      : 'border-border/20 hover:border-border/60 bg-secondary/20 hover:bg-secondary/40'
                  } ${isPenthouse ? 'py-6' : 'py-4'}`}
                  layout
                >
                  {/* Floor label */}
                  <div className="flex items-center justify-between px-4 sm:px-6">
                    <div className="flex items-center gap-4">
                      <span className="number-display text-2xl text-foreground/40 w-8">{floor}</span>
                      <span className="text-caption text-foreground">{getFloorLabel(floor)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-caption text-muted-foreground">
                        {floorUnits.filter(u => u.available).length}/{floorUnits.length} available
                      </span>
                    </div>
                  </div>

                  {/* Expanded floor units */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-6 pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {floorUnits.map(unit => (
                            <motion.button
                              key={unit.id}
                              onClick={(e) => { e.stopPropagation(); setSelectedUnit(unit); }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`text-left p-4 border transition-all duration-300 ${
                                !unit.available
                                  ? 'border-border/20 opacity-40 cursor-not-allowed'
                                  : selectedUnit?.id === unit.id
                                    ? 'border-accent bg-accent/10'
                                    : 'border-border/40 hover:border-accent/50 hover:bg-card'
                              }`}
                              disabled={!unit.available}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <span className="text-sm font-medium text-foreground">{unit.name}</span>
                                <div className={`w-2 h-2 rounded-full ${unit.available ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <div className={`w-2 h-2 rounded-full ${viewColors[unit.view]}`} />
                                <span className="text-[10px] text-muted-foreground">{viewLabels[unit.view]}</span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {unit.bedrooms}BD · {unit.bathrooms}BA · {unit.size.toLocaleString()} ft²
                              </div>
                              {unit.available && (
                                <div className="mt-2 text-sm text-accent font-medium">
                                  {isInvest ? `${formatPrice(unit.price)}` : `€${unit.monthlyRate?.toLocaleString()}/mo`}
                                </div>
                              )}
                              {!unit.available && (
                                <div className="mt-2 text-xs text-muted-foreground italic">Reserved</div>
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {/* Ground / Amenities */}
            <div className="mt-1 py-3 px-4 sm:px-6 bg-muted/30 border border-border/10">
              <span className="text-caption text-muted-foreground">Lobby · Spa · Pool · Fitness</span>
            </div>
          </div>
        </div>

        {/* Unit detail panel */}
        <AnimatePresence mode="wait">
          {selectedUnit ? (
            <motion.div
              key={selectedUnit.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              className="bg-card border border-border/30 p-6 lg:sticky lg:top-28 self-start"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-serif text-2xl text-foreground">{selectedUnit.name}</h3>
                  <p className="text-caption text-muted-foreground mt-1">
                    Floor {selectedUnit.floor} · {selectedUnit.orientation}
                  </p>
                </div>
                <button onClick={() => setSelectedUnit(null)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* View badge */}
              <div className="flex items-center gap-2 mb-6">
                <div className={`w-3 h-3 rounded-full ${viewColors[selectedUnit.view]}`} />
                <span className="text-sm text-foreground">{viewLabels[selectedUnit.view]}</span>
                <Eye className="h-3 w-3 text-muted-foreground ml-auto" />
              </div>

              {/* Placeholder image */}
              <div className="aspect-video bg-secondary mb-6 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&auto=format&fit=crop&q=80"
                  alt={selectedUnit.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border border-border/30 p-3 text-center">
                  <span className="number-display text-2xl text-foreground">{selectedUnit.bedrooms}</span>
                  <p className="text-caption text-muted-foreground mt-1">{t('common.beds', 'Beds')}</p>
                </div>
                <div className="border border-border/30 p-3 text-center">
                  <span className="number-display text-2xl text-foreground">{selectedUnit.bathrooms}</span>
                  <p className="text-caption text-muted-foreground mt-1">{t('common.baths', 'Baths')}</p>
                </div>
                <div className="border border-border/30 p-3 text-center">
                  <span className="number-display text-2xl text-foreground">{selectedUnit.size.toLocaleString()}</span>
                  <p className="text-caption text-muted-foreground mt-1">ft²</p>
                </div>
                <div className="border border-border/30 p-3 text-center">
                  <span className="number-display text-2xl text-foreground">{selectedUnit.orientation}</span>
                  <p className="text-caption text-muted-foreground mt-1">Facing</p>
                </div>
              </div>

              {/* Sunlight */}
              <div className="mb-6">
                <p className="text-caption text-muted-foreground mb-2">Daily Sunlight</p>
                <SunlightBar hours={selectedUnit.sunlightHours} />
              </div>

              {/* Price */}
              <div className="border-t border-border/30 pt-6 mb-6">
                {isInvest ? (
                  <div>
                    <p className="text-caption text-muted-foreground mb-1">Purchase Price</p>
                    <p className="font-serif text-3xl text-foreground">{formatPrice(selectedUnit.price)}</p>
                    <p className="text-sm text-accent mt-2">
                      Est. yield: €{Math.round(selectedUnit.price * 0.08).toLocaleString()}/yr
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-caption text-muted-foreground mb-1">From</p>
                    <p className="font-serif text-3xl text-foreground">
                      €{selectedUnit.monthlyRate?.toLocaleString()}<span className="text-sm text-muted-foreground">/month</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Link
                  to="/virtual-tour"
                  className="btn-outline-premium w-full flex items-center justify-center gap-2 py-3 text-foreground border-foreground/30"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>360° Tour</span>
                </Link>
                <Link
                  to="/contact"
                  className="btn-premium w-full flex items-center justify-center gap-2 py-3"
                >
                  <span>Inquire</span>
                  <ArrowRight className="h-3.5 w-3.5 relative z-10" />
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-card/30 border border-border/20 p-8 flex flex-col items-center justify-center text-center lg:sticky lg:top-28 self-start min-h-[400px]"
            >
              <Maximize2 className="h-8 w-8 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-sm">
                Select a floor and unit to view details
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

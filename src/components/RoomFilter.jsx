"use client"
import React, { useEffect, useState, useTransition } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

const RoomFilter = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [minRate, setMinRate] = useState(searchParams.get('minRate') || '');
    const [maxRate, setMaxRate] = useState(searchParams.get('maxRate') || '');
    const [selectedAmenities, setSelectedAmenities] = useState(() => {
        const amenities = searchParams.get('amenities');
        return amenities ? amenities.split(',') : [];
    });

    // Handle amenity check/uncheck
    const handleAmenityChange = (amenity, checked) => {
        let updated;
        if (checked) {
            updated = [...selectedAmenities, amenity];
        } else {
            updated = selectedAmenities.filter(a => a !== amenity);
        }
        setSelectedAmenities(updated);
        updateQueryParams({ amenities: updated.join(',') });
    };

    // Update URL query parameters
    const updateQueryParams = (newParams) => {
        const params = new URLSearchParams(searchParams.toString());
        
        Object.entries(newParams).forEach(([key, value]) => {
            if (value === null || value === undefined || value === '') {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });

        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        });
    };

    // Reset all filters
    const handleReset = () => {
        setSearch('');
        setMinRate('');
        setMaxRate('');
        setSelectedAmenities([]);
        router.replace(pathname, { scroll: false });
    };

    return (
        <div className="w-full lg:w-80 flex-shrink-0 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-150 dark:border-slate-800 p-6 shadow-md space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                <h2 className="font-extrabold text-[#1e1108] dark:text-white text-lg">Filters</h2>
                <button 
                    onClick={handleReset}
                    className="text-sm font-bold text-[#b5622a] hover:text-[#a15323] transition-colors cursor-pointer"
                >
                    Reset All
                </button>
            </div>

            {/* Search input */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-[#5c5654] dark:text-slate-300 ml-1 font-sans" htmlFor="search">
                    Search by name
                </label>
                <input
                    id="search"
                    type="text"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        updateQueryParams({ search: e.target.value });
                    }}
                    className="w-full border-2 border-[#5c5654]/60 dark:border-slate-700 hover:border-[#b5622a]/50 focus:border-[#b5622a] outline-none p-3 rounded-2xl transition-all bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    placeholder="e.g. Silent Study"
                />
            </div>

            {/* Amenities list */}
            <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#5c5654] dark:text-slate-300 ml-1 font-sans">Amenities</h3>
                <div className="space-y-2">
                    {[
                        'WiFi',
                        'Air Conditioning',
                        'Power Backup',
                        'Projector',
                        'Whiteboard',
                        'Water Dispenser',
                        'Coffee Machine'
                    ].map((amenity) => {
                        const isChecked = selectedAmenities.includes(amenity);
                        return (
                            <label 
                                key={amenity} 
                                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                            >
                                <span className="text-sm text-slate-700 dark:text-slate-300 font-bold">{amenity}</span>
                                <input 
                                    type="checkbox" 
                                    checked={isChecked}
                                    onChange={(e) => handleAmenityChange(amenity, e.target.checked)}
                                    className="w-4.5 h-4.5 rounded text-[#b5622a] focus:ring-[#b5622a] border-[#5c5654] dark:border-slate-600 dark:bg-slate-800 transition-colors cursor-pointer"
                                />
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Rate range */}
            <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#5c5654] dark:text-slate-300 ml-1 font-sans">Hourly Rate ($)</h3>
                <div className="flex gap-3">
                    <div className="w-1/2">
                        <input
                            type="number"
                            value={minRate}
                            onChange={(e) => {
                                  setMinRate(e.target.value);
                                  updateQueryParams({ minRate: e.target.value });
                             }}
                            className="w-full border-2 border-[#5c5654]/60 dark:border-slate-700 hover:border-[#b5622a]/50 focus:border-[#b5622a] outline-none p-3 rounded-2xl transition-all text-sm font-medium bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                            placeholder="Min"
                        />
                    </div>
                    <div className="w-1/2">
                        <input
                            type="number"
                            value={maxRate}
                            onChange={(e) => {
                                  setMaxRate(e.target.value);
                                  updateQueryParams({ maxRate: e.target.value });
                             }}
                            className="w-full border-2 border-[#5c5654]/60 dark:border-slate-700 hover:border-[#b5622a]/50 focus:border-[#b5622a] outline-none p-3 rounded-2xl transition-all text-sm font-medium bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                            placeholder="Max"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomFilter;

'use client';

import React, { useState, useEffect } from 'react';
import {
  Home,
  AlignLeft,
  Image as ImageIcon,
  Layers,
  Users,
  DollarSign,
  Wifi,
  Video,
  Presentation,
  Plug,
  VolumeX,
  Wind,
  ArrowLeft,
  Check,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/lib/AuthContext';

const AMENITIES_OPTIONS = [
  { label: 'Wi‑Fi', icon: Wifi },
  { label: 'Projector', icon: Video },
  { label: 'Whiteboard', icon: Presentation },
  { label: 'Power Outlets', icon: Plug },
  { label: 'Quiet Zone', icon: VolumeX },
  { label: 'Air Conditioning', icon: Wind },
];

const AddRoomPage = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    document.title = 'StudyNook – Add Room';
  }, []);

  // Local state for image preview and amenities
  const [imageUrl, setImageUrl] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const toggleAmenity = amenity => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(item => item !== amenity)
        : [...prev, amenity],
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    // Prepare clean request body
    const roomData = {
      name: formValues.name,
      description: formValues.description,
      image: formValues.image || imageUrl,
      floor: formValues.floor,
      capacity: parseInt(formValues.capacity),
      hourlyRate: parseFloat(formValues.hourlyRate),
      amenities: selectedAmenities, // Array of strings
    };

    try {
      const res = await fetch('/api/server/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
        credentials: 'include', // Ensure token cookie is sent
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to add room');
      }

      toast.success(data.message || 'Room added successfully');
      router.push('/my-listings');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/my-listings"
            className="flex items-center gap-2 text-sm font-semibold text-[#5c5654] dark:text-slate-400 hover:text-[#b5622a] transition-colors group no-underline"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Listings
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-8 relative overflow-hidden">
          {/* Accent Glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#b5622a]/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-slate-200/50 dark:bg-slate-900/20 rounded-full -ml-20 -mb-20 blur-3xl"></div>

          {/* Header Title */}
          <div className="relative border-b border-slate-100 dark:border-slate-800 pb-6">
            <h2 className="text-3xl font-black text-[#1e1108] dark:text-white tracking-tight">
              Create a <span className="text-[#b5622a]">New Space</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
              Provide study room details to list it on StudyNook
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative">
            {/* Room Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 flex items-center gap-2"
              >
                <Home className="w-4 h-4 text-[#b5622a]" />
                Room Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                required
                type="text"
                placeholder="e.g., Silent Study Suite A"
                className="w-full h-14 px-4 rounded-2xl border-2 border-[#5c5654] dark:border-slate-700 hover:border-[#b5622a]/50 focus:border-[#b5622a] focus:ring-0 focus:outline-none transition-all duration-300 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 font-medium"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 flex items-center gap-2"
              >
                <AlignLeft className="w-4 h-4 text-[#b5622a]" />
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                placeholder="Describe your study room, available equipment, seating setup, and unique environment characteristics..."
                className="w-full min-h-[120px] px-4 py-3 rounded-2xl border-2 border-[#5c5654] dark:border-slate-700 hover:border-[#b5622a]/50 focus:border-[#b5622a] focus:ring-0 focus:outline-none transition-all duration-300 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 font-medium"
              />
            </div>

            {/* Image URL & Preview Block */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2 space-y-2">
                <label
                  htmlFor="image"
                  className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 flex items-center gap-2"
                >
                  <ImageIcon className="w-4 h-4 text-[#b5622a]" />
                  Image URL
                </label>
                <input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className="w-full h-14 px-4 rounded-2xl border-2 border-[#5c5654] dark:border-slate-700 hover:border-[#b5622a]/50 focus:border-[#b5622a] focus:ring-0 focus:outline-none transition-all duration-300 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 font-medium"
                />
                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium ml-1">
                  Enter a valid web URL of an image of the room
                </p>
              </div>

              {/* Image Live Preview */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">
                  Preview
                </span>
                <div className="h-24 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center overflow-hidden transition-all duration-300 relative group">
                  {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl}
                      alt="Room preview"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={e => {
                        e.currentTarget.src = '';
                        setImageUrl('');
                        toast.error('Invalid image URL');
                      }}
                    />
                  ) : (
                    <div className="text-center p-2">
                      <ImageIcon className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                      <span className="text-[10px] font-bold text-slate-400 block">
                        No Image
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Floor, Capacity, Hourly Rate Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Floor */}
              <div className="space-y-2">
                <label
                  htmlFor="floor"
                  className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 flex items-center gap-2"
                >
                  <Layers className="w-4 h-4 text-[#b5622a]" />
                  Floor
                </label>
                <input
                  id="floor"
                  name="floor"
                  type="text"
                  placeholder="e.g., 3rd Floor"
                  className="w-full h-14 px-4 rounded-2xl border-2 border-[#5c5654] dark:border-slate-700 hover:border-[#b5622a]/50 focus:border-[#b5622a] focus:ring-0 focus:outline-none transition-all duration-300 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 font-medium"
                />
              </div>

              {/* Capacity */}
              <div className="space-y-2">
                <label
                  htmlFor="capacity"
                  className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-[#b5622a]" />
                  Capacity
                </label>
                <input
                  id="capacity"
                  name="capacity"
                  type="number"
                  min="1"
                  placeholder="e.g., 4"
                  className="w-full h-14 px-4 rounded-2xl border-2 border-[#5c5654] dark:border-slate-700 hover:border-[#b5622a]/50 focus:border-[#b5622a] focus:ring-0 focus:outline-none transition-all duration-300 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 font-medium"
                />
              </div>

              {/* Hourly Rate */}
              <div className="space-y-2">
                <label
                  htmlFor="hourlyRate"
                  className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 flex items-center gap-2"
                >
                  <DollarSign className="w-4 h-4 text-[#b5622a]" />
                  Hourly Rate ($)
                </label>
                <input
                  id="hourlyRate"
                  name="hourlyRate"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="e.g., 5"
                  className="w-full h-14 px-4 rounded-2xl border-2 border-[#5c5654] dark:border-slate-700 hover:border-[#b5622a]/50 focus:border-[#b5622a] focus:ring-0 focus:outline-none transition-all duration-300 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 font-medium"
                />
              </div>
            </div>

            {/* Amenities Checkbox Cards */}
            <div className="space-y-3 pt-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Select Amenities
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {AMENITIES_OPTIONS.map(({ label, icon: Icon }) => {
                  const isSelected = selectedAmenities.includes(label);
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => toggleAmenity(label)}
                      className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 text-left cursor-pointer group ${
                        isSelected
                          ? 'border-[#b5622a] bg-[#b5622a]/5 text-[#1e1108] dark:text-[#b5622a] shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-[#5c5654] dark:text-slate-300 hover:border-[#b5622a]/30 hover:bg-[#b5622a]/5 dark:hover:bg-[#b5622a]/10'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-xl transition-colors ${
                          isSelected
                            ? 'bg-[#b5622a] text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-[#b5622a]/10 group-hover:text-[#b5622a]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate">{label}</p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-[#b5622a] bg-[#b5622a] text-white'
                            : 'border-slate-300 dark:border-slate-700 group-hover:border-slate-400'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
              {/* Hidden Input to store joined amenities for simple form handling if they want to submit default forms */}
              <input
                type="hidden"
                name="amenities"
                value={selectedAmenities.join(',')}
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex gap-4">
              <Link href="/my-listings" className="flex-1 no-underline">
                <Button
                  type="button"
                  variant="flat"
                  className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-705 text-[#5c5654] dark:text-slate-300 h-14 text-base font-bold rounded-2xl transition-all duration-200"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                color="primary"
                type="submit"
                className="flex-[2] bg-[#b5622a] hover:bg-[#a15323] text-white h-14 text-base font-black rounded-2xl shadow-xl shadow-[#b5622a]/20 transition-all duration-300 hover:scale-101 cursor-pointer"
              >
                List Room
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRoomPage;

'use client';

import React, { useState } from 'react';
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
import { Button, Input } from '@heroui/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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

  const handleSubmit = e => {
    e.preventDefault();

    // Success toast and redirect as requested
    toast.success('Room added successfully');
    router.push('/my-listings');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/my-listings"
            className="flex items-center gap-2 text-sm font-semibold text-[#5c5654] hover:text-[#b5622a] transition-colors group no-underline"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Listings
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">
          {/* Accent Glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#b5622a]/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-slate-200/50 rounded-full -ml-20 -mb-20 blur-3xl"></div>

          {/* Header Title */}
          <div className="relative border-b border-slate-100 pb-6">
            <h2 className="text-3xl font-black text-[#1e1108] tracking-tight">
              Create a <span className="text-[#b5622a]">New Space</span>
            </h2>
            <p className="text-slate-500 font-medium mt-1">
              Provide study room details to list it on StudyNook
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative">
            {/* Room Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2"
              >
                <Home className="w-4 h-4 text-[#b5622a]" />
                Room Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                required
                placeholder="e.g., Silent Study Suite A"
                className="border-2 border-[#5c5654] hover:border-[#b5622a]/50 focus-within:border-[#b5622a] transition-all duration-300 h-14 bg-white w-full rounded-2xl"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2"
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
                className="w-full min-h-[120px] px-4 py-3 rounded-2xl border-2 border-[#5c5654] hover:border-[#b5622a]/50 focus:border-[#b5622a] focus:ring-0 focus:outline-none transition-all duration-300 bg-white text-slate-800 placeholder-slate-400 font-medium"
              />
            </div>

            {/* Image URL & Preview Block */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2 space-y-2">
                <label
                  htmlFor="image"
                  className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2"
                >
                  <ImageIcon className="w-4 h-4 text-[#b5622a]" />
                  Image URL
                </label>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className="border-2 border-[#5c5654] hover:border-[#b5622a]/50 focus-within:border-[#b5622a] transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                />
                <p className="text-xs text-slate-400 font-medium ml-1">
                  Enter a valid web URL of an image of the room
                </p>
              </div>

              {/* Image Live Preview */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 ml-1">
                  Preview
                </span>
                <div className="h-24 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden transition-all duration-300 relative group">
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
                  className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2"
                >
                  <Layers className="w-4 h-4 text-[#b5622a]" />
                  Floor
                </label>
                <Input
                  id="floor"
                  name="floor"
                  placeholder="e.g., 3rd Floor"
                  className="border-2 border-[#5c5654] hover:border-[#b5622a]/50 focus-within:border-[#b5622a] transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                />
              </div>

              {/* Capacity */}
              <div className="space-y-2">
                <label
                  htmlFor="capacity"
                  className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-[#b5622a]" />
                  Capacity
                </label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  min="1"
                  placeholder="e.g., 4"
                  className="border-2 border-[#5c5654] hover:border-[#b5622a]/50 focus-within:border-[#b5622a] transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                />
              </div>

              {/* Hourly Rate */}
              <div className="space-y-2">
                <label
                  htmlFor="hourlyRate"
                  className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2"
                >
                  <DollarSign className="w-4 h-4 text-[#b5622a]" />
                  Hourly Rate ($)
                </label>
                <Input
                  id="hourlyRate"
                  name="hourlyRate"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="e.g., 5"
                  className="border-2 border-[#5c5654] hover:border-[#b5622a]/50 focus-within:border-[#b5622a] transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                />
              </div>
            </div>

            {/* Amenities Checkbox Cards */}
            <div className="space-y-3 pt-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
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
                          ? 'border-[#b5622a] bg-[#b5622a]/5 text-[#1e1108] shadow-sm'
                          : 'border-slate-200 bg-white text-[#5c5654] hover:border-[#b5622a]/30 hover:bg-[#b5622a]/5'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-xl transition-colors ${
                          isSelected
                            ? 'bg-[#b5622a] text-white'
                            : 'bg-slate-100 text-slate-500 group-hover:bg-[#b5622a]/10 group-hover:text-[#b5622a]'
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
                            : 'border-slate-300 group-hover:border-slate-400'
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
            <div className="pt-6 border-t border-slate-100 flex gap-4">
              <Link href="/my-listings" className="flex-1 no-underline">
                <Button
                  type="button"
                  variant="flat"
                  className="w-full bg-slate-100 hover:bg-slate-200 text-[#5c5654] h-14 text-base font-bold rounded-2xl transition-all duration-200"
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

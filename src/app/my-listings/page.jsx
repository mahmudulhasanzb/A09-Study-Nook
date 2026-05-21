'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, X, AlertTriangle, Layers, Users, DollarSign } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';

const MyListingsPage = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRoom, setEditingRoom] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: '',
    image: '',
    floor: '',
    capacity: '',
    amenities: '',
    description: '',
    hourlyRate: '',
  });

  const fetchMyRooms = async () => {
    try {
      const res = await fetch('/api/server/api/rooms/my', {
        method: 'GET',
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setRooms(data);
      } else {
        console.error('Failed to fetch my rooms');
      }
    } catch (error) {
      console.error('Error fetching my rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'StudyNook – My Listings';
    fetchMyRooms();
  }, []);

  const openEditModal = (room) => {
    setEditingRoom(room);
    setEditForm({
      name: room.name || '',
      image: room.image || '',
      floor: room.floor || '',
      capacity: room.capacity || '',
      amenities: Array.isArray(room.amenities) ? room.amenities.join(', ') : room.amenities || '',
      description: room.description || '',
      hourlyRate: room.hourlyRate || '',
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingRoom?._id) return;
    setIsUpdating(true);

    try {
      const res = await fetch(`/api/server/api/rooms/${editingRoom._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update listing');
      }

      toast.success(data.message || 'Listing updated successfully!');
      setEditingRoom(null);
      await fetchMyRooms();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/server/api/rooms/${deleteTargetId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete listing');
      }

      toast.success(data.message || 'Listing deleted successfully!');
      setDeleteTargetId(null);
      await fetchMyRooms();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#b5622a]"></div>
      </div>
    );
  }

  return (
    <div className="w-full pb-16 pt-4 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h1 className="text-4xl font-extrabold text-[#1e1108] dark:text-white">My Listings</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
            Manage study rooms you are currently hosting on StudyNook.
          </p>
        </div>
        <Link href="/add-room">
          <button className="flex items-center gap-2 px-5 py-3.5 bg-[#b5622a] hover:bg-[#a15323] text-white font-bold rounded-2xl shadow-xl shadow-orange-500/10 active:scale-[0.98] transition-all cursor-pointer">
            <Plus className="w-5 h-5" />
            Add a Room
          </button>
        </Link>
      </div>

      {rooms.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-150 dark:border-slate-800 p-16 text-center shadow-lg space-y-4">
          <span className="text-6xl block">🏫</span>
          <h2 className="text-2xl font-black text-[#1e1108] dark:text-white">No Hosted Rooms Yet</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto font-medium">
            You haven't listed any study rooms on the platform yet. Click the button above to add your first nook!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative h-52 w-full">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow space-y-4">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-xl font-bold text-[#1e1108] dark:text-white line-clamp-1">
                    {room.name}
                  </h3>
                  <span className="text-lg font-extrabold text-[#b5622a] shrink-0">
                    ${room.hourlyRate}
                  </span>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed">
                  {room.description}
                </p>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-50 dark:border-slate-800 text-[#5c5654] dark:text-slate-355 text-xs font-bold">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#b5622a]/70" /> {room.floor}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#b5622a]/70" /> {room.capacity} Cap
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 mt-auto">
                  <button
                    onClick={() => openEditModal(room)}
                    className="flex-1 py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl flex items-center justify-center gap-1.5 border border-slate-200/50 dark:border-slate-700 transition-colors cursor-pointer text-xs"
                  >
                    <Edit2 className="w-4 h-4" /> Edit Room
                  </button>
                  <button
                    onClick={() => setDeleteTargetId(room._id)}
                    className="py-3 px-4 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 dark:text-red-300 font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-xs"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Listing Modal */}
      {editingRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-8 space-y-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-2xl font-black text-[#1e1108] dark:text-white">Edit Listing</h3>
              <button
                onClick={() => setEditingRoom(null)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-[#5c5654] dark:text-slate-400 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Room Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 outline-none p-3 rounded-xl focus:border-[#b5622a] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all font-medium text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={editForm.image}
                  onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                  className="w-full border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 outline-none p-3 rounded-xl focus:border-[#b5622a] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all font-medium text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Floor</label>
                  <input
                    type="text"
                    required
                    value={editForm.floor}
                    onChange={(e) => setEditForm({ ...editForm, floor: e.target.value })}
                    className="w-full border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 outline-none p-3 rounded-xl focus:border-[#b5622a] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all font-medium text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Capacity</label>
                  <input
                    type="number"
                    required
                    value={editForm.capacity}
                    onChange={(e) => setEditForm({ ...editForm, capacity: e.target.value })}
                    className="w-full border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 outline-none p-3 rounded-xl focus:border-[#b5622a] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all font-medium text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Hourly Rate ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editForm.hourlyRate}
                    onChange={(e) => setEditForm({ ...editForm, hourlyRate: e.target.value })}
                    className="w-full border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 outline-none p-3 rounded-xl focus:border-[#b5622a] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all font-medium text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Amenities (comma separated)</label>
                  <input
                    type="text"
                    value={editForm.amenities}
                    onChange={(e) => setEditForm({ ...editForm, amenities: e.target.value })}
                    className="w-full border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 outline-none p-3 rounded-xl focus:border-[#b5622a] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all font-medium text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Description</label>
                <textarea
                  rows="3"
                  required
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 outline-none p-3 rounded-xl focus:border-[#b5622a] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all font-medium text-sm resize-none"
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingRoom(null)}
                  className="w-1/3 py-3 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-650 dark:text-slate-300 font-bold rounded-xl transition-all cursor-pointer text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-2/3 py-3 bg-[#b5622a] hover:bg-[#a15323] text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer text-sm"
                >
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Listing Confirmation Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-red-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-[#1e1108] dark:text-white">Delete Study Room?</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Are you sure you want to delete this listing? Doing so will permanently cancel all upcoming bookings for this room.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteTargetId(null)}
                className="w-1/2 py-3.5 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-650 dark:text-slate-350 font-bold rounded-2xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteConfirm}
                className="w-1/2 py-3.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl shadow-xl shadow-red-500/15 transition-all active:scale-[0.98] cursor-pointer"
              >
                {isDeleting ? 'Deleting...' : 'Delete Listing'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListingsPage;

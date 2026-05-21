'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Edit2, Trash2, X, AlertTriangle } from 'lucide-react';

const OwnerActions = ({ room }) => {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [editForm, setEditForm] = useState({
    name: room.name || '',
    image: room.image || '',
    floor: room.floor || '',
    capacity: room.capacity || '',
    amenities: Array.isArray(room.amenities) ? room.amenities.join(', ') : room.amenities || '',
    description: room.description || '',
    hourlyRate: room.hourlyRate || '',
  });

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const res = await fetch(`/api/server/api/rooms/${room._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update room');
      }

      toast.success('Room updated successfully!');
      setEditing(false);
      router.refresh();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/server/api/rooms/${room._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete room');
      }

      toast.success('Room deleted successfully!');
      setDeleting(false);
      router.push('/my-listings');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-3 w-full">
      <div className="p-4 bg-orange-50/50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 rounded-2xl text-center">
        <p className="text-xs font-bold text-[#b5622a] uppercase tracking-wider">
          You own this listing
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setEditing(true)}
          className="flex-grow py-4 bg-[#b5622a] hover:bg-[#a15323] text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-sm transition-all cursor-pointer shadow-lg hover:shadow-orange-500/10"
        >
          <Edit2 className="w-4 h-4" /> Edit Details
        </button>
        <button
          onClick={() => setDeleting(true)}
          className="py-4 px-6 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 dark:text-red-300 font-bold rounded-2xl flex items-center justify-center gap-2 text-sm transition-all cursor-pointer"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-8 space-y-6 overflow-y-auto max-h-[90vh] text-left">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-2xl font-black text-[#1e1108] dark:text-white">Edit Listing</h3>
              <button
                onClick={() => setEditing(false)}
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
                  onClick={() => setEditing(false)}
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

      {/* Delete Confirmation Modal */}
      {deleting && (
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
                onClick={() => setDeleting(false)}
                className="w-1/2 py-3.5 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-650 dark:text-slate-300 font-bold rounded-2xl transition-all cursor-pointer"
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

export default OwnerActions;

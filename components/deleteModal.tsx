"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteModalProps {
  recipeId: string;
  onClose: () => void;
}

export default function DeleteModal({ recipeId, onClose }: DeleteModalProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/recipes/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: recipeId }),
      });

      if (!res.ok) throw new Error("Failed to delete recipe");

      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Failed to delete recipe");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose} // clicking outside closes modal
    >
      <div
        className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center"
        onClick={(e) => e.stopPropagation()} // prevent modal clicks from closing
      >
        <p className="mb-4 font-bold">
          Are you sure you want to delete this recipe?
        </p>
        <div className="flex justify-around">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-1 border-2 border-black font-mono"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 text-white px-4 py-1 border-2 border-black font-mono"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

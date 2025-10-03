import React from "react";
import type { KnowledgeEntry } from "../../../types/knowledge/KnowledgeEntity";

interface EntryCardProps {
  entry: KnowledgeEntry;
  onEdit: (entry: KnowledgeEntry) => void;
  onDelete: (id: number) => void;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry, onEdit, onDelete }) => {
  // Determine if the URL is a Base64 string (starts with 'data:image') or a regular URL
  const isBase64 = entry.imageUrl?.startsWith("data:image");

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition duration-300 hover:shadow-2xl flex flex-col h-full"
      role="listitem"
    >
      {/* Image Area */}
      <div className="h-40 bg-gray-200 flex items-center justify-center overflow-hidden">
        {entry.imageUrl ? (
          <img
            src={entry.imageUrl}
            alt={`Image for ${entry.title}`}
            // Use 'object-cover' for standard URLs or 'object-contain' for Base64 (which might be smaller)
            className={`w-full h-full ${
              isBase64 ? "object-contain p-2" : "object-cover"
            }`}
          />
        ) : (
          <span className="text-gray-400 text-sm p-4">No Image Captured</span>
        )}
      </div>

      {/* Content Area - Flex-grow ensures content fills the card height */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title: Accessible and legible size for mobile */}
        <h3
          className="text-xl font-bold text-gray-900 mb-2 truncate"
          title={entry.title}
        >
          {entry.title}
        </h3>
        {/* Description: Clamp text for neatness */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
          {entry.description}
        </p>

        {/* Action Buttons: Clear, accessible, and spaced for touch */}
        <div className="flex justify-end space-x-3 mt-auto pt-3 border-t border-gray-100">
          <button
            onClick={() => onEdit(entry)}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition active:scale-95 touch-manipulation"
            aria-label={`Edit ${entry.title}`}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(entry.id)}
            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition active:scale-95 touch-manipulation"
            aria-label={`Delete ${entry.title}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default EntryCard;

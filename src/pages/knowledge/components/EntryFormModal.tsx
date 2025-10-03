import React, { useState, useEffect } from "react";
import type {
  KnowledgeEntry,
  KnowledgeEntryForm,
} from "../../../types/knowledge/KnowledgeEntity";

interface EntryFormModalProps {
  entryToEdit: KnowledgeEntry | null;
  onClose: () => void;
  // onSave now expects the full form data, including the Base64 string for the image
  onSave: (data: KnowledgeEntryForm) => void;
}

const EntryFormModal: React.FC<EntryFormModalProps> = ({
  entryToEdit,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<KnowledgeEntryForm>({
    title: "",
    description: "",
    // imageUrl will now hold the Base64 string
    imageUrl: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const isEditing = !!entryToEdit;

  // 1. Initialize form data and preview URL
  useEffect(() => {
    if (entryToEdit) {
      setFormData({
        title: entryToEdit.title,
        description: entryToEdit.description,
        // If editing, the existing imageUrl is treated as the Base64 string
        imageUrl: entryToEdit.imageUrl || "",
      });
      setPreviewUrl(entryToEdit.imageUrl || null);
    } else {
      setFormData({ title: "", description: "", imageUrl: "" });
      setPreviewUrl(null);
    }
  }, [entryToEdit]);

  // Handler for text inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 2. New handler for file input (Image Upload)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // 2a. Create a preview URL immediately for the user
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // 2b. Convert file to Base64 string
      const reader = new FileReader();
      reader.onloadend = () => {
        // reader.result is the Base64 string (data:image/png;base64,...)
        setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.onerror = () => {
        alert("Error reading file.");
        setPreviewUrl(null);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
      setFormData((prev) => ({ ...prev, imageUrl: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert("Title and Description are required.");
      return;
    }
    // Submit data with the Base64 string in the imageUrl field
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 flex items-start justify-center p-0 overflow-y-auto">
      <div className="bg-white w-full h-full md:w-11/12 md:max-w-xl md:h-auto md:mt-10 md:rounded-xl shadow-2xl p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-xl font-bold text-blue-700">
            {isEditing ? "Edit Knowledge Entry" : "Create New Entry"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
            aria-label="Close Modal"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              placeholder="Enter title"
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
              required
              aria-label="Title"
            />
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Enter the description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
              required
              aria-label="Description"
            />
          </div>

          {/* 3. Image Upload (File Input) and Preview */}
          <div className="space-y-2">
            <label
              htmlFor="imageFile"
              className="block text-sm font-medium text-gray-700"
            >
              Image Upload
            </label>
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              aria-label="Image Upload"
            />

            {/* Image Preview Area */}
            {previewUrl && (
              <div className="mt-4 p-2 border border-gray-300 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                {/* The src for the image is the Base64 string (or the temporary URL) */}
                <img
                  src={previewUrl}
                  alt="Image Preview"
                  className="max-w-full h-40 object-contain rounded-lg mx-auto"
                />
              </div>
            )}

            {/* Clear Image Button (Optional but good UX) */}
            {previewUrl && (
              <button
                type="button"
                onClick={() => {
                  setPreviewUrl(null);
                  setFormData((prev) => ({ ...prev, imageUrl: "" }));
                  // Reset file input value to allow re-upload of the same file
                  const input = document.getElementById(
                    "imageFile"
                  ) as HTMLInputElement;
                  if (input) input.value = "";
                }}
                className="text-xs text-red-600 hover:text-red-800"
              >
                Remove Image
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-md"
              aria-label="Save Entry"
            >
              {isEditing ? "Update Entry" : "Save Entry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntryFormModal;

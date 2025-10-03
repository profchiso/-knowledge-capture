// src/pages/DashboardPage.tsx
import React, { useState, useEffect } from "react";
import { knowledgeService } from "../../api/knowledge/KnowledgeService";
import type {
  KnowledgeEntry,
  KnowledgeEntryForm,
} from "../../types/knowledge/KnowledgeEntity";
import EntryCard from "./components/EntryCard";
import EntryFormModal from "./components/EntryFormModal";

// Mocked utility for better mobile responsiveness
const Spinner = () => (
  <div className="flex justify-center items-center py-10">
    <div className="w-8 h-8 border-4 border-t-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const DashboardPage: React.FC = () => {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<KnowledgeEntry | null>(null);

  const fetchEntries = async () => {
    setIsLoading(true);
    try {
      // Simulate network delay for a better demo feel
      await new Promise((resolve) => setTimeout(resolve, 500));
      const data = await knowledgeService.getAll();
      setEntries(data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSave = async (data: KnowledgeEntryForm) => {
    try {
      if (editingEntry) {
        await knowledgeService.update(editingEntry.id, data);
      } else {
        await knowledgeService.create(data);
      }
      fetchEntries();
      setIsModalOpen(false);
      setEditingEntry(null);
    } catch (error) {
      console.error("Error saving entry:", error);
      alert(`Failed to save entry. Is the mock server running on port 3001?`);
    }
  };

  const handleDelete = async (id: number) => {
    if (
      window.confirm("Are you sure you want to delete this knowledge entry?")
    ) {
      try {
        await knowledgeService.remove(id);
        fetchEntries();
      } catch (error) {
        console.error("Error deleting entry:", error);
        alert("Failed to delete entry.");
      }
    }
  };

  const handleEdit = (entry: KnowledgeEntry) => {
    setEditingEntry(entry);
    setIsModalOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingEntry(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      {" "}
      {/* Added bottom padding for mobile FAB */}
      {/* Header with Mobile-First Padding */}
      <header className="sticky top-0 z-10 bg-white shadow-sm p-4 md:p-6 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight md:text-3xl">
          Tech Know-How Capture
        </h1>

        {/* 'Add New' button for DESKTOP */}
        <button
          onClick={handleOpenCreate}
          className="hidden md:flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition duration-150 font-semibold"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Add New Entry
        </button>
      </header>
      <main className="p-4 md:p-8">
        {isLoading ? (
          <Spinner />
        ) : (
          // Entry List - Responsive Grid Layout
          <section
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            role="list"
          >
            {entries.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
            {entries.length === 0 && (
              <p className="text-gray-500 col-span-full text-center py-10 text-lg">
                No knowledge entries found. Tap the '+' button to begin
                capturing!
              </p>
            )}
          </section>
        )}
      </main>
      {/* Floating Action Button (FAB) for MOBILE */}
      <button
        onClick={handleOpenCreate}
        className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-green-500 text-white text-3xl shadow-2xl hover:bg-green-600 transition duration-300 flex items-center justify-center md:hidden z-20"
        title="Add New Entry"
      >
        +
      </button>
      {/* Entry Form Modal */}
      {isModalOpen && (
        <EntryFormModal
          entryToEdit={editingEntry}
          onClose={() => {
            setIsModalOpen(false);
            setEditingEntry(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default DashboardPage;

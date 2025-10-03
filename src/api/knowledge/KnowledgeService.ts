import axios from "axios";
import type {
  KnowledgeEntry,
  KnowledgeEntryForm,
} from "../../types/knowledge/KnowledgeEntity";

const API_URL = "http://localhost:3001/entries";

export const knowledgeService = {
  // READ: Fetch all entries
  getAll: async (): Promise<KnowledgeEntry[]> => {
    const response = await axios.get<KnowledgeEntry[]>(API_URL);
    return response.data;
  },

  // CREATE: Add a new entry
  create: async (entry: KnowledgeEntryForm): Promise<KnowledgeEntry> => {
    // Note: Image upload is simplified here. In a real app, you'd handle FormData.
    const response = await axios.post<KnowledgeEntry>(API_URL, entry);
    return response.data;
  },

  // UPDATE: Edit an existing entry
  update: async (
    id: number,
    entry: KnowledgeEntryForm
  ): Promise<KnowledgeEntry> => {
    const response = await axios.patch<KnowledgeEntry>(
      `${API_URL}/${id}`,
      entry
    );
    return response.data;
  },

  // DELETE: Remove an entry
  remove: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};

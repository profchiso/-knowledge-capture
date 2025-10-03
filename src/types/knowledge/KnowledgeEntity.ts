export interface KnowledgeEntry {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export type KnowledgeEntryForm = Omit<KnowledgeEntry, "id">;

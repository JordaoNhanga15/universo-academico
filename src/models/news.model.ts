
export interface News {
  id: number;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  publishDate: string;
  authorName: string;
  categoryId: number;
  featured?: boolean;
  tags?: string[];
  hidden?: boolean;
}

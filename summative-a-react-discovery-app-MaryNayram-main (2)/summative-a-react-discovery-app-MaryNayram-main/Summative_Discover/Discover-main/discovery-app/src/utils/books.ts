export interface Book {
  id: number;
  title: string;
  summary: string;
  author: string;
  image: string;
  publishedDate: string;
  category: "genres" | "discover";
  specificType: string;
  rating?: number; // Optional: Adds support for ratings
  reviews?: string[]; // Optional: Allows adding user reviews
}

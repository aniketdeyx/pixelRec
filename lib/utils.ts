import { videos } from "@/drizzle/schema";
import { clsx, type ClassValue } from "clsx"
import { ilike, sql } from "drizzle-orm";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const doesTitleMatch = (videos: any, searchQuery: string) =>
  ilike(
    sql`REPLACE(REPLACE(REPLACE(LOWER(${videos.title}), '-', ''), '.', ''), ' ', '')`,
    `%${searchQuery.replace(/[-. ]/g, "").toLowerCase()}%`
  );

  export const getOrderByClause = (filter?: string) => {
  switch (filter) {
    case "Most Viewed":
      return sql`${videos.views} DESC`;
    case "Least Viewed":
      return sql`${videos.views} ASC`;
    case "Oldest First":
      return sql`${videos.createdAt} ASC`;
    case "Most Recent":
    default:
      return sql`${videos.createdAt} DESC`;
  }
};
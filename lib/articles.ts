import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDirectory = path.join(process.cwd(), "articles");

export interface ArticleMetadata {
  file: string;
  title: string;
  date: string;
  tags: string[];
  slug: string;
}

export interface ArticleData extends ArticleMetadata {
  content: string;
}

export async function getArticles(): Promise<ArticleMetadata[]> {
  const indexPath = path.join(articlesDirectory, "index.json");
  const fileContents = fs.readFileSync(indexPath, "utf8");
  const articles: ArticleMetadata[] = JSON.parse(fileContents);
  
  return articles.map((article) => ({
    ...article,
    slug: article.file.replace(/\.md$/, ""),
  }));
}

export async function getArticle(slug: string): Promise<ArticleData | null> {
  try {
    const articles = await getArticles();
    const articleMeta = articles.find((a) => a.slug === slug);
    
    if (!articleMeta) return null;
    
    const fullPath = path.join(articlesDirectory, articleMeta.file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    
    const { content, data } = matter(fileContents);
    
    return {
      ...articleMeta,
      content,
      ...data,
    } as ArticleData;
  } catch (error) {
    console.error(`Error fetching article ${slug}:`, error);
    return null;
  }
}

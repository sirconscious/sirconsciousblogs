import { getArticle, getArticles } from "@/lib/articles";
import { AppSidebar } from "@/components/blog/app-sidebar";
import { ArticleViewer } from "@/components/blog/article-viewer";
import { notFound } from "next/navigation";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articles = await getArticles();
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <SidebarProvider>
      <AppSidebar articles={articles} />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex-1">
            <span className="text-sm font-medium text-muted-foreground truncate">{article.title}</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-background">
          <ArticleViewer article={article} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArticleData } from "@/lib/articles";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface ArticleViewerProps {
  article: ArticleData;
}

export function ArticleViewer({ article }: ArticleViewerProps) {
  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <header className="mb-8">
        <div className="flex gap-2 mb-4">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="font-sans">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 font-sans">
          {article.title}
        </h1>
        <p className="text-muted-foreground font-sans">{article.date}</p>
      </header>
      
      <Separator className="my-8" />
      
      <div className="prose prose-zinc dark:prose-invert max-w-none font-sans prose-headings:font-sans prose-code:font-mono">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {article.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

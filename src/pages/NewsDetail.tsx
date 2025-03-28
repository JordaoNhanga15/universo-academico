
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import MainLayout from "@/components/layout/MainLayout";
import SocialShare from "@/components/shared/SocialShare";
import NewsCard from "@/components/shared/NewsCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getNewsItemById, getNewsItems } from "@/services/news.service";
import { News } from "@/models/news.model";
import { ArrowLeft } from "lucide-react";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<News | null>(null);
  const [relatedNews, setRelatedNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const newsId = parseInt(id);
          const newsItem = await getNewsItemById(newsId);
          
          if (newsItem) {
            setNews(newsItem);
            
            // Fetch related news from the same category
            const relatedResult = await getNewsItems(1, 3, newsItem.categoryId);
            // Filter out the current news from related news
            setRelatedNews(relatedResult.news.filter(item => item.id !== newsId));
          }
        }
      } catch (error) {
        console.error("Error fetching news detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsDetail();
    // Scroll to top when ID changes
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-3/4 max-w-2xl mb-4" />
          <Skeleton className="h-6 w-48 mb-6" />
          <Skeleton className="aspect-video w-full max-w-4xl mb-8" />
          <div className="max-w-4xl space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!news) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/news">Back to News</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const formattedDate = format(new Date(news.publishDate), "MMMM d, yyyy");

  return (
    <MainLayout>
      <article className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Button variant="outline" size="sm" asChild className="gap-2">
            <Link to="/news">
              <ArrowLeft size={16} />
              Back to News
            </Link>
          </Button>
        </div>
        
        {/* Article Header */}
        <header className="max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            {news.title}
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-4 text-muted-foreground">
            <div>
              <span>By {news.authorName}</span>
              <span className="mx-2">•</span>
              <time dateTime={news.publishDate}>{formattedDate}</time>
            </div>
            <SocialShare title={news.title} />
          </div>
        </header>
        
        {/* Featured Image */}
        <figure className="max-w-4xl mx-auto mb-8">
          <img 
            src={news.imageUrl} 
            alt={news.title} 
            className="w-full rounded-lg"
          />
        </figure>
        
        {/* Article Content */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="prose prose-slate max-w-none">
            <p className="text-xl font-medium text-academia-600 mb-6">{news.summary}</p>
            <div dangerouslySetInnerHTML={{ __html: news.content }} />
          </div>
          
          {/* Tags */}
          {news.tags && news.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-sm font-medium mb-2">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {news.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 text-xs rounded-full bg-academia-50 text-academia-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Related News */}
        {relatedNews.length > 0 && (
          <section className="max-w-6xl mx-auto mt-16 border-t pt-12">
            <h2 className="text-2xl font-serif font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedNews.map(item => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          </section>
        )}
      </article>
    </MainLayout>
  );
};

export default NewsDetail;

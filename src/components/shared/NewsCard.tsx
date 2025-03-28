
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { News } from "@/models/news.model";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface NewsCardProps {
  news: News;
  compact?: boolean;
}

const NewsCard = ({ news, compact = false }: NewsCardProps) => {
  const formattedDate = formatDistanceToNow(new Date(news.publishDate), { addSuffix: true });

  if (compact) {
    return (
      <Card className="h-full transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg leading-tight line-clamp-2">
            <Link to={`/news/${news.id}`} className="hover:text-primary">
              {news.title}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-2">{formattedDate} • {news.authorName}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full transition-all hover:shadow-md overflow-hidden flex flex-col">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={news.imageUrl} 
          alt={news.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-2">
          <Link to={`/news/${news.id}`} className="hover:text-primary">
            {news.title}
          </Link>
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {formattedDate} • {news.authorName}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-3 text-muted-foreground">{news.summary}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="gap-2">
          <Link to={`/news/${news.id}`}>
            <BookOpen size={16} />
            Ler mais
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;

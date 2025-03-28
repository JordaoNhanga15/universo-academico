
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";
import NewsCard from "@/components/shared/NewsCard";
import { News } from "@/models/news.model";
import { getFeaturedNews, getNewsItems } from "@/services/news.service";
import { ChevronRight } from "lucide-react";

const Home = () => {
  const [featuredNews, setFeaturedNews] = useState<News[]>([]);
  const [recentNews, setRecentNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuredData, recentData] = await Promise.all([
          getFeaturedNews(),
          getNewsItems(1, 3)
        ]);
        
        setFeaturedNews(featuredData);
        setRecentNews(recentData.news);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MainLayout>
      {/* Hero Section with Featured News */}
      <section className="bg-academia-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-6">
                Discover the Latest in Academic Research & News
              </h1>
              <p className="text-academia-100 text-lg mb-8">
                Stay informed with groundbreaking research, educational insights, and academic developments from around the world.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-academia-600 hover:bg-academia-50">
                  <Link to="/news">Browse All News</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-academia-600">
                  <Link to="/register">Subscribe</Link>
                </Button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="aspect-[3/2] bg-academia-500 animate-pulse rounded-lg"></div>
            ) : featuredNews.length > 0 ? (
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src={featuredNews[0].imageUrl} 
                  alt={featuredNews[0].title} 
                  className="w-full aspect-[3/2] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <span className="text-academia-100 text-sm mb-2">Featured</span>
                  <h3 className="text-2xl font-bold mb-2">
                    <Link to={`/news/${featuredNews[0].id}`} className="hover:underline">
                      {featuredNews[0].title}
                    </Link>
                  </h3>
                  <p className="text-academia-100 mb-4 line-clamp-2">{featuredNews[0].summary}</p>
                  <Button asChild variant="outline" size="sm" className="w-fit border-white text-white hover:bg-white hover:text-academia-600">
                    <Link to={`/news/${featuredNews[0].id}`}>Read More</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="aspect-[3/2] bg-academia-500 rounded-lg flex items-center justify-center">
                No featured news available
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Recent News Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold">Recent Publications</h2>
            <Button asChild variant="link" className="gap-1">
              <Link to="/news">
                View All <ChevronRight size={16} />
              </Link>
            </Button>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted animate-pulse"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-6 bg-muted animate-pulse rounded"></div>
                    <div className="h-4 bg-muted animate-pulse rounded w-1/2"></div>
                    <div className="h-16 bg-muted animate-pulse rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentNews.map(news => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Subscribe Section */}
      <section className="py-16 bg-academia-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">Stay Informed with Universo Academia</h2>
            <p className="text-muted-foreground">
              Subscribe to our newsletter and never miss important academic news and breakthroughs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-academia-100 text-academia-600 rounded-full flex items-center justify-center mb-4">1</div>
              <h3 className="text-xl font-medium mb-2">Curated Content</h3>
              <p className="text-muted-foreground">
                Receive hand-selected articles and news tailored to your academic interests.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-academia-100 text-academia-600 rounded-full flex items-center justify-center mb-4">2</div>
              <h3 className="text-xl font-medium mb-2">Expert Analysis</h3>
              <p className="text-muted-foreground">
                Get insights from experts who break down complex research into accessible content.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-academia-100 text-academia-600 rounded-full flex items-center justify-center mb-4">3</div>
              <h3 className="text-xl font-medium mb-2">Stay Updated</h3>
              <p className="text-muted-foreground">
                Keep up with the rapidly evolving academic world with our timely updates.
              </p>
            </div>
          </div>

          <div className="max-w-xl mx-auto mt-12">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-4 text-center">Subscribe to Our Newsletter</h3>
              <SubscriptionForm />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;

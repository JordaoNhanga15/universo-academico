
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import NewsCard from "@/components/shared/NewsCard";
import CategoryFilter from "@/components/shared/CategoryFilter";
import CustomPagination from "@/components/shared/CustomPagination";
import { getNewsItems } from "@/services/news.service";
import { News } from "@/models/news.model";
import { Skeleton } from "@/components/ui/skeleton";

const ITEMS_PER_PAGE = 6;

const NewsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const categoryParam = searchParams.get("category");
  const categoryId = categoryParam ? parseInt(categoryParam) : undefined;
  
  const [news, setNews] = useState<News[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Calcular total de páginas
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const result = await getNewsItems(currentPage, ITEMS_PER_PAGE, categoryId);
        setNews(result.news);
        setTotalItems(result.total);
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [currentPage, categoryId]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategorySelect = (selectedCategoryId?: number) => {
    const params = new URLSearchParams();
    params.set("page", "1"); // Resetar para a página 1 ao mudar de categoria
    if (selectedCategoryId) {
      params.set("category", selectedCategoryId.toString());
    }
    setSearchParams(params);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Notícias e Publicações Acadêmicas</h1>
          <p className="text-muted-foreground">
            Descubra as últimas pesquisas, insights educacionais e desenvolvimentos acadêmicos de todo o mundo.
          </p>
        </div>

        {/* Filtro de Categoria */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-3">Filtrar por Categoria</h2>
          <CategoryFilter 
            selectedCategoryId={categoryId} 
            onSelectCategory={handleCategorySelect} 
          />
        </div>

        {/* Grade de Notícias */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <div className="p-6 space-y-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">Nenhum artigo encontrado</h3>
            <p className="text-muted-foreground">
              Nenhum artigo corresponde aos seus critérios de filtro atuais. Tente selecionar uma categoria diferente.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map(item => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        )}

        {/* Paginação */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-12">
            <CustomPagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default NewsList;

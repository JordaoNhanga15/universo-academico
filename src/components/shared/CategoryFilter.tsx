
import { Category } from "@/models/category.model";
import { useEffect, useState } from "react";
import { getCategories } from "@/services/news.service";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  selectedCategoryId?: number;
  onSelectCategory: (categoryId?: number) => void;
}

const CategoryFilter = ({ selectedCategoryId, onSelectCategory }: CategoryFilterProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return <div className="flex flex-wrap gap-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-9 w-24 rounded-md bg-muted animate-pulse"></div>
      ))}
    </div>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedCategoryId === undefined ? "default" : "outline"}
        onClick={() => onSelectCategory(undefined)}
        className="font-normal"
      >
        All
      </Button>
      
      {categories.map(category => (
        <Button
          key={category.id}
          variant={selectedCategoryId === category.id ? "default" : "outline"}
          onClick={() => onSelectCategory(category.id)}
          className={cn("font-normal")}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;

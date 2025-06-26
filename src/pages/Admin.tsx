import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Eye, EyeOff, Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";

import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { 
  getAllNews, 
  getCategories, 
  createNewsItem, 
  toggleNewsVisibility, 
  deleteNewsItem,
  updateNewsItem 
} from "@/services/news.service";
import { News } from "@/models/news.model";
import { Category } from "@/models/category.model";

const Admin = () => {
  const { user } = useAuth();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentNews, setCurrentNews] = useState<News | null>(null);
  const [newsForm, setNewsForm] = useState({
    title: "",
    summary: "",
    content: "",
    imageUrl: "",
    authorName: "",
    categoryId: 0,
    featured: false,
    tags: ""
  });

  // Query to get all news without pagination
  const { data: newsData, isLoading: newsLoading, refetch: refetchNews } = useQuery({
    queryKey: ['admin-news'],
    queryFn: () => getAllNews(),
  });

  // Query to get all categories for the dropdown
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  // Reset form state
  const resetForm = () => {
    setNewsForm({
      title: "",
      summary: "",
      content: "",
      imageUrl: "",
      authorName: "",
      categoryId: 0,
      featured: false,
      tags: ""
    });
  };

  // Set form values for editing
  const handleEditNews = (news: News) => {
    setCurrentNews(news);
    setNewsForm({
      title: news.title,
      summary: news.summary,
      content: news.content,
      imageUrl: news.imageUrl,
      authorName: news.authorName,
      categoryId: news.categoryId,
      featured: news.featured || false,
      tags: news.tags ? news.tags.join(", ") : ""
    });
    setIsEditDialogOpen(true);
  };

  // Handle create news submission
  const handleCreateNews = async () => {
    try {
      const tagsArray = newsForm.tags ? newsForm.tags.split(",").map(tag => tag.trim()) : [];
      await createNewsItem({
        ...newsForm,
        tags: tagsArray,
        publishDate: new Date().toISOString()
      });
      toast.success("Notícia criada com sucesso");
      resetForm();
      setIsCreateDialogOpen(false);
      refetchNews();
    } catch (error) {
      toast.error("Falha ao criar notícia");
      console.error(error);
    }
  };

  // Handle update news submission
  const handleUpdateNews = async () => {
    if (!currentNews) return;
    
    try {
      const tagsArray = newsForm.tags ? newsForm.tags.split(",").map(tag => tag.trim()) : [];
      await updateNewsItem(currentNews.id, {
        ...newsForm,
        tags: tagsArray
      });
      toast.success("Notícia atualizada com sucesso");
      setIsEditDialogOpen(false);
      refetchNews();
    } catch (error) {
      toast.error("Falha ao atualizar notícia");
      console.error(error);
    }
  };

  // Handle news visibility toggle
  const handleToggleVisibility = async (newsId: number, currentlyHidden: boolean) => {
    try {
      await toggleNewsVisibility(newsId, !currentlyHidden);
      toast.success(`Notícia ${currentlyHidden ? 'publicada' : 'despublicada'} com sucesso`);
      refetchNews();
    } catch (error) {
      toast.error(`Falha ao ${currentlyHidden ? 'publicar' : 'despublicar'} notícia`);
      console.error(error);
    }
  };

  // Handle news deletion
  const handleDeleteNews = async (newsId: number) => {
    if (confirm("Tem certeza que deseja eliminar esta notícia? Esta ação não pode ser desfeita.")) {
      try {
        await deleteNewsItem(newsId);
        toast.success("Notícia eliminada com sucesso");
        refetchNews();
      } catch (error) {
        toast.error("Falha ao eliminar notícia");
        console.error(error);
      }
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewsForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setNewsForm(prev => ({ ...prev, [name]: name === 'categoryId' ? parseInt(value) : value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNewsForm(prev => ({ ...prev, [name]: checked }));
  };

  if (!user || user.role !== "admin") {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Acesso Negado</h1>
          <p>Você não tem permissão para acessar esta página.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-serif font-bold">Gestão de Notícias</h1>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus size={16} />
                Criar Notícia
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Criar Notícia</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes para criar uma nova notícia.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      name="title"
                      value={newsForm.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="authorName">Autor</Label>
                    <Input
                      id="authorName"
                      name="authorName"
                      value={newsForm.authorName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="summary">Resumo</Label>
                  <Textarea
                    id="summary"
                    name="summary"
                    value={newsForm.summary}
                    onChange={handleInputChange}
                    rows={2}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Conteúdo</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={newsForm.content}
                    onChange={handleInputChange}
                    rows={6}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">URL da Imagem</Label>
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      value={newsForm.imageUrl}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="categoryId">Categoria</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange('categoryId', value)}
                      defaultValue={newsForm.categoryId.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((category: Category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={newsForm.tags}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={newsForm.featured}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="featured">Notícia em destaque</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleCreateNews}>Criar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Editar Notícia</DialogTitle>
              <DialogDescription>
                Atualize os detalhes desta notícia.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Título</Label>
                  <Input
                    id="edit-title"
                    name="title"
                    value={newsForm.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-authorName">Autor</Label>
                  <Input
                    id="edit-authorName"
                    name="authorName"
                    value={newsForm.authorName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-summary">Resumo</Label>
                <Textarea
                  id="edit-summary"
                  name="summary"
                  value={newsForm.summary}
                  onChange={handleInputChange}
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-content">Conteúdo</Label>
                <Textarea
                  id="edit-content"
                  name="content"
                  value={newsForm.content}
                  onChange={handleInputChange}
                  rows={6}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-imageUrl">URL da Imagem</Label>
                  <Input
                    id="edit-imageUrl"
                    name="imageUrl"
                    value={newsForm.imageUrl}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-categoryId">Categoria</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('categoryId', value)}
                    value={newsForm.categoryId.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category: Category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-tags">Tags (separadas por vírgula)</Label>
                <Input
                  id="edit-tags"
                  name="tags"
                  value={newsForm.tags}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-featured"
                  name="featured"
                  checked={newsForm.featured}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="edit-featured">Notícia em destaque</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleUpdateNews}>Atualizar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* News Table */}
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          {newsLoading ? (
            <div className="p-8 text-center">Carregando notícias...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newsData?.map((news: News) => {
                  const isHidden = news.hidden === true;
                  const category = categories?.find(cat => cat.id === news.categoryId);
                  return (
                    <TableRow key={news.id}>
                      <TableCell className="font-medium">{news.title}</TableCell>
                      <TableCell>{category?.name || 'Desconhecida'}</TableCell>
                      <TableCell>{news.authorName}</TableCell>
                      <TableCell>{new Date(news.publishDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {isHidden ? (
                          <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Despublicada</span>
                        ) : (
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Publicada</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleToggleVisibility(news.id, isHidden)}
                          >
                            {isHidden ? <Eye size={16} /> : <EyeOff size={16} />}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditNews(news)}
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteNews(news.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {newsData?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Nenhuma notícia encontrada. Crie seu primeiro artigo!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Admin;
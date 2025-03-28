
import { News } from "@/models/news.model";
import { Category } from "@/models/category.model";

// Mock data for development
const CATEGORIES: Category[] = [
  { id: 1, name: "Ciência", slug: "ciencia", description: "Últimas descobertas e pesquisas científicas" },
  { id: 2, name: "Humanidades", slug: "humanidades", description: "História, literatura e estudos culturais" },
  { id: 3, name: "Tecnologia", slug: "tecnologia", description: "Inovações e aplicações tecnológicas" },
  { id: 4, name: "Artes", slug: "artes", description: "Atualizações sobre artes visuais e performáticas" },
  { id: 5, name: "Educação", slug: "educacao", description: "Políticas e desenvolvimentos educacionais" },
];

const NEWS_ITEMS: News[] = [
  {
    id: 1,
    title: "Nova Pesquisa Revela Potencial Avanço na Computação Quântica",
    summary: "Cientistas descobriram uma nova abordagem para estabilização de bits quânticos que pode revolucionar a computação quântica.",
    content: `<p>Pesquisadores do Instituto de Inovação Quântica anunciaram um avanço na estabilização de bits quânticos (qubits), potencialmente resolvendo um dos maiores obstáculos no desenvolvimento da computação quântica.</p>
    <p>"Essa descoberta pode acelerar o desenvolvimento de computadores quânticos práticos em vários anos", disse a pesquisadora principal Dra. Maria Chen. "Ao usar uma nova abordagem para manter a coerência quântica, conseguimos estender a estabilidade dos qubits por ordens de magnitude."</p>
    <p>A pesquisa, publicada hoje no Journal of Quantum Physics, demonstra uma técnica inovadora para proteger qubits da interferência ambiental, um dos principais desafios no desenvolvimento de computadores quânticos práticos.</p>
    <p>Este avanço pode ter implicações significativas em áreas que vão da criptografia à descoberta de medicamentos, potencialmente permitindo tarefas computacionais que seriam impossíveis com computadores clássicos.</p>`,
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
    publishDate: "2023-06-15T09:30:00Z",
    authorName: "Dra. Maria Chen",
    categoryId: 1,
    featured: true,
    tags: ["quântica", "computação", "pesquisa", "tecnologia"],
  },
  {
    id: 2,
    title: "Descoberta Arqueológica Reescreve História da Humanidade",
    summary: "Novos achados na África Oriental sugerem que a civilização humana pode ser milhares de anos mais antiga do que se pensava anteriormente.",
    content: `<p>Uma expedição arqueológica na África Oriental descobriu evidências que poderiam alterar fundamentalmente nossa compreensão da civilização humana primitiva. Os achados sugerem que assentamentos humanos organizados existiam até 5.000 anos antes do que se estabeleceu anteriormente.</p>
    <p>"Essas descobertas desafiam tudo o que pensávamos saber sobre o cronograma do desenvolvimento humano", explicou o arqueólogo principal da expedição, Dr. Jonathan Mbeki. "A complexidade das estruturas e artefatos indica uma sociedade sofisticada que existia milênios antes do que as teorias atuais sugerem."</p>
    <p>O sítio contém evidências de estruturas sociais complexas, práticas agrícolas iniciais e até sistemas de escrita primitivos que antecedem exemplos conhecidos em milhares de anos.</p>
    <p>Essa descoberta pode exigir que os historiadores reconsiderem toda a cronologia da civilização e desenvolvimento humanos.</p>`,
    imageUrl: "https://images.unsplash.com/photo-1575505586569-646b2ca898fc",
    publishDate: "2023-07-02T14:15:00Z",
    authorName: "Dr. Jonathan Mbeki",
    categoryId: 2,
    tags: ["arqueologia", "história", "antropologia"],
  },
  {
    id: 3,
    title: "Sistema de IA Demonstra Compreensão Inédita da Linguagem",
    summary: "Um novo modelo de inteligência artificial mostra uma compreensão notável da comunicação humana com nuances.",
    content: `<p>Cientistas da computação desenvolveram um sistema de IA que demonstra uma compreensão inédita da linguagem contextual, incluindo expressões idiomáticas, referências culturais e significados implícitos.</p>
    <p>"O que torna este sistema único é sua capacidade de entender a linguagem como os humanos, incluindo o contexto cultural e implicações não declaradas", disse a líder do projeto, Dra. Sophia Park.</p>
    <p>Ao contrário dos modelos de linguagem anteriores que dependem principalmente do reconhecimento de padrões, este novo sistema incorpora elementos da ciência cognitiva e da linguística para alcançar uma compreensão semântica mais profunda.</p>
    <p>A tecnologia pode revolucionar a interação humano-computador, tornando assistentes digitais, serviços de tradução e outras tecnologias baseadas em linguagem significativamente mais eficazes e naturais.</p>`,
    imageUrl: "https://images.unsplash.com/photo-1677442135136-760c813dce9b",
    publishDate: "2023-07-10T11:45:00Z",
    authorName: "Dra. Sophia Park",
    categoryId: 3,
    featured: true,
    tags: ["inteligência artificial", "linguagem", "tecnologia"],
  },
  {
    id: 4,
    title: "Nova Metodologia de Ensino Mostra Melhoria Dramática nos Resultados de Aprendizagem",
    summary: "Educadores relatam ganhos significativos no desempenho dos alunos usando uma nova abordagem interdisciplinar.",
    content: `<p>Um estudo de cinco anos em várias instituições educacionais demonstrou que uma nova metodologia de ensino interdisciplinar melhora significativamente os resultados de aprendizagem em todas as áreas do conhecimento.</p>
    <p>"Ao integrar conceitos entre as fronteiras tradicionais das disciplinas e enfatizar a aplicação prática, estamos vendo os alunos não apenas reterem melhor as informações, mas desenvolverem habilidades de pensamento crítico mais fortes", explicou o pesquisador educacional Dr. James Wong.</p>
    <p>A abordagem, conhecida como Aprendizagem Conceitual Integrada (ICL), combina elementos de aprendizado baseado em projetos, modelos de sala de aula invertida e conexões interdisciplinares para criar uma experiência educacional mais coesa.</p>
    <p>As escolas que implementaram o ICL relataram uma melhoria média de 35% nas pontuações dos testes padronizados e um engajamento significativamente maior dos alunos.</p>`,
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45",
    publishDate: "2023-08-05T10:00:00Z",
    authorName: "Dr. James Wong",
    categoryId: 5,
    tags: ["educação", "ensino", "metodologia", "aprendizagem"],
  },
  {
    id: 5,
    title: "Pesquisa Climática Revela Mecanismo Inesperado de Sequestro de Carbono",
    summary: "Cientistas descobrem um processo natural anteriormente desconhecido que captura carbono atmosférico.",
    content: `<p>Cientistas climáticos identificaram um mecanismo anteriormente desconhecido pelo qual certas formações geológicas capturam e sequestram ativamente dióxido de carbono atmosférico em taxas muito superiores às estimativas anteriores.</p>
    <p>"Essa descoberta não resolve a crise climática, mas revela que os sistemas naturais da Terra para a gestão do carbono são mais complexos e potencialmente mais resilientes do que entendíamos", disse a geóloga Dra. Amara Okafor.</p>
    <p>A pesquisa, conduzida em vários continentes ao longo de sete anos, identificou formações minerais específicas que, sob certas condições, podem absorver carbono atmosférico em taxas até 30 vezes superiores aos sumidouros de carbono típicos.</p>
    <p>Essa descoberta poderia informar novas abordagens para sistemas de captura de carbono projetados e fornecer uma compreensão mais precisa dos ciclos globais de carbono.</p>`,
    imageUrl: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21",
    publishDate: "2023-08-12T16:20:00Z",
    authorName: "Dra. Amara Okafor",
    categoryId: 1,
    tags: ["clima", "sequestro de carbono", "ciência ambiental"],
  },
  {
    id: 6,
    title: "Nova Técnica Permite Observação Direta do Emaranhamento Quântico",
    summary: "Físicos desenvolvem método para visualizar efeitos do emaranhamento quântico em tempo real.",
    content: `<p>Uma equipe de físicos desenvolveu uma técnica inovadora que permite a observação direta do emaranhamento quântico, um fenômeno que Albert Einstein chamou de "ação fantasmagórica à distância".</p>
    <p>"Até agora, só podíamos inferir o emaranhamento indiretamente através de medições estatísticas", explicou o pesquisador principal Dr. Hiroshi Tanaka. "Este novo método nos permite observar os efeitos do emaranhamento à medida que ocorrem."</p>
    <p>A técnica combina métodos avançados de imagem com novos sensores quânticos para visualizar como os estados quânticos das partículas emaranhadas se correlacionam, independentemente da distância entre elas.</p>
    <p>Além de suas implicações profundas para a física fundamental, esse desenvolvimento pode acelerar aplicações práticas em computação quântica, comunicações seguras e criptografia quântica.</p>`,
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
    publishDate: "2023-08-20T13:10:00Z",
    authorName: "Dr. Hiroshi Tanaka",
    categoryId: 1,
    tags: ["física quântica", "emaranhamento", "pesquisa"],
  }
];

// Service functions
export const getNewsItems = (page = 1, limit = 3, categoryId?: number): Promise<{news: News[], total: number}> => {
  // Filter by category if provided
  let filteredNews = categoryId 
    ? NEWS_ITEMS.filter(news => news.categoryId === categoryId) 
    : NEWS_ITEMS;
  
  // Filter out hidden news for non-admin views
  filteredNews = filteredNews.filter(news => !news.hidden);
  
  // Sort by publish date (newest first)
  filteredNews = [...filteredNews].sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedNews = filteredNews.slice(startIndex, endIndex);
  
  return Promise.resolve({
    news: paginatedNews,
    total: filteredNews.length
  });
};

export const getNewsItemById = (id: number): Promise<News | undefined> => {
  const news = NEWS_ITEMS.find(item => item.id === id);
  return Promise.resolve(news);
};

export const getCategories = (): Promise<Category[]> => {
  return Promise.resolve(CATEGORIES);
};

export const getFeaturedNews = (): Promise<News[]> => {
  return Promise.resolve(NEWS_ITEMS.filter(news => news.featured && !news.hidden));
};

// Admin functions
export const getAllNews = (): Promise<News[]> => {
  // Return all news, including hidden ones, sorted by date (newest first)
  const sortedNews = [...NEWS_ITEMS].sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
  return Promise.resolve(sortedNews);
};

export const createNewsItem = (newsData: Partial<News>): Promise<News> => {
  // Simulate creating a new news item
  const newId = Math.max(...NEWS_ITEMS.map(item => item.id)) + 1;
  
  const newNewsItem: News = {
    id: newId,
    title: newsData.title || "Untitled",
    summary: newsData.summary || "",
    content: newsData.content || "",
    imageUrl: newsData.imageUrl || "https://images.unsplash.com/photo-1575505586569-646b2ca898fc",
    publishDate: newsData.publishDate || new Date().toISOString(),
    authorName: newsData.authorName || "Unknown Author",
    categoryId: newsData.categoryId || 1,
    featured: newsData.featured || false,
    tags: newsData.tags || [],
  };
  
  NEWS_ITEMS.push(newNewsItem);
  return Promise.resolve(newNewsItem);
};

export const updateNewsItem = (id: number, updateData: Partial<News>): Promise<News> => {
  // Find the news item to update
  const index = NEWS_ITEMS.findIndex(item => item.id === id);
  
  if (index === -1) {
    return Promise.reject(new Error("News item not found"));
  }
  
  // Update the news item
  NEWS_ITEMS[index] = {
    ...NEWS_ITEMS[index],
    ...updateData,
  };
  
  return Promise.resolve(NEWS_ITEMS[index]);
};

export const toggleNewsVisibility = (id: number, hidden: boolean): Promise<News> => {
  // Find the news item to toggle
  const index = NEWS_ITEMS.findIndex(item => item.id === id);
  
  if (index === -1) {
    return Promise.reject(new Error("News item not found"));
  }
  
  // Toggle visibility
  NEWS_ITEMS[index] = {
    ...NEWS_ITEMS[index],
    hidden,
  };
  
  return Promise.resolve(NEWS_ITEMS[index]);
};

export const deleteNewsItem = (id: number): Promise<boolean> => {
  // Find the news item index
  const index = NEWS_ITEMS.findIndex(item => item.id === id);
  
  if (index === -1) {
    return Promise.reject(new Error("News item not found"));
  }
  
  // Remove the news item from the array
  NEWS_ITEMS.splice(index, 1);
  
  return Promise.resolve(true);
};

// Future functions for user interactions
export const subscribeToNewsletter = (email: string): Promise<boolean> => {
  // Simulate API call
  console.log(`Subscribing email: ${email}`);
  return Promise.resolve(true);
};

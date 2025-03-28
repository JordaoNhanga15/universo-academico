
import { News } from "@/models/news.model";
import { Category } from "@/models/category.model";

// Mock data for development
const CATEGORIES: Category[] = [
  { id: 1, name: "Science", slug: "science", description: "Latest scientific discoveries and research" },
  { id: 2, name: "Humanities", slug: "humanities", description: "History, literature, and cultural studies" },
  { id: 3, name: "Technology", slug: "technology", description: "Technology innovations and applications" },
  { id: 4, name: "Arts", slug: "arts", description: "Visual and performing arts updates" },
  { id: 5, name: "Education", slug: "education", description: "Educational policies and developments" },
];

const NEWS_ITEMS: News[] = [
  {
    id: 1,
    title: "New Research Reveals Potential Breakthrough in Quantum Computing",
    summary: "Scientists have discovered a novel approach to quantum bit stabilization that could revolutionize quantum computing.",
    content: `<p>Researchers at the Institute for Quantum Innovation have announced a breakthrough in quantum bit (qubit) stabilization, potentially solving one of the biggest obstacles in quantum computing development.</p>
    <p>"This discovery could accelerate the development of practical quantum computers by several years," said lead researcher Dr. Maria Chen. "By using a new approach to maintaining quantum coherence, we've been able to extend qubit stability by orders of magnitude."</p>
    <p>The research, published today in the Journal of Quantum Physics, demonstrates a novel technique for protecting qubits from environmental interference, one of the primary challenges in developing practical quantum computers.</p>
    <p>This breakthrough could have significant implications for fields ranging from cryptography to drug discovery, potentially enabling computational tasks that would be impossible with classical computers.</p>`,
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
    publishDate: "2023-06-15T09:30:00Z",
    authorName: "Dr. Maria Chen",
    categoryId: 1,
    featured: true,
    tags: ["quantum", "computing", "research", "technology"],
  },
  {
    id: 2,
    title: "Archaeological Discovery Rewrites Early Human History",
    summary: "New findings in East Africa suggest human civilization may be thousands of years older than previously thought.",
    content: `<p>An archaeological expedition in East Africa has uncovered evidence that could fundamentally alter our understanding of early human civilization. The findings suggest organized human settlements existed up to 5,000 years earlier than previously established.</p>
    <p>"These discoveries challenge everything we thought we knew about the timeline of human development," explained Dr. Jonathan Mbeki, lead archaeologist on the expedition. "The complexity of the structures and artifacts indicates a sophisticated society that existed millennia before what current theories suggest."</p>
    <p>The site contains evidence of complex social structures, early agricultural practices, and even primitive writing systems that predate known examples by thousands of years.</p>
    <p>This discovery may require historians to reconsider the entire chronology of human civilization and development.</p>`,
    imageUrl: "https://images.unsplash.com/photo-1575505586569-646b2ca898fc",
    publishDate: "2023-07-02T14:15:00Z",
    authorName: "Dr. Jonathan Mbeki",
    categoryId: 2,
    tags: ["archaeology", "history", "anthropology"],
  },
  {
    id: 3,
    title: "AI System Demonstrates Unprecedented Language Understanding",
    summary: "A new artificial intelligence model shows remarkable comprehension of nuanced human communication.",
    content: `<p>Computer scientists have developed an AI system that demonstrates unprecedented understanding of contextual language, including idioms, cultural references, and implied meanings.</p>
    <p>"What makes this system unique is its ability to understand language the way humans do, including cultural context and unstated implications," said Dr. Sophia Park, the project lead.</p>
    <p>Unlike previous language models that rely primarily on pattern recognition, this new system incorporates elements of cognitive science and linguistics to achieve a deeper semantic understanding.</p>
    <p>The technology could revolutionize human-computer interaction, making digital assistants, translation services, and other language-based technologies significantly more effective and natural.</p>`,
    imageUrl: "https://images.unsplash.com/photo-1677442135136-760c813dce9b",
    publishDate: "2023-07-10T11:45:00Z",
    authorName: "Dr. Sophia Park",
    categoryId: 3,
    featured: true,
    tags: ["artificial intelligence", "language", "technology"],
  },
  {
    id: 4,
    title: "Novel Teaching Methodology Shows Dramatic Improvement in Learning Outcomes",
    summary: "Educators report significant gains in student performance using a new interdisciplinary approach.",
    content: `<p>A five-year study across multiple educational institutions has demonstrated that a new interdisciplinary teaching methodology significantly improves learning outcomes across all subject areas.</p>
    <p>"By integrating concepts across traditional subject boundaries and emphasizing practical application, we're seeing students not only retain information better but develop stronger critical thinking skills," explained education researcher Dr. James Wong.</p>
    <p>The approach, known as Integrated Conceptual Learning (ICL), combines elements of project-based learning, flipped classroom models, and cross-disciplinary connections to create a more cohesive educational experience.</p>
    <p>Schools implementing ICL reported an average 35% improvement in standardized test scores and significantly higher student engagement.</p>`,
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45",
    publishDate: "2023-08-05T10:00:00Z",
    authorName: "Dr. James Wong",
    categoryId: 5,
    tags: ["education", "teaching", "methodology", "learning"],
  },
  {
    id: 5,
    title: "Climate Research Reveals Unexpected Carbon Sequestration Mechanism",
    summary: "Scientists discover a previously unknown natural process that captures atmospheric carbon.",
    content: `<p>Climate scientists have identified a previously unknown mechanism by which certain geological formations actively capture and sequester atmospheric carbon dioxide at rates far exceeding previous estimates.</p>
    <p>"This discovery doesn't solve the climate crisis, but it does reveal that the Earth's natural systems for carbon management are more complex and potentially more resilient than we've understood," said geologist Dr. Amara Okafor.</p>
    <p>The research, conducted across multiple continents over seven years, identified specific mineral formations that, under certain conditions, can absorb atmospheric carbon at rates up to 30 times higher than typical carbon sinks.</p>
    <p>This finding could inform new approaches to engineered carbon capture systems and provide a more accurate understanding of global carbon cycles.</p>`,
    imageUrl: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21",
    publishDate: "2023-08-12T16:20:00Z",
    authorName: "Dr. Amara Okafor",
    categoryId: 1,
    tags: ["climate", "carbon sequestration", "environmental science"],
  },
  {
    id: 6,
    title: "New Technique Allows Direct Observation of Quantum Entanglement",
    summary: "Physicists develop method to visualize quantum entanglement effects in real-time.",
    content: `<p>A team of physicists has developed a groundbreaking technique that allows for the direct observation of quantum entanglement, a phenomenon Albert Einstein famously referred to as "spooky action at a distance."</p>
    <p>"Until now, we could only infer entanglement indirectly through statistical measurements," explained lead researcher Dr. Hiroshi Tanaka. "This new method allows us to actually observe the effects of entanglement as they occur."</p>
    <p>The technique combines advanced imaging methods with novel quantum sensors to visualize how the quantum states of entangled particles correlate regardless of the distance between them.</p>
    <p>Beyond its profound implications for fundamental physics, this development could accelerate practical applications in quantum computing, secure communications, and quantum cryptography.</p>`,
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
    publishDate: "2023-08-20T13:10:00Z",
    authorName: "Dr. Hiroshi Tanaka",
    categoryId: 1,
    tags: ["quantum physics", "entanglement", "research"],
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

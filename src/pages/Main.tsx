import { Card, CardContent } from "@/components/ui/card";
import { useStore } from "@/stores";
import { ArrowRight, Bell, Newspaper } from "lucide-react";

interface NewsArticle {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  featured?: boolean;
}

const NEWS: NewsArticle[] = [
  {
    id: 1,
    category: "Announcement",
    title: "Annual General Assembly 2025: Save the Date",
    excerpt:
      "The Board of Directors cordially invites all members to the Annual General Assembly on April 12, 2025. Key agenda includes the approval of the FY2024 dividend rate and the election of new board members.",
    date: "Mar 10, 2025",
    imageUrl:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
    featured: true,
  },
  {
    id: 2,
    category: "Finance",
    title: "FY2024 Dividend Rate Declared at 8.5%",
    excerpt:
      "The cooperative is pleased to announce a dividend rate of 8.5% for FY2024, one of the highest in our history. Payouts will be credited to member accounts beginning May 5, 2025.",
    date: "Mar 8, 2025",
    imageUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
  },
  {
    id: 3,
    category: "Programs",
    title: "New Savings Program: AgriSave Plus Launched",
    excerpt:
      "Members can now enroll in the new AgriSave Plus time deposit program offering up to 6.2% annual interest for a 12-month term. Enrollment is open until April 30, 2025.",
    date: "Mar 5, 2025",
    imageUrl:
      "https://images.unsplash.com/photo-1554244933-d876deb6b2ff?w=600&q=80",
  },
  {
    id: 4,
    category: "Community",
    title: "Livelihood Training Workshop for Member-Farmers",
    excerpt:
      "The cooperative, in partnership with the Department of Agriculture, will conduct a free 3-day livelihood training workshop for all member-farmers starting March 22, 2025.",
    date: "Mar 1, 2025",
    imageUrl:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Announcement: "bg-primary/90 text-white",
  Finance: "bg-emerald-600/90 text-white",
  Programs: "bg-violet-600/90 text-white",
  Community: "bg-amber-500/90 text-white",
};

function CategoryBadge({ category }: { category: string }) {
  const cls = CATEGORY_COLORS[category] ?? "bg-muted text-muted-foreground";
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}
    >
      {category}
    </span>
  );
}

function FeaturedArticle({ article }: { article: NewsArticle }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl shadow-md"
      style={{ aspectRatio: "16/9" }}
    >
      <img
        src={article.imageUrl}
        alt={article.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

      <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col gap-2">
        <CategoryBadge category={article.category} />
        <h2 className="text-white font-bold text-base leading-snug line-clamp-2">
          {article.title}
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-white/60 text-xs">{article.date}</span>
          <a
            href="/"
            className="flex items-center gap-1 text-xs font-medium text-white/80 hover:text-white transition-colors"
          >
            Read more <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

function ArticleCard({ article }: { article: NewsArticle }) {
  return (
    <Card className="overflow-hidden">
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "16/9" }}
      >
        <img
          src={article.imageUrl}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 left-2">
          <CategoryBadge category={article.category} />
        </div>
      </div>

      <CardContent className="flex flex-col gap-2 pt-3 pb-4">
        <span className="text-xs text-muted-foreground">{article.date}</span>

        <h3 className="font-semibold text-sm leading-snug line-clamp-2 text-foreground">
          {article.title}
        </h3>

        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
          {article.excerpt}
        </p>

        <a
          href="/"
          className="mt-1 flex items-center gap-1 text-xs font-semibold text-primary hover:underline underline-offset-2 w-fit transition-colors"
        >
          Read More <ArrowRight className="h-3 w-3" />
        </a>
      </CardContent>
    </Card>
  );
}

export default function Main() {
  const {
    authState: { user },
  } = useStore();

  const firstName = user?.member?.firstName;
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const [featured, ...rest] = NEWS;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{greeting},</p>
          <h1 className="leading-tight">
            {firstName ? `${firstName} 👋` : "Welcome 👋"}
          </h1>
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="relative h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
        </button>
      </div>

      <FeaturedArticle article={featured} />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Newspaper className="h-4 w-4 text-primary" />
          <h2 className="text-base">Latest News</h2>
        </div>
        <a
          href="/"
          className="text-xs font-medium text-primary hover:underline underline-offset-2"
        >
          See all
        </a>
      </div>

      <div className="flex flex-col gap-4">
        {rest.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

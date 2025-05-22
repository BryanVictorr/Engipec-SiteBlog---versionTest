import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';
import { formatDateExtended } from '@/lib/utils';

interface ArticleCardProps {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  imageSrc?: string;
  category: string;
}

const ArticleCard = ({ id, title, excerpt, date, imageSrc, category }: ArticleCardProps) => {
  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link to={`/blog/${id}`}>
        {imageSrc && (
          <div className="aspect-video overflow-hidden">
            <img
              src={imageSrc}
              alt={title}
              className="h-full w-full object-cover transition-all duration-500 hover:scale-105"
            />
          </div>
        )}
        <CardContent className="pt-6">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-construction-100 px-2.5 py-0.5 text-xs font-medium text-construction-800">
              {category}
            </span>
          </div>
          <h3 className="mb-2 line-clamp-2 text-xl font-bold">{title}</h3>
          <p className="line-clamp-3 text-muted-foreground">{excerpt}</p>
        </CardContent>
        <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarIcon size={14} className="mr-1" />
            <time dateTime={date}>{formatDateExtended(date)}</time>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ArticleCard;

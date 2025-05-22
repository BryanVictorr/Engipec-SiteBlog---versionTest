import { Link } from 'react-router-dom';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDateExtended } from '@/lib/utils';

interface FeaturedArticleProps {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  imageSrc: string;
  category: string;
}

const FeaturedArticle = ({ id, title, excerpt, date, imageSrc, category }: FeaturedArticleProps) => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-construction-800 text-white">
      <div className="relative">
        <img
          src={imageSrc}
          alt={title}
          className="h-[500px] w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-construction-900 via-construction-900/80 to-transparent"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        <div className="mb-4">
          <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-medium text-white">
            {category}
          </span>
        </div>
        <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">{title}</h2>
        <p className="mb-6 line-clamp-2 max-w-3xl text-gray-200">{excerpt}</p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button asChild className="bg-white text-construction-800 hover:bg-gray-100">
            <Link to={`/blog/${id}`}>Ler artigo completo</Link>
          </Button>
          <div className="flex items-center text-sm text-gray-300">
            <CalendarIcon size={14} className="mr-1" />
            <time dateTime={date}>{formatDateExtended(date)}</time>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;

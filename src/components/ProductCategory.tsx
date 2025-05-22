
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCategoryProps {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
}

const ProductCategory = ({ title, description, imageSrc, link }: ProductCategoryProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-w-16 aspect-h-9 h-64">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="mb-4 text-sm text-gray-200">{description}</p>
        <Link
          to={link}
          className="inline-flex items-center text-sm font-medium text-white hover:text-orange-300"
        >
          Ver produtos <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default ProductCategory;

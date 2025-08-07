import React from "react";
import ArticleList from "./ArticleList";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Article {
    title: string;
    content: string;
}

interface CategorySectionProps {
    category: string;
    articles: Article[];
    isExpanded: boolean;
    toggleCategory: () => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
    category,
    articles,
    isExpanded,
    toggleCategory,
}) => {
    return (
        <div className="border-b border-gray-300 py-4 transition-all duration-200">
            <button
                className="flex items-center justify-between w-full text-left text-2xl font-semibold text-gray-700 hover:text-blue-600 focus:outline-none transition-colors"
                onClick={toggleCategory}
            >
                <span>{category}</span>
                {isExpanded ? (
                    <FaChevronUp className="w-6 h-6 text-gray-500" />
                ) : (
                    <FaChevronDown className="w-6 h-6 text-gray-500" />
                )}
            </button>
            {isExpanded && (
                <div className="mt-4 transition-all duration-300 ease-in-out">
                    <ArticleList articles={articles} />
                </div>
            )}
        </div>
    );
};

export default CategorySection;

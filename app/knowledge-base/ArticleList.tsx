import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Article {
    title: string;
    content: string;
}

interface ArticleListProps {
    articles: Article[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
    const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

    const toggleArticle = (title: string) => {
        setExpandedArticle(expandedArticle === title ? null : title);
    };

    return (
        <div className="space-y-4">
            {articles.map(article => (
                <div
                    key={article.title}
                    className="border rounded-lg shadow-sm p-4 transition-all duration-200 hover:shadow-md"
                >
                    <button
                        className="flex justify-between items-center w-full text-lg font-semibold text-gray-800 hover:text-blue-500 focus:outline-none"
                        onClick={() => toggleArticle(article.title)}
                    >
                        <span>{article.title}</span>
                        {expandedArticle === article.title ? (
                            <FaChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                            <FaChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                    </button>
                    {expandedArticle === article.title && (
                        <p className="text-gray-600 mt-2 transition-all duration-300 ease-in-out">{article.content}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ArticleList;

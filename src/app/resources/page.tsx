"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { resourcesData, Resource } from "@/component/resourcesData";
import { useRouter } from "next/navigation";
import ProtectedRouteWrapper from "@/component/ProtectedRouteWrapper";

type ResourceCategory = "all" | "articles" | "videos" | "exercises" | "books";

export default function ResourcesPage() {
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate fake loading
    setTimeout(() => {
      setFilteredResources(resourcesData);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleCategoryChange = (category: ResourceCategory) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredAndSearchedResources = filteredResources.filter((resource) => {
    const matchesCategory = selectedCategory === "all" || resource.type === selectedCategory;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: ResourceCategory) => {
    switch (category) {
      case "articles":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        );
      case "videos":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
          </svg>
        );
      case "exercises":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        );
      case "books":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
          </svg>
        );
    }
  };

  const getCategoryName = (category: ResourceCategory): string => {
    switch (category) {
      case "all":
        return "All Resources";
      case "articles":
        return "Articles";
      case "videos":
        return "Videos";
      case "exercises":
        return "Exercises";
      case "books":
        return "Books";
    }
  };

  return (
    <ProtectedRouteWrapper>
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      {/* Top Navigation */}
      <div className="flex justify-between items-center p-4 bg-gray-800">
      <button 
        onClick={() => router.back()} 
        className="text-gray-300 hover:text-white flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </button>
        <h1 className="text-xl font-semibold">Mental Health Resources</h1>
        <div className="w-6 h-6">
          {/* Empty div for spacing */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-5xl mx-auto w-full">
        {/* Introduction Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Support for Your Wellbeing</h2>
          <p className="text-gray-300 mb-4">
            Explore our collection of mental health resources, tools, and exercises to support your emotional wellbeing journey.
            These resources are meant to complement your conversations with SinagTala.
          </p>
          <div className="text-sm text-gray-400 italic">
            Note: These resources are for educational purposes and should not replace professional mental health care when needed.
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:ring-pink-500 focus:border-pink-500 outline-none"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`flex items-center px-4 py-2 rounded-md ${
                selectedCategory === "all" ? "bg-pink-700 text-white" : "bg-gray-800 hover:bg-gray-700 text-gray-300"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
              All
            </button>
            {(["articles", "videos", "exercises", "books"] as ResourceCategory[]).map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`flex items-center px-4 py-2 rounded-md ${
                  selectedCategory === category ? "bg-pink-700 text-white" : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                }`}
              >
                <span className="mr-2">{getCategoryIcon(category)}</span>
                {getCategoryName(category)}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <>
            {/* Featured Resources (if any) */}
            {selectedCategory === "all" && filteredAndSearchedResources.some((r) => r.isFeatured) && (
              <div className="mb-8">
                <h2 className="text-lg font-medium mb-4 border-b border-gray-700 pb-2">Featured Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredAndSearchedResources
                    .filter((resource) => resource.isFeatured)
                    .map((resource) => (
                      <a
                        key={resource.id}
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex bg-gray-800 hover:bg-gray-700 rounded-lg overflow-hidden transition-colors h-full"
                      >
                        <div className="w-1/3 bg-gray-700 relative">
                          <div className="absolute top-0 left-0 bg-pink-700 text-xs text-white px-2 py-1 rounded-br-md">
                            {getCategoryName(resource.type)}
                          </div>
                          <div className="h-full flex items-center justify-center text-pink-500">
                            {getCategoryIcon(resource.type)}
                          </div>
                        </div>
                        <div className="w-2/3 p-4">
                          <h3 className="font-medium text-lg mb-1">{resource.title}</h3>
                          <p className="text-gray-400 text-sm mb-2 line-clamp-3">{resource.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {resource.tags.slice(0, 2).map((tag, i) => (
                              <span key={i} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                            {resource.tags.length > 2 && (
                              <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                                +{resource.tags.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </a>
                    ))}
                </div>
              </div>
            )}

            {/* All Resources */}
            <div>
              <h2 className="text-lg font-medium mb-4 border-b border-gray-700 pb-2">
                {selectedCategory === "all" ? "All Resources" : getCategoryName(selectedCategory)}
                {filteredAndSearchedResources.length > 0 && (
                  <span className="text-gray-400 text-sm ml-2">({filteredAndSearchedResources.length})</span>
                )}
              </h2>
              {filteredAndSearchedResources.length === 0 ? (
                <div className="text-center py-12 bg-gray-800 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-4 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <p className="text-gray-400">No resources found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchQuery("");
                    }}
                    className="mt-4 px-4 py-2 bg-pink-700 hover:bg-pink-600 rounded-md text-white transition-colors"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredAndSearchedResources
                    .filter((resource) => selectedCategory === "all" ? !resource.isFeatured : true)
                    .map((resource) => (
                      <a
                        key={resource.id}
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex bg-gray-800 hover:bg-gray-700 rounded-lg overflow-hidden transition-colors h-full group"
                      >
                        <div className="w-1/4 bg-gray-700 flex items-center justify-center relative">
                          <div className="text-pink-500 group-hover:text-pink-400 transition-colors">
                            {getCategoryIcon(resource.type)}
                          </div>
                        </div>
                        <div className="w-3/4 p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{resource.title}</h3>
                            <span className="bg-gray-700 text-xs text-gray-300 px-2 py-0.5 rounded ml-2 shrink-0">
                              {getCategoryName(resource.type)}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-2 line-clamp-2">{resource.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {resource.tags.slice(0, 3).map((tag, i) => (
                              <span key={i} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
                                {tag}
                              </span>
                            ))}
                            {resource.tags.length > 3 && (
                              <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
                                +{resource.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </a>
                    ))}
                </div>
              )}
            </div>

            {/* Crisis Support Section */}
            <div className="mt-10 bg-gradient-to-r from-pink-900/30 to-pink-800/20 rounded-lg p-6 border border-pink-800/50">
              <h2 className="text-lg font-medium mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-pink-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Crisis Support
              </h2>
              <p className="text-gray-300 mb-4">
                If you&apos;re experiencing a mental health emergency, please reach out to a crisis service immediately. Help is available 24/7.
              </p>
              <Link
                href="/hotlines"
                className="inline-flex items-center justify-center bg-pink-700 hover:bg-pink-600 text-white px-5 py-2.5 rounded-md font-medium transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                View Crisis Hotlines
              </Link>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 mb-2 text-sm text-gray-500 italic">
              <p>
                Disclaimer: The resources provided are for informational purposes only and are not intended to replace professional medical advice,
                diagnosis, or treatment. Always seek the advice of qualified health providers with questions you may have regarding medical conditions.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
    </ProtectedRouteWrapper>
  );
}
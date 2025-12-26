"use client";

import { useEffect, useState } from "react";

type TravelGuideContentProps = {
  content: string;
  title: string;
};

type TableOfContentsItem = {
  id: string;
  text: string;
  level: number;
};

export default function TravelGuideContent({ content, title }: TravelGuideContentProps) {
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    // Parse headings from content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h1, h2, h3, h4');
    
    const toc: TableOfContentsItem[] = [];
    headings.forEach((heading, index) => {
      const text = heading.textContent || '';
      const level = parseInt(heading.tagName.charAt(1));
      const id = `section-${index}`;
      
      // Add ID to heading for navigation
      heading.id = id;
      
      toc.push({ id, text, level });
    });
    
    setTableOfContents(toc);
    
    // Update content with IDs
    const updatedContent = doc.body.innerHTML;
    
    // Set up intersection observer for active section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    // Observe all headings
    setTimeout(() => {
      headings.forEach((heading) => {
        if (heading.id) {
          observer.observe(heading);
        }
      });
    }, 100);

    return () => observer.disconnect();
  }, [content]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="grid lg:grid-cols-4 gap-10">
      {/* Table of Contents - Sidebar */}
      {tableOfContents.length > 0 && (
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="sticky top-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>📋</span>
                Table of Contents
              </h3>
              <nav className="space-y-2">
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`
                      w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200
                      ${item.level === 1 ? 'font-semibold' : item.level === 2 ? 'font-medium pl-4' : 'pl-6'}
                      ${activeSection === item.id 
                        ? 'text-emerald-700 bg-emerald-50 border-l-2 border-emerald-500' 
                        : 'text-gray-700 hover:text-emerald-700 hover:bg-emerald-50'
                      }
                    `}
                  >
                    {item.text}
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl border border-emerald-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>⚡</span>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: title,
                        url: window.location.href
                      });
                    }
                  }}
                  className="w-full flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors text-sm"
                >
                  <span>📤</span>
                  Share Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`${tableOfContents.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'} order-1 lg:order-2`}>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="p-8 md:p-10">
            {/* Main Article Content */}
            <article className="prose prose-lg max-w-none">
              <div
                className="
                  [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mt-10 [&>h1]:mb-6 [&>h1]:pb-3 [&>h1]:border-b-2 [&>h1]:border-emerald-200 [&>h1]:scroll-mt-20
                  [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-10 [&>h2]:mb-5 [&>h2]:flex [&>h2]:items-center [&>h2]:gap-3 [&>h2]:scroll-mt-20
                  [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-emerald-700 [&>h3]:mt-8 [&>h3]:mb-4 [&>h3]:flex [&>h3]:items-center [&>h3]:gap-2 [&>h3]:scroll-mt-20
                  [&>h4]:text-lg [&>h4]:font-semibold [&>h4]:text-gray-800 [&>h4]:mt-6 [&>h4]:mb-3 [&>h4]:scroll-mt-20
                  [&>p]:text-gray-700 [&>p]:leading-relaxed [&>p]:mb-5 [&>p]:text-lg
                  [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:space-y-2
                  [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:space-y-2
                  [&_li]:mb-2 [&_li]:text-gray-700 [&_li]:leading-relaxed
                  [&_strong]:text-gray-900 [&_strong]:font-semibold
                  [&_em]:text-emerald-700 [&_em]:font-medium [&_em]:not-italic
                  [&>blockquote]:border-l-4 [&>blockquote]:border-emerald-400 [&>blockquote]:bg-emerald-50 [&>blockquote]:rounded-xl [&>blockquote]:px-6 [&>blockquote]:py-5 [&>blockquote]:my-8 [&>blockquote]:relative
                  [&>blockquote::before]:content-['💡'] [&>blockquote::before]:absolute [&>blockquote::before]:top-5 [&>blockquote::before]:left-6 [&>blockquote::before]:text-xl
                  [&>blockquote>p]:text-emerald-800 [&>blockquote>p]:font-medium [&>blockquote>p]:pl-8 [&>blockquote>p]:mb-0
                  [&_img]:rounded-lg [&_img]:shadow-md [&_img]:my-6
                  [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_table]:bg-white [&_table]:rounded-lg [&_table]:overflow-hidden [&_table]:shadow-sm
                  [&_th]:bg-emerald-50 [&_th]:p-4 [&_th]:text-left [&_th]:font-semibold [&_th]:text-gray-900 [&_th]:border-b [&_th]:border-emerald-200
                  [&_td]:p-4 [&_td]:border-b [&_td]:border-gray-200 [&_td]:text-gray-700
                "
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </article>

            {/* Bottom Navigation */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-600">
                  Found this guide helpful? Share it with fellow travelers!
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: title,
                          url: window.location.href
                        });
                      }
                    }}
                    className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors text-sm"
                  >
                    <span>📤</span>
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
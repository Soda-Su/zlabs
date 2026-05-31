"use client";

import { useState } from "react";

type EditorialFilterCategory = {
  id: string;
  title: string;
};

export function EditorialFilterControls({
  categories
}: {
  categories: readonly EditorialFilterCategory[];
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  function handleFilter(categoryId: string) {
    const nextCategory = activeCategory === categoryId ? null : categoryId;
    const storiesSection = document.getElementById("stories");

    if (storiesSection) {
      if (nextCategory) {
        storiesSection.dataset.editorialFilter = nextCategory;
      } else {
        delete storiesSection.dataset.editorialFilter;
      }
    }

    setActiveCategory(nextCategory);

    if (nextCategory) {
      window.requestAnimationFrame(() => {
        document
          .getElementById(`editorial-${nextCategory}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  return (
    <div className="editorial-filter-list" aria-label="Highlight editorials by topic">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          className="editorial-filter-chip"
          aria-pressed={activeCategory === category.id}
          onClick={() => handleFilter(category.id)}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
}

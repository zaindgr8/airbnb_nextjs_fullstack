"use client"
import { categoryItems } from '../lib/categoryItems'
import { Card, CardHeader } from "@/components/ui/card";
import { useState } from 'react';
import Image from 'next/image';

const SelectedCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  return (
    <div className="grid grid-cols-3 w-3/5 gap-5 mx-auto mt-5 mb-5">
      <input
        type="hidden"
        name="categoryName"
        value={selectedCategory as string}
      />
      {categoryItems.map((item) => (
        <div key={item.id} className="cursor-pointer">
          <Card
            className={selectedCategory === item.name ? "border-rose-500" : ""}
            onClick={() => setSelectedCategory(item.name)}
          >
            <CardHeader>
              <Image
                src={item.imageUrl}
                height={32}
                width={32}
                alt={item.name}
              />
              <h3>{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SelectedCategory
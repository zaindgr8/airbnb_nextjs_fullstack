import { File } from 'lucide-react'
import React from 'react'

const NoItem = () => {
  return (
    <div className="flex flex-col items-center mt-10">
      <span>
        <File className="text-red-500 mb-2" />
      </span>
      <p className="font-semibold">Sorry No Listing Found!</p>
      <p className="text-muted-foreground">Please check other categories.</p>
    </div>
  );
}

export default NoItem
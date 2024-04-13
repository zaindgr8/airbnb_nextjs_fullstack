import { File } from 'lucide-react'
import React from 'react'

interface Props{
  title: string,
  description: string
}

const NoItem = ({title, description}:Props) => {
  return (
    <div className="flex flex-col items-center mt-10">
      <span>
        <File className="text-red-500 mb-2" />
      </span>
      <p className="font-semibold">{title}</p>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default NoItem
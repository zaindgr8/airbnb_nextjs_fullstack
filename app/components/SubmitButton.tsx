"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

const CreationSubmit = () => {
  const { pending } = useFormStatus();
  return (
    <div>
      {pending ? (
        <Button type="submit" disabled size="lg" className="mr-2 animate-pulse">
          <Loader2 />
          Please Wait...
        </Button>
      ) : (
        <Button type="submit" className="border-2 bg-gray-500" size="lg">
          Next
        </Button>
      )}
    </div>
  );
};

export default CreationSubmit;

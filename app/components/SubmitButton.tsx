"use client";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
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

export function AddToFavoriteButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          variant="outline"
          size="icon"
          disabled
          className="bg-primary-foreground"
        >
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="text-rose-500"
          type="submit"
        >
          <Heart className="w-4 h-4 " fill="red" />
        </Button>
      )}
    </>
  );
}

export function DeleteFromFavoriteButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          variant="outline"
          size="icon"
          disabled
          className="bg-primary-foreground"
        >
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="bg-primary-foreground"
          type="submit"
        >
          <Heart className="w-4 h-4 text-black" fill="black" />
        </Button>
      )}
    </>
  )
      }

"use client"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useFormStatus } from "react-dom";
import CreationSubmit from './SubmitButton';

const CreationBottomBar = () => {
    const { pending } = useFormStatus();

  return (
    <div className="flex justify-between py-3">
      <Button
        asChild
        className="border-rose-500 text-white border-2 bg-rose-500"
      >
        <Link href="/">Cancel</Link>
      </Button>
      <CreationSubmit/>
    </div>
  );
}

export default CreationBottomBar
"use client";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

const Counter = ({ name }: { name: string }) => {
  const [amount, setAmount] = useState(0);
  const increaseAmount = () => {
    setAmount(amount + 1);
  };
  const decreaseAmount = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  };
  return (
    <>
      <div className="flex items-center">
        <input hidden name={name} value={amount} />
        <Button className="outline mr-2" size="icon" type="button">
          <Minus onClick={decreaseAmount} className="text-rose-500 " />
        </Button>
        <p>{amount}</p>
        <Button className="outline ml-2" size="icon" type="button">
          <Plus onClick={increaseAmount} className="text-rose-500 " />
        </Button>
      </div>
    </>
  );
};

export default Counter;
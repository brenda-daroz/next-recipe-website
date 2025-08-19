"use client";

import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { MinusCircledIcon } from "@radix-ui/react-icons";

export interface InstructionsFormProps {
  instructions: string[];
  onChange: (instructions: string[]) => void;
}

export function InstructionsForm({
  instructions,
  onChange,
}: InstructionsFormProps) {
  const updateInstructions = (newInstructions: string[]) => {
    onChange(newInstructions);
  };

  return (
    <div>
      {instructions.map((instruction, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <div>{index + 1}</div>
          <Textarea
            placeholder={`Instruction ${index + 1}`}
            value={instruction}
            onChange={(e) => {
              const newInstructions = [...instructions];
              newInstructions[index] = e.target.value;
              updateInstructions(newInstructions);
            }}
            style={{ width: "100%", fontFamily: "monospace" }}
          />
          <MinusCircledIcon
            type="button"
            onClick={() => {
              const newInstructions = [...instructions];
              newInstructions.splice(index, 1);
              updateInstructions(newInstructions);
            }}
            className="text-red-500 cursor-pointer"
          />
        </div>
      ))}

      <Button
        type="button"
        onClick={() => updateInstructions([...instructions, ""])}
      >
        + Add instruction
      </Button>
    </div>
  );
}

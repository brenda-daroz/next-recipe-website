"use client";

import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { MinusCircledIcon } from "@radix-ui/react-icons";

export interface IngredientItem {
  name: string;
  quantity: string;
}

export interface IngredientsFormProps {
  ingredients: { [section: string]: IngredientItem[] };
  onChange: (newIngredients: { [section: string]: IngredientItem[] }) => void;
}

export function IngredientsForm({ ingredients, onChange }: IngredientsFormProps) {
  const [sectionOrder, setSectionOrder] = useState<string[]>([]);
  const [sectionRename, setSectionRename] = useState<Record<string, string>>({});
  const [newSectionName, setNewSectionName] = useState("");
  const [flatSectionName, setFlatSectionName] = useState("");

  useEffect(() => {
    const keys = Object.keys(ingredients);
    setSectionOrder(keys);
    setSectionRename(Object.fromEntries(keys.map((k) => [k, k])));
  }, []);

  const updateIngredients = (newIngredients: IngredientsFormProps["ingredients"]) => {
    onChange(newIngredients);
  };

  const renameSection = (oldName: string) => {
    const newName = sectionRename[oldName].trim();
    if (!newName || newName === oldName) return;
    if (ingredients[newName]) {
      alert("Section already exists!");
      setSectionRename((prev) => ({ ...prev, [oldName]: oldName }));
      return;
    }

    const newIngredients = { ...ingredients, [newName]: ingredients[oldName] };
    delete newIngredients[oldName];

    updateIngredients(newIngredients);
    setSectionOrder((prev) => prev.map((s) => (s === oldName ? newName : s)));
    setSectionRename((prev) => {
      const updated: Record<string, string> = {};
      Object.keys(newIngredients).forEach((s) => {
        updated[s] = prev[s] ?? s;
      });
      return updated;
    });
  };

  const convertFlatSection = () => {
    const name = flatSectionName.trim();
    if (!name) return;
    if (ingredients[name]) {
      alert("Section already exists!");
      return;
    }
    const newIngredients = { ...ingredients, [name]: ingredients[""] };
    delete newIngredients[""];
    updateIngredients(newIngredients);

    setSectionOrder((prev) => prev.map((s) => (s === "" ? name : s)));
    setSectionRename((prev) => ({ ...prev, [name]: name }));
    setFlatSectionName("");
  };

  return (
    <div>
      {sectionOrder.map((section) => (
        <Card key={section || "flat"} className="mb-4 p-4 border rounded">
          {/* Section name or flat conversion */}
          {section === "" ? (
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Section name"
                value={flatSectionName}
                onChange={(e) => setFlatSectionName(e.target.value)}
              />
              <Button type="button" onClick={convertFlatSection}>
                Convert to Section
              </Button>
            </div>
          ) : (
            <Input
              placeholder="Section name"
              value={sectionRename[section]}
              onChange={(e) =>
                setSectionRename((prev) => ({ ...prev, [section]: e.target.value }))
              }
              onBlur={() => renameSection(section)}
              className="mb-2"
            />
          )}

          {/* Ingredients */}
          {ingredients[section].map((ingredient, i) => (
            <div key={`${section}-${i}`} className="flex items-center gap-2 mb-2">
              <Input
                placeholder="Ingredient"
                value={ingredient.name}
                onChange={(e) => {
                  const newIngredients = { ...ingredients };
                  newIngredients[section][i].name = e.target.value;
                  updateIngredients(newIngredients);
                }}
                className="flex-1"
              />
              <Input
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) => {
                  const newIngredients = { ...ingredients };
                  newIngredients[section][i].quantity = e.target.value;
                  updateIngredients(newIngredients);
                }}
                className="w-24"
              />

              <MinusCircledIcon
                type="button"
                onClick={() => {
                  const newIngredients = { ...ingredients };
                  newIngredients[section].splice(i, 1);
                  updateIngredients(newIngredients);
                }}
                className="text-red-500 cursor-pointer"
              />
            </div>
          ))}

          {/* Add ingredient */}
          <Button
            type="button"
            onClick={() => {
              const newIngredients = { ...ingredients };
              newIngredients[section].push({ name: "", quantity: "" });
              updateIngredients(newIngredients);
            }}
            className="mt-2"
          >
            + Add ingredient
          </Button>
        </Card>
      ))}

      {/* Add new section */}
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="New section name"
          value={newSectionName}
          onChange={(e) => setNewSectionName(e.target.value)}
        />
        <Button
          type="button"
          onClick={() => {
            const name = newSectionName.trim();
            if (!name || ingredients[name]) return;
            const newIngredients = { ...ingredients, [name]: [] };
            updateIngredients(newIngredients);
            setSectionOrder((prev) => [...prev, name]);
            setSectionRename((prev) => ({ ...prev, [name]: name }));
            setNewSectionName("");
          }}
        >
          + Add Section
        </Button>
      </div>
    </div>
  );
}

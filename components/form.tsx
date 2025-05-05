"use client";

// import { useForm } from "react-hook-form";
import { useFormik } from "formik";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { RecipeProps } from "@/app/db/recipes";
import { MinusCircledIcon } from "@radix-ui/react-icons";


interface FormValues {
  title: string;
  category: string;
  ingredients: string;
  instructions: string[];
}

interface EditRecipeFormProps {
    recipe: RecipeProps;
  }

export default function EditRecipeForm({ recipe }: EditRecipeFormProps) {
  console.log("recipe", recipe.title);
  const parsedIngredients = JSON.parse(recipe.ingredients);
  const formik = useFormik<FormValues>({
    initialValues: {
      title: recipe.title,
      category: recipe.category,
      ingredients: (() => {
        if (!parsedIngredients || typeof parsedIngredients !== "object") return "";
      
        return Object.entries(parsedIngredients)
          .map(([key, value]) => {
            if (typeof value === "object" && value !== null) {
              const nested = Object.entries(value)
                .map(([subKey, subValue]) => `${subKey} - ${subValue}`)
                .join("\n");
              return `${key}:\n${nested}`;
            }
            return `${key} - ${value}`;
          })
          .join("\n");
      })(),
      instructions: recipe.instructions.map((instruction) => instruction),
    },
    onSubmit: (data) => {
      try {
        const parsedIngredients = JSON.parse(data.ingredients);
        const updatedRecipe = {
          ...data,
          ingredients: parsedIngredients,
        };
        console.log("Updated data:", updatedRecipe);
      } catch (e) {
        console.error("Invalid JSON in ingredients");
      }
    },
  });

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-lg p-6 shadow-xl rounded-2xl border">
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <Label htmlFor="email">Title</Label>
            <Input
              type="text"
              placeholder="Title"
              {...formik.getFieldProps("title")}
            />
            <Label htmlFor="email">Category</Label>
            <Input
              type="text"
              placeholder="Category"
              {...formik.getFieldProps("category")}
            />
            <Label htmlFor="email">Ingredients</Label>
            <Textarea
              placeholder="Ingredients"
              {...formik.getFieldProps("ingredients")}
              style={{ width: "100%", fontFamily: "monospace" }}
              rows={4}
            />
            <Label htmlFor="instructions">Instructions</Label>
            <div>
              {formik.values.instructions.map((_instruction, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                    <div>{index +1}</div>
                  <Input
                    placeholder={`Instruction ${index + 1}`}
                    {...formik.getFieldProps(`instructions[${index}]`)}
                    style={{ width: "100%", fontFamily: "monospace" }}
                  />
                  <MinusCircledIcon 
              
                    type="button"
                    onClick={() => {
                      const newInstructions = [...formik.values.instructions];
                      newInstructions.splice(index, 1);
                      formik.setFieldValue("instructions", newInstructions);
                    }}
                    className="text-red-500 cursor-pointer"
                  
                    />
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newInstructions = [...formik.values.instructions, ""];
                  formik.setFieldValue("instructions", newInstructions);
                }}
                className="text-blue-500"
              >
                Add more step
              </button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <Button type="submit">Edit</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

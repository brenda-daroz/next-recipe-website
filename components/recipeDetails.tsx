"use client";
import styled from "styled-components";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import { RecipeProps } from "../app/db/recipes";

const RecipeContainer = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 5px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  max-width: 800px;
  margin: 20px auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  border-bottom: 2px solid #ddd;
  padding-bottom: 8px;
  margin-bottom: 20px;
`;

const SubSectionTitle = styled.h4`
  font-size: 1rem;
  margin: 16px 0 8px;
  color: #555;
`;

const List = styled.ul`
  padding-left: 20px;
  margin-bottom: 30px;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  line-height: 1.2;
  list-style: none;
`;

type NormalizedIngredient = {
  name: string;
  quantity: string | number;
};

export default function Recipe(recipe: RecipeProps) {
  const parsedIngredients = recipe.ingredients;

  const renderIngredients = (ingredients: any) => {
    if (Array.isArray(ingredients)) {
      // Flat ingredients array
      return (
        <List>
          {ingredients.map((item: NormalizedIngredient) => (
            <ListItem key={item.name}>
              {capitalizeFirstLetter(item.name)} - {item.quantity}
            </ListItem>
          ))}
        </List>
      );
    } else if (typeof ingredients === "object") {
      // Nested sections
      return (
        <>
          {Object.entries(ingredients).map(([section, items]) => (
            <div key={section}>
              <SubSectionTitle>{capitalizeFirstLetter(section)}:</SubSectionTitle>
              {renderIngredients(items)}
            </div>
          ))}
        </>
      );
    }
    return null;
  };

  return (
    <RecipeContainer>
      <h1>{capitalizeFirstLetter(recipe.title)}</h1>
      <SectionTitle>Ingredients</SectionTitle>
      {renderIngredients(parsedIngredients)}

      {recipe.instructions.length > 0 && (
        <>
          <SectionTitle>Steps</SectionTitle>
          <List>
            {recipe.instructions.map((step, index) => (
              <ListItem key={index}>
                <strong>{index + 1}:</strong> {step}
              </ListItem>
            ))}
          </List>
        </>
      )}
    </RecipeContainer>
  );
}

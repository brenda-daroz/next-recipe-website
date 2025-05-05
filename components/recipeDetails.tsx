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

export default function Recipe(recipe: RecipeProps) {
  const parsedIngredients = JSON.parse(recipe.ingredients);
  return (
    <RecipeContainer>
      <h1>{capitalizeFirstLetter(recipe.title)}</h1>
      <SectionTitle>Ingredients</SectionTitle>
      <List>
        {Object.entries(parsedIngredients).map(([section, ingredients]) => (
          <ListItem key={section}>
            {typeof ingredients === "object" ? (
              <>
                <SubSectionTitle>
                  {capitalizeFirstLetter(section)}:
                </SubSectionTitle>
                <List>
                  {ingredients &&
                    Object.entries(ingredients).map(
                      ([subIngredient, subAmount]) => (
                        <ListItem key={subIngredient}>
                          {capitalizeFirstLetter(subIngredient)} - {subAmount}
                        </ListItem>
                      )
                    )}
                </List>
              </>
            ) : (
              `${capitalizeFirstLetter(section)} - ${ingredients}`
            )}
          </ListItem>
        ))}
      </List>
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

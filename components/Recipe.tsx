import styled from "styled-components";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

const RecipeContainer = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const SectionTitle = styled.h3`
  margin: 10px 0;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
`;

const SubList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding-left: 20px;
`;

interface RecipeProps {
  ingredients: Record<string, string | Record<string, string>>;
  steps: Record<string, string | Record<string, string>>;
}

export default function Recipes({ ingredients, steps }: RecipeProps) {

  console.log(steps)
  return (
    <RecipeContainer>
      <SectionTitle>Ingredients</SectionTitle>
      <List>
        {Object.entries(ingredients).map(([section, ingredients]) => (
          <ListItem key={section}>
            {typeof ingredients === "object" ? (
              <>
                <div>{capitalizeFirstLetter(section)}:</div>
                <SubList>
                  {Object.entries(ingredients).map(
                    ([subIngredient, subAmount]) => (
                      <ListItem key={subIngredient}>
                        {capitalizeFirstLetter(subIngredient)} - {subAmount}
                      </ListItem>
                    )
                  )}
                </SubList>
              </>
            ) : (
              `${capitalizeFirstLetter(section)} - ${ingredients}`
            )}
          </ListItem>
        ))}
      </List>
      {Object.keys(steps).length > 0 &&
        <>
          <SectionTitle>Steps</SectionTitle>
          <List>
            {Object.entries(steps).map(([section, steps]) => (
              <ListItem key={section}>
                {typeof steps === "object" ? (
                  <>
                    <div>{capitalizeFirstLetter(section)}:</div>
                    <SubList>
                      {Object.entries(steps).map(([subIndex, subStep]) => (
                        <ListItem key={subIndex}>
                          {capitalizeFirstLetter(subIndex)} - {subStep}
                        </ListItem>
                      ))}
                    </SubList>
                  </>
                ) : (
                  `${section} - ${steps}`
                )}
              </ListItem>
            ))}
          </List>
        </>
      }
    </RecipeContainer>

  );
}

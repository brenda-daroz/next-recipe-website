import styled from "styled-components";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

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


export default function Recipes ({ ingredients, steps }) {

  return (
    <RecipeContainer>
      <SectionTitle>Ingredients</SectionTitle>
      <List>
        {Object.entries(ingredients).map(([ingredient, stringOrObj]) => (
          <ListItem key={ingredient}>
            {typeof stringOrObj === "object" ? (
              <>
                <div>{ingredient}:</div>
                <ul>
                  {Object.entries(stringOrObj).map(([subIngredient, subAmount]) => (
                    <SubList key={subIngredient}>
                      {capitalizeFirstLetter(subIngredient)} - {subAmount}
                    </SubList>
                  ))}
                </ul>
              </>
            ) : (
              `${capitalizeFirstLetter(ingredient)} - ${stringOrObj}`
            )}
          </ListItem>
        ))}
      </List>
      <SectionTitle>Steps</SectionTitle>
      <List>
        {Object.entries(steps).map(([index, step]) => (
          <li key={index}>{index} -  {step}</li>
        ))}
      </List>
      </RecipeContainer>
  )

}

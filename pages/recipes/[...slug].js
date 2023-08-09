import { useRouter } from "next/router"
import Recipe from '../../components/Recipe'

export default function Page() {
  const router = useRouter();
  const data = router.query;
  const recipe = JSON.parse(data.object)

  console.log(JSON.parse(data.object))

return (
  <>
  <button type="button" onClick={() => router.back()}>
      Click here to go back
    </button>
      <div className="container">
          <h1> {data.slug} </h1>
          <Recipe ingredients={recipe.ingredients} steps={recipe.steps}/>
      </div>
  </>

  )
}

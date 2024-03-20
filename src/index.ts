import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import { queryIndexPals,queryIndexItems,queryIndexHotGames } from "./schemas";
import { IndexPalsUseCase,IndexItemsUseCase, IndexStructuresUseCase,IndexHotGamesUseCase } from "./useCases";

const port = process.env.PORT || 8080;
const app = new Elysia()
  .use(staticPlugin())
  .get(
    "/",
    ({ query: { page, limit, term, ...filter } }) =>
      IndexPalsUseCase.execute({ page, limit, term, filter }),
    {
      query: queryIndexPals,
    }
  )
  .get(
    "/items",
    ({ query: { page, limit, term, ...filter } }) =>
      IndexItemsUseCase.execute({ page, limit, term, filter }),
    {
      query: queryIndexItems,
    }
  )
  .get(
    "/structures",
    ({ query: { page, limit, term, ...filter } }) =>
      IndexStructuresUseCase.execute({ page, limit, term, filter }),
    {
      query: queryIndexItems,
    }
  ).get(
    "/hotGames",
    ({ query: { page, limit, term, ...filter } }) =>
      IndexHotGamesUseCase.execute({ page, limit, term, filter }),
    {
      query: queryIndexHotGames,
    }
  )
  .listen(port);


console.log(`🦊 Elysia is running at on port ${app.server?.port}...`);

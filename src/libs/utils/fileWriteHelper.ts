import fs from "fs";
import path from "path";
import { CategoryType } from "@/type/categoryTypes";

const filePath = path.join(process.cwd(), "src/libs/fake-db/categoryDb.ts");

export const saveCategoriesToFile = (categories: CategoryType[]) => {
  const content = `import { CategoryType } from "@type/categoryTypes";

export let initialCategories: CategoryType[] = ${JSON.stringify(
    categories,
    null,
    2
  )};`;

  fs.writeFileSync(filePath, content, "utf-8");
};

import fs from "fs";
import path from "path";
import { CategoryType } from "@/type/categoryTypes";
import { userType } from "@/type/userTypes";

const filePath = path.join(process.cwd(), "src/libs/fake-db/categoryDb.ts");
const filePathUser = path.join(process.cwd(), "src/libs/fake-db/userDb.ts");

export const saveCategoriesToFile = (categories: CategoryType[]) => {
  const content = `import { CategoryType } from "@type/categoryTypes";

export let initialCategories: CategoryType[] = ${JSON.stringify(
    categories,
    null,
    2
  )};`;

  fs.writeFileSync(filePath, content, "utf-8");
};

export const saveUserToFile = (user: userType[]) => {
  const content = `import { userType } from "@/type/userTypes";


export let initialUser: userType[] = ${JSON.stringify(user, null, 2)};`;

  fs.writeFileSync(filePathUser, content, "utf-8");
};

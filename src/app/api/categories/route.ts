import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { initialCategories } from "@/libs/fake-db/categoryDb";
import { saveCategoriesToFile } from "@/libs/utils/fileWriteHelper";
import { CategoryType } from "@type/categoryTypes";

export async function GET() {
  return NextResponse.json({ categories: initialCategories }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const { name, description, isActive, parentId } = await req.json();

    if (!name || !description || isActive === undefined) {
      return NextResponse.json(
        { message: "Name, description, and isActive are required" },
        { status: 400 }
      );
    }

    const existingCategory = initialCategories.find(
      (category) =>
        category.name.charAt(0).toUpperCase() + category.name.slice(1) ===
        name.charAt(0).toUpperCase() + name.slice(1)
    );

    if (existingCategory) {
      return NextResponse.json(
        { message: "Category name already exists" },
        { status: 409 }
      );
    }

    const newCategory: CategoryType = {
      id: uuidv4(),
      name,
      description,
      isActive,
      parentId: parentId || null,
    };

    initialCategories.push(newCategory);
    saveCategoriesToFile(initialCategories);

    return NextResponse.json(
      { message: "Category added successfully", category: newCategory },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    const { name, description, isActive, parentId } = await req.json();

    if (!categoryId || !name || !description || isActive === undefined) {
      return NextResponse.json(
        { message: "categoryId, name, description, and isActive are required" },
        { status: 400 }
      );
    }

    const categoryIndex = initialCategories.findIndex(
      (category) => category.id === categoryId
    );

    if (categoryIndex === -1) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    initialCategories[categoryIndex] = {
      ...initialCategories[categoryIndex],
      name,
      description,
      isActive,
      parentId: parentId || null,
    };

    saveCategoriesToFile(initialCategories);

    return NextResponse.json(
      {
        message: "Category updated successfully",
        category: initialCategories[categoryIndex],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}

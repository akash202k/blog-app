// import { categoriesData } from "@/data"
import Link from "next/link"
import { TCategory } from "../lib/types";

const getCategories = async (): Promise<TCategory[] | null> => {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`);
        if (res.ok) {
            const categories = await res.json();
            return categories;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
    return null;
}


export default async function CategoriesList() {
    const categoriesData = await getCategories();

    return (
        <div className="flex gap-2 text-sm m-4">
            {categoriesData && categoriesData.map((category) =>
                <Link
                    className="cbtn"
                    key={category.id}
                    href={`/categories/${category.catName}`} >
                    {category.catName}
                </Link>)}
        </div>
    )
}
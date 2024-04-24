import { categoriesData } from "@/data"
import Link from "next/link"



export default function CategoriesList() {

    return (
        <div className="flex gap-2 text-sm m-4">
            {categoriesData && categoriesData.map((category) => <Link className="cbtn" key={category.id} href={`/categories/${category.name}`}>{category.name}</Link>)}
        </div>
    )
}
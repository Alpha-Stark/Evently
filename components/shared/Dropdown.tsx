// used shadcn select, Alert Dialog,
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ICategory } from "@/lib/database/models/category.model"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

import { startTransition, useEffect, useState } from "react"
import { Input } from "../ui/input"
import { createCategory, getAllCategories } from "@/lib/actions/category.action"


type DropdownProps = {
    value?: string,
    onChangeHandler?: () => void
}

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
    const [categories, setCategories] = useState<ICategory[]>([])
    const [newCategory, setNewCategory] = useState("") //this is being set the moment Add buttion in pop up is pressed. onClick event.
    const handleAddCategory = () => {
        createCategory({
            categoryName: newCategory.trim()
        }).then((category) => {
            setCategories((prevState) => [...prevState, category])
        })
    }

    useEffect(() => {
        const getCategories = async () => {
            const categoryList = await getAllCategories()
            categoryList && setCategories(categoryList as ICategory[]) //If there is a list then, set it to the state of categories
        }
        getCategories()
    }, [])

    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                {categories.length > 0 && categories.map((category) => (
                    <SelectItem key={category._id.toString()} value={category._id.toString()} className="select-item p-regular-14">{category.name}</SelectItem>
                ))}

                <AlertDialog>
                    <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Add new category</AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                            <AlertDialogTitle>New Category</AlertDialogTitle>
                            <AlertDialogDescription>
                                <Input type="text" placeholder="Category name" className="input-field mt-3" onChange={(e) => setNewCategory(e.target.value)} />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Add</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </SelectContent>
        </Select>
    )
}

export default Dropdown
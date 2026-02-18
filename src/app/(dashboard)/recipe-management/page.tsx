"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Pencil, Trash2, Spade, Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { RecipeModal } from "@/components/dashboard/recipes/RecipeModal";

const recipes = [
    {
        id: 1,
        title: "Avocado Toast with Eggs",
        description:
            "A nutritious and satisfying breakfast packed with healthy fats, protein, and fiber to keep you energized throughout the morning.",
        category: "breakfast",
        phase: "Menstrual",
        time: "NaN min",
        image: "/recipe (1).jpg",
    },
    {
        id: 2,
        title: "Salmon Quinoa Power Bowl",
        description:
            "A complete meal with lean protein, whole grains, and fresh vegetables, perfect for sustained energy and hormone balance.",
        category: "lunch",
        phase: "Follicular",
        time: "NaN min",
        image: "/recipe (2).jpg",
    },
    {
        id: 3,
        title: "Herb Roasted Chicken with Vegetables",
        description:
            "A wholesome dinner featuring lean protein and colorful vegetables, perfectly seasoned with aromatic herbs.",
        category: "dinner",
        phase: "Ovulatory",
        time: "NaN min",
        image: "/recipe (3).jpg",
    },
    {
        id: 4,
        title: "Berry Antioxidant Smoothie Bowl",
        description:
            "A refreshing and nutrient-dense smoothie bowl loaded with antioxidants, probiotics, and essential vitamins.",
        category: "breakfast",
        phase: "Luteal",
        time: "NaN min",
        image: "/recipe (4).jpg",
    },
    {
        id: 5,
        title: "Dark Chocolate Energy Bites",
        description:
            "Indulgent yet nutritious chocolate treats that satisfy sweet cravings while providing essential minerals.",
        category: "dessert",
        phase: "Menstrual",
        time: "NaN min",
        image: "/recipe (2).jpg",
    },
];

export default function RecipeManagement() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

    const handleEdit = (recipe: any) => {
        setSelectedRecipe(recipe);
        setIsEditOpen(true);
    };

    return (
        <div className="p-6 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-serif text-foreground uppercase tracking-widest">Recipe Management</h1>
                    <p className="text-muted-foreground mt-2">10 of 10 recipes</p>
                </div>
                <Button 
                    className="bg-primary hover:bg-primary/90 text-white rounded-full px-6"
                    onClick={() => setIsCreateOpen(true)}
                >
                    <Plus className="w-4 h-4 mr-2" /> Add Recipe
                </Button>
            </div>

            <RecipeModal 
                key={isCreateOpen ? "create-open" : "create-closed"}
                isOpen={isCreateOpen} 
                onClose={() => setIsCreateOpen(false)} 
                mode="create" 
            />

            <RecipeModal 
                key={selectedRecipe?.id ?? "edit"}
                isOpen={isEditOpen} 
                onClose={() => setIsEditOpen(false)} 
                mode="edit" 
                initialData={selectedRecipe}
            />

            {/* Filters */}
            <div className="flex gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input placeholder="Search recipes..." className="pl-10 bg-input border-none rounded-2xl" />
                </div>
                <Select>
                    <SelectTrigger className="w-[180px] bg-input border-none rounded-2xl">
                        <SelectValue placeholder="All Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Category</SelectItem>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-[180px] bg-input border-none rounded-2xl">
                        <SelectValue placeholder="All Phases" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Phases</SelectItem>
                        <SelectItem value="menstrual">Menstrual</SelectItem>
                        <SelectItem value="follicular">Follicular</SelectItem>
                        <SelectItem value="ovulatory">Ovulatory</SelectItem>
                        <SelectItem value="luteal">Luteal</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Recipe List */}
            <div className="space-y-4">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="bg-secondary rounded-xl p-4 flex gap-6 items-center">
                        <div className="relative w-24 h-24 rounded-lg shrink-0 overflow-hidden">
                            <Image src={recipe.image} alt={recipe.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-serif text-lg font-medium text-foreground">{recipe.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{recipe.description}</p>
                            <div className="flex items-center gap-3 mt-3">
                                <Badge variant="secondary" className="bg-secondary text-foreground font-normal rounded-md px-3">
                                    {recipe.category}
                                </Badge>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Spade className="w-3 h-3 fill-current" />
                                    <Heart className="w-3 h-3 fill-current" />
                                    <span>{recipe.time}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-muted-foreground hover:text-primary"
                                onClick={() => handleEdit(recipe)}
                            >
                                <Pencil className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

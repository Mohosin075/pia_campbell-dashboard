"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Pencil, Trash2, Spade, Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { RecipeModal } from "@/components/dashboard/recipes/RecipeModal";
import { useGetRecipesQuery, useDeleteRecipeMutation } from "@/redux/features/recipe/recipeApi";
import { getImageUrl } from "@/utils/imageUrl";
import { toast } from "sonner";

export default function RecipeManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("all");
    const [phase, setPhase] = useState("all");

    const { data: recipeData, isLoading } = useGetRecipesQuery({
        searchTerm: searchTerm || undefined,
        category: category !== "all" ? category : undefined,
        phases: phase !== "all" ? phase : undefined,
    });

    const [deleteRecipe] = useDeleteRecipeMutation();

    const recipes = recipeData?.data || [];

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

    const handleEdit = (recipe: any) => {
        setSelectedRecipe(recipe);
        setIsEditOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this recipe?")) {
            try {
                const res = await deleteRecipe(id).unwrap();
                if (res.success) {
                    toast.success(res.message || "Recipe deleted successfully");
                }
            } catch (error: any) {
                toast.error(error?.data?.message || "Failed to delete recipe");
            }
        }
    };

    if (isLoading) {
        return <div className="p-6 flex justify-center items-center h-[50vh]">Loading recipes...</div>;
    }

    return (
        <div className="p-6 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-serif text-foreground uppercase tracking-widest">Recipe Management dsf</h1>
                    <p className="text-muted-foreground mt-2">
                        {recipeData?.meta?.total || 0} recipes found
                    </p>
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
                key={selectedRecipe?._id ?? "edit"}
                isOpen={isEditOpen} 
                onClose={() => setIsEditOpen(false)} 
                mode="edit" 
                initialData={selectedRecipe}
            />

            {/* Filters */}
            <div className="flex gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input 
                        placeholder="Search recipes..." 
                        className="pl-10 bg-input border-none rounded-2xl" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-[180px] bg-input border-none rounded-2xl">
                        <SelectValue placeholder="All Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Category</SelectItem>
                        <SelectItem value="Breakfast">Breakfast</SelectItem>
                        <SelectItem value="Lunch">Lunch</SelectItem>
                        <SelectItem value="Dinner">Dinner</SelectItem>
                        <SelectItem value="Snack">Snack</SelectItem>
                        <SelectItem value="Dessert">Dessert</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={phase} onValueChange={setPhase}>
                    <SelectTrigger className="w-[180px] bg-input border-none rounded-2xl">
                        <SelectValue placeholder="All Phases" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Phases</SelectItem>
                        <SelectItem value="Menstrual">Menstrual</SelectItem>
                        <SelectItem value="Follicular">Follicular</SelectItem>
                        <SelectItem value="Ovulation">Ovulation</SelectItem>
                        <SelectItem value="Luteal">Luteal</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Recipe List */}
            <div className="space-y-4">
                {recipes.length > 0 ? (
                    recipes.map((recipe: any) => (
                        <div key={recipe._id} className="bg-secondary rounded-xl p-4 flex gap-6 items-center">
                            <div className="relative w-24 h-24 rounded-lg shrink-0 overflow-hidden">
                                <Image 
                                    src={getImageUrl(recipe.image)} 
                                    alt={recipe.title} 
                                    fill 
                                    className="object-cover" 
                                />
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
                                        <span>{(recipe.prepTime || 0) + (recipe.cookTime || 0)} min</span>
                                        {recipe.phases && recipe.phases.length > 0 && (
                                            <span className="ml-2">• {recipe.phases.join(", ")}</span>
                                        )}
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
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="text-muted-foreground hover:text-destructive"
                                    onClick={() => handleDelete(recipe._id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-muted-foreground">
                        No recipes found.
                    </div>
                )}
            </div>
        </div>
    );
}

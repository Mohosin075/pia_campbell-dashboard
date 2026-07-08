"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Plus, Pencil, Trash2, Spade, Heart, Loader2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";
import { RecipeModal } from "@/components/dashboard/recipes/RecipeModal";
import { useGetRecipesQuery, useDeleteRecipeMutation } from "@/redux/features/recipe/recipeApi";
import { getImageUrl } from "@/utils/imageUrl";
import { toast } from "sonner";

export default function RecipeManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("all");
    const [phase, setPhase] = useState("all");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const { data: recipeData, isLoading, isFetching } = useGetRecipesQuery({
        searchTerm: searchTerm || undefined,
        category: category !== "all" ? category : undefined,
        phases: phase !== "all" ? phase : undefined,
        page,
        limit,
    });

    const [deleteRecipe] = useDeleteRecipeMutation();

    const recipes = recipeData?.data || [];
    const meta = recipeData?.meta;
    const totalPages = (meta?.totalPage ?? meta?.totalPages ?? Math.ceil((meta?.total || 0) / limit)) || 1;
    const totalItems = meta?.total ?? recipes.length;
    const showingStart = totalItems === 0 ? 0 : (page - 1) * limit + 1;
    const showingEnd = Math.min(page * limit, totalItems);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleLimitChange = (newLimit: string) => {
        setLimit(Number(newLimit));
        setPage(1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const pageNumbers = useMemo(() => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            let startPage = Math.max(2, page - 1);
            let endPage = Math.min(totalPages - 1, page + 1);

            if (page <= 3) {
                endPage = 4;
            } else if (page >= totalPages - 2) {
                startPage = totalPages - 3;
            }

            if (startPage > 2) {
                pages.push("...");
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (endPage < totalPages - 1) {
                pages.push("...");
            }

            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }

        return pages;
    }, [page, totalPages]);

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

    return (
        <div className="p-6 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-serif text-foreground uppercase tracking-widest">Recipe Management</h1>
                    <p className="text-muted-foreground mt-2">
                        {meta?.total || 0} recipes found
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
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>
                <Select value={category} onValueChange={(val) => {
                    setCategory(val);
                    setPage(1);
                }}>
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
                <Select value={phase} onValueChange={(val) => {
                    setPhase(val);
                    setPage(1);
                }}>
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
            <div className="relative min-h-[300px]">
                {/* Floating Glassmorphic Shimmer Indicator during background refresh (isFetching when we already have data) */}
                {isFetching && !isLoading && recipes.length > 0 && (
                    <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] z-20 flex items-center justify-center rounded-2xl transition-all duration-300">
                        <div className="bg-card/95 border border-border shadow-xl rounded-full px-6 py-3 flex items-center gap-3 text-sm font-medium text-foreground animate-in fade-in zoom-in-95 duration-200">
                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                            <span>Updating recipes...</span>
                        </div>
                    </div>
                )}

                <div className={`space-y-4 transition-all duration-300 ${isFetching && !isLoading && recipes.length > 0 ? "opacity-40 pointer-events-none select-none scale-[0.995]" : "opacity-100"}`}>
                    {isLoading || (isFetching && recipes.length === 0) ? (
                        /* Skeleton Loading Cards on Initial Load or Empty Cache */
                        Array.from({ length: Math.min(limit, 6) }).map((_, idx) => (
                            <div key={`skeleton-${idx}`} className="bg-secondary/60 border border-border/40 rounded-xl p-4 flex gap-6 items-center animate-pulse">
                                <Skeleton className="w-24 h-24 rounded-lg shrink-0" />
                                <div className="flex-1 space-y-3 py-1">
                                    <Skeleton className="h-6 w-2/3 rounded-md" />
                                    <Skeleton className="h-4 w-full rounded-md" />
                                    <Skeleton className="h-4 w-4/5 rounded-md" />
                                    <div className="flex items-center gap-3 pt-1">
                                        <Skeleton className="h-6 w-20 rounded-md" />
                                        <Skeleton className="h-4 w-28 rounded-md" />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Skeleton className="w-8 h-8 rounded-md" />
                                    <Skeleton className="w-8 h-8 rounded-md" />
                                </div>
                            </div>
                        ))
                    ) : recipes.length > 0 ? (
                        recipes.map((recipe: any) => (
                            <div key={recipe._id} className="bg-secondary rounded-xl p-4 flex gap-6 items-center transition-all hover:shadow-md">
                                <div className="relative w-24 h-24 rounded-lg shrink-0 overflow-hidden bg-gray-200">
                                    {recipe.image ? (
                                        <Image 
                                            src={getImageUrl(recipe.image)} 
                                            alt={recipe.title} 
                                            fill 
                                            className="object-cover" 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs text-center p-2">
                                            No Image
                                        </div>
                                    )}
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
                        <div className="text-center py-16 bg-secondary/30 rounded-2xl border border-border/40 text-muted-foreground">
                            No recipes found.
                        </div>
                    )}
                </div>
            </div>

            {/* Professional Pagination & Controls */}
            {(meta || recipes.length > 0) && (
                <div className="bg-secondary/40 border border-border/50 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-sm mt-6">
                    {/* Left: Summary & Rows per page */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <span>Rows per page:</span>
                            <Select value={String(limit)} onValueChange={handleLimitChange}>
                                <SelectTrigger className="h-8 w-[70px] bg-background border border-border rounded-lg text-xs font-medium">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="h-4 w-[1px] bg-border hidden sm:block" />
                        <div>
                            Showing <span className="font-semibold text-foreground">{showingStart}</span> to{" "}
                            <span className="font-semibold text-foreground">{showingEnd}</span> of{" "}
                            <span className="font-semibold text-foreground">{totalItems}</span> entries
                            {(isFetching || isLoading) && (
                                <span className="ml-2 inline-flex items-center gap-1 text-xs text-primary font-medium animate-pulse">
                                    <Loader2 className="w-3 h-3 animate-spin inline" /> Updating...
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Right: Page Navigation Buttons */}
                    <div className="flex items-center gap-1.5 flex-wrap justify-center">
                        {/* First Page Button */}
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 rounded-xl border-border bg-background hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-40 transition-all"
                            onClick={() => handlePageChange(1)}
                            disabled={page <= 1 || isFetching || isLoading}
                            title="First Page"
                        >
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>

                        {/* Previous Page Button */}
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 rounded-xl border-border bg-background hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-40 transition-all"
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page <= 1 || isFetching || isLoading}
                            title="Previous Page"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        {/* Numeric Page Buttons */}
                        <div className="flex items-center gap-1 mx-1">
                            {pageNumbers.map((p, idx) =>
                                p === "..." ? (
                                    <div
                                        key={`ellipsis-${idx}`}
                                        className="h-9 w-9 flex items-center justify-center text-muted-foreground select-none text-xs font-medium"
                                    >
                                        ...
                                    </div>
                                ) : (
                                    <Button
                                        key={`page-${p}`}
                                        variant={page === p ? "default" : "outline"}
                                        className={`h-9 min-w-[36px] px-3 rounded-xl text-xs font-medium transition-all ${
                                            page === p
                                                ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 border-transparent"
                                                : "border-border bg-background hover:bg-secondary text-foreground"
                                        }`}
                                        onClick={() => handlePageChange(p as number)}
                                        disabled={isFetching || isLoading}
                                    >
                                        {p}
                                    </Button>
                                )
                            )}
                        </div>

                        {/* Next Page Button */}
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 rounded-xl border-border bg-background hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-40 transition-all"
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page >= totalPages || isFetching || isLoading}
                            title="Next Page"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>

                        {/* Last Page Button */}
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 rounded-xl border-border bg-background hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-40 transition-all"
                            onClick={() => handlePageChange(totalPages)}
                            disabled={page >= totalPages || isFetching || isLoading}
                            title="Last Page"
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

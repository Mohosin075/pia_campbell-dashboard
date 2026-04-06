"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Spade, Upload } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useCreateRecipeMutation, useUpdateRecipeMutation } from "@/redux/features/recipe/recipeApi";
import { toast } from "sonner";
import { getImageUrl } from "@/utils/imageUrl";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const recipeSchema = z.object({
    title: z.string().min(1, "Recipe name is required"),
    description: z.string().optional(),
    image: z.string().min(1, "Recipe image is required"),
    category: z.string().min(1, "Category is required"),
    phases: z.array(z.string()).min(1, "Select at least one phase"),
    prepTime: z.coerce.number().min(1, "Prep time is required"),
    cookTime: z.coerce.number().min(1, "Cook time is required"),
    servings: z.coerce.number().min(1, "Servings are required"),
    ingredients: z.array(z.object({
        name: z.string().min(1, "Ingredient name is required"),
        amount: z.string().min(1, "Amount is required"),
        unit: z.string().min(1, "Unit is required"),
    })).min(1, "At least one ingredient is required"),
    instructions: z.array(z.object({
        value: z.string().min(1, "Instruction cannot be empty")
    })).min(1, "At least one instruction is required"),
    nutrition: z.object({
        calories: z.coerce.number().optional(),
        protein: z.coerce.number().optional(),
        carbs: z.coerce.number().optional(),
        fat: z.coerce.number().optional(),
    }).optional(),
    feelings: z.array(z.string()).optional(),
    nutrients: z.array(z.string()).optional(),
    phaseBenefits: z.record(z.string(), z.string()).optional(),
});

interface Ingredient {
    name: string;
    amount: string;
    unit: string;
}

interface Nutrition {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

interface Recipe {
    _id?: string;
    title: string;
    description?: string;
    image?: string;
    category: "Breakfast" | "Lunch" | "Dinner" | "Snack" | "Smoothie" | "Dessert";
    phases: ("Menstrual" | "Follicular" | "Ovulation" | "Luteal")[];
    prepTime: number;
    cookTime: number;
    servings: number;
    ingredients: Ingredient[];
    instructions: string[];
    nutrition?: Nutrition;
    feelings?: string[];
    nutrients?: string[];
    phaseBenefits?: Record<string, string>;
    phase?: string;
    time?: string;
}

type RecipeFormData = z.infer<typeof recipeSchema>;

interface RecipeModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "create" | "edit";
    initialData?: Recipe;
}

export function RecipeModal({ isOpen, onClose, mode, initialData }: RecipeModalProps) {
    const recipe = mode === "edit" && initialData ? initialData : null;

    const [createRecipe, { isLoading: isCreating }] = useCreateRecipeMutation();
    const [updateRecipe, { isLoading: isUpdating }] = useUpdateRecipeMutation();

    const [image, setImage] = useState(() => getImageUrl(recipe?.image) || "");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<RecipeFormData>({
        resolver: zodResolver(recipeSchema),
        defaultValues: {
            title: recipe?.title || "",
            description: recipe?.description || "",
            image: recipe?.image || "",
            category: recipe?.category || "Breakfast",
            phases: recipe?.phases || (recipe?.phase ? [recipe.phase] : []),
            prepTime: recipe?.prepTime ? Number(recipe.prepTime) : (recipe?.time ? Number(recipe.time.replace(" min", "")) : 0),
            cookTime: Number(recipe?.cookTime) || 0,
            servings: Number(recipe?.servings) || 0,
            ingredients: recipe?.ingredients?.map((ing) => ({
                name: ing.name || "",
                amount: ing.amount?.toString() || "",
                unit: ing.unit || "",
            })) || [{ name: "", amount: "", unit: "" }],
            instructions: recipe?.instructions?.map((step) => ({ value: step })) || [{ value: "" }],
            nutrition: {
                calories: Number(recipe?.nutrition?.calories) || 0,
                protein: Number(recipe?.nutrition?.protein) || 0,
                carbs: Number(recipe?.nutrition?.carbs) || 0,
                fat: Number(recipe?.nutrition?.fat) || 0,
            },
            feelings: recipe?.feelings || [],
            nutrients: recipe?.nutrients || [],
            phaseBenefits: recipe?.phaseBenefits || {},
        },
    });

    const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
        control,
        name: "ingredients",
    });

    const { fields: instructionFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
        control,
        name: "instructions",
    });

    const phases = watch("phases");
    const category = watch("category");
    const phaseBenefits = watch("phaseBenefits") || {};

    useEffect(() => {
        if (isOpen) {
            reset({
                title: recipe?.title || "",
                description: recipe?.description || "",
                image: recipe?.image || "",
                category: recipe?.category || "Breakfast",
                phases: recipe?.phases || (recipe?.phase ? [recipe.phase] : []),
                prepTime: recipe?.prepTime ? Number(recipe.prepTime) : (recipe?.time ? Number(recipe.time.replace(" min", "")) : 0),
                cookTime: Number(recipe?.cookTime) || 0,
                servings: Number(recipe?.servings) || 0,
                ingredients: recipe?.ingredients?.map((ing) => ({
                    name: ing.name || "",
                    amount: ing.amount?.toString() || "",
                    unit: ing.unit || "",
                })) || [{ name: "", amount: "", unit: "" }],
                instructions: recipe?.instructions?.map((step) => ({ value: step })) || [{ value: "" }],
                nutrition: {
                    calories: Number(recipe?.nutrition?.calories) || 0,
                    protein: Number(recipe?.nutrition?.protein) || 0,
                    carbs: Number(recipe?.nutrition?.carbs) || 0,
                    fat: Number(recipe?.nutrition?.fat) || 0,
                },
                feelings: recipe?.feelings || [],
                nutrients: recipe?.nutrients || [],
                phaseBenefits: recipe?.phaseBenefits || {},
            });
            setImage(getImageUrl(recipe?.image) || "");
            setImageFile(null);
        }
    }, [isOpen, recipe, reset]);

    const categories = ["Breakfast", "Lunch", "Dinner", "Snack", "Smoothie", "Dessert"];
    const allPhases = ["Menstrual", "Follicular", "Ovulation", "Luteal"];

    const togglePhase = (phase: string) => {
        const currentPhases = phases || [];
        if (currentPhases.includes(phase)) {
            setValue("phases", currentPhases.filter(p => p !== phase), { shouldValidate: true });
        } else {
            setValue("phases", [...currentPhases, phase], { shouldValidate: true });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImage(URL.createObjectURL(file));
            setValue("image", file.name, { shouldValidate: true });
        }
    };

    const onSave = async (data: RecipeFormData) => {
        const payload = {
            ...data,
            instructions: data.instructions.map(i => i.value),
        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(payload));

        if (imageFile) {
            formData.append("images", imageFile);
        }

        try {
            if (mode === "create") {
                const res = await createRecipe(formData).unwrap();
                if (res.success) {
                    toast.success(res.message || "Recipe created successfully");
                    onClose();
                }
            } else {
                if (!recipe?._id) {
                    toast.error("Recipe ID not found for update");
                    return;
                }
                const res = await updateRecipe({ id: recipe._id, data: formData }).unwrap();
                if (res.success) {
                    toast.success(res.message || "Recipe updated successfully");
                    onClose();
                }
            }
        } catch (error: any) {
            toast.error(error?.data?.message || `Failed to ${mode} recipe`);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-full max-h-[90vh] flex flex-col p-0 bg-secondary backdrop-blur-sm border-none max-w-[90vw] sm:max-w-[50vw]">
                <form onSubmit={handleSubmit(onSave)} className="flex flex-col h-full overflow-hidden">
                    <DialogHeader className="p-6 pb-2">
                        <div className="flex justify-between items-center">
                            <DialogTitle className="text-xl font-serif text-foreground uppercase tracking-widest">
                                {mode === "create" ? "CREATE NEW RECIPE" : "EDIT NEW RECIPE"}
                            </DialogTitle>
                        </div>
                    </DialogHeader>

                    <div className="flex-1 px-6 overflow-y-auto">
                        <div className="space-y-6 pb-6">
                            {/* Recipe Name */}
                            <div className="space-y-2">
                                <Label>Recipe Name *</Label>
                                <Input 
                                    placeholder="e.g., Iron-Rich Spinach Smoothie" 
                                    className={`bg-white border-none shadow-sm ${errors.title ? "ring-2 ring-red-500" : ""}`}
                                    {...register("title")}
                                />
                                {errors.title && (
                                    <p className="text-xs text-red-500">{errors.title.message}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea 
                                    placeholder="Brief description of the recipe..." 
                                    className="bg-white border-none shadow-sm min-h-[100px] resize-none"
                                    {...register("description")}
                                />
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-2">
                                <Label>Recipe Image *</Label>
                                <div 
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                                        errors.image ? "border-red-500 bg-red-50/10" : "border-white/40 hover:bg-white/10"
                                    }`}
                                >
                                    {image ? (
                                        <div className="relative w-full h-40 rounded-lg overflow-hidden">
                                            <img src={image} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                <Upload className="w-8 h-8 text-white" />
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className={`w-8 h-8 mb-2 ${errors.image ? "text-red-500" : "text-muted-foreground"}`} />
                                            <span className={`text-sm text-center ${errors.image ? "text-red-500" : "text-muted-foreground"}`}>
                                                Click to upload recipe image
                                            </span>
                                        </>
                                    )}
                                    <input 
                                        type="file" 
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden" 
                                        accept="image/*"
                                    />
                                </div>
                                {errors.image && (
                                    <p className="text-xs text-red-500">{errors.image.message}</p>
                                )}
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <Label>Category *</Label>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(cat => (
                                        <button
                                            type="button"
                                            key={cat}
                                            onClick={() => setValue("category", cat, { shouldValidate: true })}
                                            className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                                                category === cat
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-white text-foreground hover:bg-white/80"
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                                {errors.category && (
                                    <p className="text-xs text-red-500">{errors.category.message}</p>
                                )}
                            </div>

                            {/* Cycle Phases */}
                            <div className="space-y-2">
                                <Label>Cycle Phases * (Select at least one)</Label>
                                <div className="flex flex-wrap gap-2">
                                    {allPhases.map(phase => (
                                        <button
                                            type="button"
                                            key={phase}
                                            onClick={() => togglePhase(phase)}
                                            className={`px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-colors ${
                                                phases?.includes(phase)
                                                    ? "bg-sidebar-accent text-sidebar-foreground"
                                                    : "bg-white text-foreground hover:bg-white/80"
                                            }`}
                                        >
                                            {phase === "Menstrual" && <Spade className="w-3 h-3 fill-current" />}
                                            {phase === "Follicular" && <Spade className="w-3 h-3 fill-current" />}
                                            {phase === "Ovulation" && <div className="w-3 h-3 rounded-sm rotate-45 bg-current" />}
                                            {phase === "Luteal" && <div className="w-3 h-3 rounded-full bg-current" />}
                                            {phase}
                                        </button>
                                    ))}
                                </div>
                                {errors.phases && (
                                    <p className="text-xs text-red-500">{errors.phases.message}</p>
                                )}
                            </div>

                            {/* Time & Servings */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label>Prep Time (min) *</Label>
                                    <Input 
                                        type="number" 
                                        placeholder="15" 
                                        className={`bg-white border-none shadow-sm ${errors.prepTime ? "ring-2 ring-red-500" : ""}`}
                                        {...register("prepTime")}
                                    />
                                    {errors.prepTime && (
                                        <p className="text-[10px] text-red-500">{errors.prepTime.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Cook Time (min) *</Label>
                                    <Input 
                                        type="number" 
                                        placeholder="30" 
                                        className={`bg-white border-none shadow-sm ${errors.cookTime ? "ring-2 ring-red-500" : ""}`}
                                        {...register("cookTime")}
                                    />
                                    {errors.cookTime && (
                                        <p className="text-[10px] text-red-500">{errors.cookTime.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Servings *</Label>
                                    <Input 
                                        type="number" 
                                        placeholder="4" 
                                        className={`bg-white border-none shadow-sm ${errors.servings ? "ring-2 ring-red-500" : ""}`}
                                        {...register("servings")}
                                    />
                                    {errors.servings && (
                                        <p className="text-[10px] text-red-500">{errors.servings.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Ingredients */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label>Ingredients *</Label>
                                    <Button 
                                        type="button"
                                        variant="secondary" 
                                        size="sm" 
                                        onClick={() => appendIngredient({ name: "", amount: '0', unit: "" })}
                                        className="bg-primary text-primary-foreground hover:bg-primary/90 h-7"
                                    >
                                        <Plus className="w-3 h-3 mr-1" /> Add
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    {ingredientFields.map((field, i) => (
                                        <div key={field.id} className="flex flex-col gap-1">
                                            <div className="flex gap-2">
                                                <Input 
                                                    placeholder="Ingredient name" 
                                                    className={`flex-1 bg-white border-none shadow-sm ${errors.ingredients?.[i]?.name ? "ring-1 ring-red-500" : ""}`}
                                                    {...register(`ingredients.${i}.name` as const)}
                                                />
                                                <Input 
                                                    placeholder="Amount" 
                                                    className={`w-24 bg-white border-none shadow-sm ${errors.ingredients?.[i]?.amount ? "ring-1 ring-red-500" : ""}`}
                                                    {...register(`ingredients.${i}.amount` as const)}
                                                />
                                                <Input 
                                                    placeholder="Unit" 
                                                    className={`w-24 bg-white border-none shadow-sm ${errors.ingredients?.[i]?.unit ? "ring-1 ring-red-500" : ""}`}
                                                    {...register(`ingredients.${i}.unit` as const)}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeIngredient(i)}
                                                    className="text-muted-foreground hover:text-red-500"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <div className="flex gap-2 px-1">
                                                {errors.ingredients?.[i]?.name && (
                                                    <p className="text-[10px] text-red-500 flex-1">{errors.ingredients[i]?.name?.message}</p>
                                                )}
                                                {errors.ingredients?.[i]?.amount && (
                                                    <p className="text-[10px] text-red-500 w-24 text-center">{errors.ingredients[i]?.amount?.message}</p>
                                                )}
                                                {errors.ingredients?.[i]?.unit && (
                                                    <p className="text-[10px] text-red-500 w-24 text-center">{errors.ingredients[i]?.unit?.message}</p>
                                                )}
                                                <div className="w-8" /> {/* Placeholder for the delete button width */}
                                            </div>
                                        </div>
                                    ))}
                                    {errors.ingredients?.root && (
                                        <p className="text-xs text-red-500">{errors.ingredients.root.message}</p>
                                    )}
                                    {errors.ingredients?.message && (
                                        <p className="text-xs text-red-500">{errors.ingredients.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Instructions */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label>Instructions *</Label>
                                    <Button 
                                        type="button"
                                        variant="secondary" 
                                        size="sm" 
                                        onClick={() => appendInstruction({ value: "" })}
                                        className="bg-primary text-primary-foreground hover:bg-primary/90 h-7"
                                    >
                                        <Plus className="w-3 h-3 mr-1" /> Add Step
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    {instructionFields.map((field, i) => (
                                        <div key={field.id} className="flex flex-col gap-1">
                                            <div className="flex gap-2 items-start">
                                                <span className="mt-2 text-xs font-medium text-muted-foreground w-4">{i + 1}.</span>
                                                <Textarea 
                                                    placeholder={`Step ${i + 1} description...`}
                                                    className={`flex-1 bg-white border-none shadow-sm resize-none ${errors.instructions?.[i]?.value ? "ring-1 ring-red-500" : ""}`}
                                                    {...register(`instructions.${i}.value` as const)}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeInstruction(i)}
                                                    className="text-muted-foreground hover:text-red-500 mt-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            {errors.instructions?.[i]?.value && (
                                                <p className="text-[10px] text-red-500 ml-6">{errors.instructions[i]?.value?.message}</p>
                                            )}
                                        </div>
                                    ))}
                                    {errors.instructions?.root && (
                                        <p className="text-xs text-red-500">{errors.instructions.root.message}</p>
                                    )}
                                    {errors.instructions?.message && (
                                        <p className="text-xs text-red-500">{errors.instructions.message}</p>
                                    )}
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <Label>Nutrition Facts</Label>
                                <div className="grid grid-cols-4 gap-2">
                                    <div className="space-y-1">
                                        <span className="text-xs text-muted-foreground">Calories</span>
                                        <Input 
                                            placeholder="0" 
                                            className="bg-white border-none shadow-sm"
                                            {...register("nutrition.calories")}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs text-muted-foreground">Protein (g)</span>
                                        <Input 
                                            placeholder="0" 
                                            className="bg-white border-none shadow-sm"
                                            {...register("nutrition.protein")}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs text-muted-foreground">Carbs (g)</span>
                                        <Input 
                                            placeholder="0" 
                                            className="bg-white border-none shadow-sm"
                                            {...register("nutrition.carbs")}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs text-muted-foreground">Fat (g)</span>
                                        <Input 
                                            placeholder="0" 
                                            className="bg-white border-none shadow-sm"
                                            {...register("nutrition.fat")}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 rounded-2xl bg-white/80 border border-white shadow-sm p-5 space-y-4">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-semibold text-foreground">
                                        Phase-Specific Benefits (Optional)
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        Explain why this recipe is beneficial for each selected phase.
                                    </p>
                                </div>
                                {(!phases || phases.length === 0) ? (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                            <Spade className="w-4 h-4 text-primary fill-current" />
                                            <span>Phase Benefits</span>
                                        </div>
                                        <Textarea
                                            placeholder="e.g., Rich in iron to replenish blood loss, warming spices for comfort..."
                                            className="bg-white border-none shadow-sm min-h-[90px] resize-none text-sm"
                                            {...register("phaseBenefits.General")}
                                        />
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {phases.map((phase) => (
                                            <div key={phase} className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                                    {phase === "Menstrual" && (
                                                        <Spade className="w-4 h-4 text-primary fill-current" />
                                                    )}
                                                    {phase === "Follicular" && (
                                                        <Spade className="w-4 h-4 text-primary fill-current" />
                                                    )}
                                                    {phase === "Ovulation" && (
                                                        <div className="w-3 h-3 rounded-sm rotate-45 bg-primary" />
                                                    )}
                                                    {phase === "Luteal" && (
                                                        <div className="w-3 h-3 rounded-full bg-primary" />
                                                    )}
                                                    <span>{phase} Phase Benefits</span>
                                                </div>
                                                <Textarea
                                                    placeholder="e.g., Rich in iron to replenish blood loss, warming spices for comfort..."
                                                    className="bg-white border-none shadow-sm min-h-[90px] resize-none text-sm"
                                                    {...register(`phaseBenefits.${phase}`)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>

                    <div className="p-6 pt-2 bg-sidebar/50 backdrop-blur-sm flex gap-4 justify-between">
                        <Button 
                            type="button"
                            variant="ghost" 
                            onClick={onClose}
                            className="flex-1 bg-white hover:bg-white/80 text-foreground"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit"
                            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                            disabled={isCreating || isUpdating}
                        >
                            {isCreating || isUpdating ? "Saving..." : mode === "create" ? "Create Recipe" : "Update Recipe"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

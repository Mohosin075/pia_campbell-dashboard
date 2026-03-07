"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Spade, Upload } from "lucide-react";
import { useState, useRef } from "react";
import { useCreateRecipeMutation, useUpdateRecipeMutation } from "@/redux/features/recipe/recipeApi";
import { toast } from "sonner";
import { getImageUrl } from "@/utils/imageUrl";

interface RecipeModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "create" | "edit";
    initialData?: any;
}

export function RecipeModal({ isOpen, onClose, mode, initialData }: RecipeModalProps) {
    const recipe = mode === "edit" && initialData ? initialData : null;

    const [createRecipe, { isLoading: isCreating }] = useCreateRecipeMutation();
    const [updateRecipe, { isLoading: isUpdating }] = useUpdateRecipeMutation();

    // Form State
    const [title, setTitle] = useState(() => recipe?.title || "");
    const [description, setDescription] = useState(() => recipe?.description || "");
    const [image, setImage] = useState(() => getImageUrl(recipe?.image) || "");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [category, setCategory] = useState(() => recipe?.category || "Breakfast");
    const [phases, setPhases] = useState<string[]>(() =>
        recipe?.phases || (recipe?.phase ? [recipe.phase] : [])
    );
    const [prepTime, setPrepTime] = useState(() =>
        recipe?.prepTime?.toString() || (recipe?.time ? recipe.time.replace(" min", "") : "")
    );
    const [cookTime, setCookTime] = useState(() => recipe?.cookTime?.toString() || "");
    const [servings, setServings] = useState(() => recipe?.servings?.toString() || "");
    const [ingredients, setIngredients] = useState(
        () => recipe?.ingredients || [{ name: "", amount: "", unit: "" }]
    );
    const [instructions, setInstructions] = useState<string[]>(
        () => recipe?.instructions || [""]
    );
    const [nutrition, setNutrition] = useState(() => ({
        calories: recipe?.nutrition?.calories || "",
        protein: recipe?.nutrition?.protein || "",
        carbs: recipe?.nutrition?.carbs || "",
        fat: recipe?.nutrition?.fat || "",
    }));
    const [feelings, setFeelings] = useState<string[]>(() => recipe?.feelings || []);
    const [nutrients, setNutrients] = useState<string[]>(() => recipe?.nutrients || []);
    const [phaseBenefits, setPhaseBenefits] = useState<Record<string, string>>(
        () => recipe?.phaseBenefits || {}
    );

    const categories = ["Breakfast", "Lunch", "Dinner", "Snack", "Smoothie", "Dessert"];
    const allPhases = ["Menstrual", "Follicular", "Ovulation", "Luteal"];

    const togglePhase = (phase: string) => {
        if (phases.includes(phase)) {
            setPhases(phases.filter(p => p !== phase));
        } else {
            setPhases([...phases, phase]);
        }
    };

    const addIngredient = () => {
        setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
    };

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_ : any, i : any) => i !== index));
    };

    const addInstruction = () => {
        setInstructions([...instructions, ""]);
    };

    const removeInstruction = (index: number) => {
        setInstructions(instructions.filter((_, i) => i !== index));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSave = async () => {
        if (!title || !category || phases.length === 0 || ingredients.some((ing: any) => !ing.name)) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const payload = {
            title,
            description,
            category,
            phases,
            prepTime: Number(prepTime) || 0,
            cookTime: Number(cookTime) || 0,
            servings: Number(servings) || 0,
            ingredients,
            instructions,
            nutrition: {
                calories: Number(nutrition.calories) || 0,
                protein: Number(nutrition.protein) || 0,
                carbs: Number(nutrition.carbs) || 0,
                fat: Number(nutrition.fat) || 0,
            },
            feelings,
            nutrients,
            phaseBenefits,
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
                                className="bg-white border-none shadow-sm"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea 
                                placeholder="Brief description of the recipe..." 
                                className="bg-white border-none shadow-sm min-h-[100px] resize-none"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Label>Recipe Image</Label>
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-white/40 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
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
                                        <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                                        <span className="text-sm text-muted-foreground text-center">
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
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <Label>Category *</Label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
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
                        </div>

                        {/* Cycle Phases */}
                        <div className="space-y-2">
                            <Label>Cycle Phases * (Select at least one)</Label>
                            <div className="flex flex-wrap gap-2">
                                {allPhases.map(phase => (
                                    <button
                                        key={phase}
                                        onClick={() => togglePhase(phase)}
                                        className={`px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-colors ${
                                            phases.includes(phase)
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
                        </div>

                        {/* Time & Servings */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Prep Time (min)</Label>
                                <Input 
                                    type="number" 
                                    placeholder="15" 
                                    className="bg-white border-none shadow-sm"
                                    value={prepTime}
                                    onChange={(e) => setPrepTime(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Cook Time (min)</Label>
                                <Input 
                                    type="number" 
                                    placeholder="30" 
                                    className="bg-white border-none shadow-sm"
                                    value={cookTime}
                                    onChange={(e) => setCookTime(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Servings</Label>
                                <Input 
                                    type="number" 
                                    placeholder="4" 
                                    className="bg-white border-none shadow-sm"
                                    value={servings}
                                    onChange={(e) => setServings(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Ingredients */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <Label>Ingredients *</Label>
                                <Button 
                                    variant="secondary" 
                                    size="sm" 
                                    onClick={addIngredient}
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 h-7"
                                >
                                    <Plus className="w-3 h-3 mr-1" /> Add
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {ingredients.map((ing : any, i : any) => (
                                    <div key={i} className="flex gap-2">
                                        <Input 
                                            placeholder="Ingredient name" 
                                            className="flex-1 bg-white border-none shadow-sm"
                                            value={ing.name}
                                            onChange={(e) => {
                                                const newIngs = [...ingredients];
                                                newIngs[i].name = e.target.value;
                                                setIngredients(newIngs);
                                            }}
                                        />
                                        <Input 
                                            placeholder="Amount" 
                                            className="w-24 bg-white border-none shadow-sm"
                                            value={ing.amount}
                                            onChange={(e) => {
                                                const newIngs = [...ingredients];
                                                newIngs[i].amount = e.target.value;
                                                setIngredients(newIngs);
                                            }}
                                        />
                                        <Input 
                                            placeholder="Unit" 
                                            className="w-24 bg-white border-none shadow-sm"
                                            value={ing.unit}
                                            onChange={(e) => {
                                                const newIngs = [...ingredients];
                                                newIngs[i].unit = e.target.value;
                                                setIngredients(newIngs);
                                            }}
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeIngredient(i)}
                                            className="text-muted-foreground hover:text-red-500"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <Label>Instructions *</Label>
                                <Button 
                                    variant="secondary" 
                                    size="sm" 
                                    onClick={addInstruction}
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 h-7"
                                >
                                    <Plus className="w-3 h-3 mr-1" /> Add Step
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {instructions.map((step, i) => (
                                    <div key={i} className="flex gap-2 items-start">
                                        <span className="mt-2 text-xs font-medium text-muted-foreground w-4">{i + 1}.</span>
                                        <Textarea 
                                            placeholder={`Step ${i + 1} description...`}
                                            className="flex-1 bg-white border-none shadow-sm resize-none"
                                            value={step}
                                            onChange={(e) => {
                                                const newInst = [...instructions];
                                                newInst[i] = e.target.value;
                                                setInstructions(newInst);
                                            }}
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeInstruction(i)}
                                            className="text-muted-foreground hover:text-red-500 mt-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
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
                                        value={nutrition.calories}
                                        onChange={(e) => setNutrition({...nutrition, calories: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground">Protein (g)</span>
                                    <Input 
                                        placeholder="0" 
                                        className="bg-white border-none shadow-sm"
                                        value={nutrition.protein}
                                        onChange={(e) => setNutrition({...nutrition, protein: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground">Carbs (g)</span>
                                    <Input 
                                        placeholder="0" 
                                        className="bg-white border-none shadow-sm"
                                        value={nutrition.carbs}
                                        onChange={(e) => setNutrition({...nutrition, carbs: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground">Fat (g)</span>
                                    <Input 
                                        placeholder="0" 
                                        className="bg-white border-none shadow-sm"
                                        value={nutrition.fat}
                                        onChange={(e) => setNutrition({...nutrition, fat: e.target.value})}
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
                            {phases.length === 0 ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                        <Spade className="w-4 h-4 text-primary fill-current" />
                                        <span>Phase Benefits</span>
                                    </div>
                                    <Textarea
                                        placeholder="e.g., Rich in iron to replenish blood loss, warming spices for comfort..."
                                        className="bg-white border-none shadow-sm min-h-[90px] resize-none text-sm"
                                        value={phaseBenefits["General"] || ""}
                                        onChange={(e) =>
                                            setPhaseBenefits({
                                                ...phaseBenefits,
                                                General: e.target.value,
                                            })
                                        }
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
                                                value={phaseBenefits[phase] || ""}
                                                onChange={(e) =>
                                                    setPhaseBenefits({
                                                        ...phaseBenefits,
                                                        [phase]: e.target.value,
                                                    })
                                                }
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
                        variant="ghost" 
                        onClick={onClose}
                        className="flex-1 bg-white hover:bg-white/80 text-foreground"
                    >
                        Cancel
                    </Button>
                    <Button 
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={handleSave}
                        disabled={isCreating || isUpdating}
                    >
                        {isCreating || isUpdating ? "Saving..." : mode === "create" ? "Create Recipe" : "Update Recipe"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

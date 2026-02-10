"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Spade } from "lucide-react";
import { useState, useEffect } from "react";

interface RecipeModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "create" | "edit";
    initialData?: any;
}

export function RecipeModal({ isOpen, onClose, mode, initialData }: RecipeModalProps) {
    // Form State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("Breakfast");
    const [phases, setPhases] = useState<string[]>([]);
    const [prepTime, setPrepTime] = useState("");
    const [cookTime, setCookTime] = useState("");
    const [servings, setServings] = useState("");
    const [ingredients, setIngredients] = useState([{ name: "", amount: "", unit: "" }]);
    const [instructions, setInstructions] = useState([""]);
    const [nutrition, setNutrition] = useState({ calories: "", protein: "", carbs: "", fat: "" });
    const [phaseBenefits, setPhaseBenefits] = useState<Record<string, string>>({});

    // Reset or Populate form on open
    useEffect(() => {
        if (isOpen) {
            if (mode === "edit" && initialData) {
                setTitle(initialData.title || "");
                setDescription(initialData.description || "");
                setImage(initialData.image || "");
                setCategory(initialData.category || "Breakfast");
                setPhases(initialData.phase ? [initialData.phase] : []); // Mapping single phase to array for now
                setPrepTime(initialData.time ? initialData.time.replace(" min", "") : "");
                setCookTime(""); // Not in initialData mock
                setServings(""); // Not in initialData mock
                setIngredients(initialData.ingredients || [{ name: "", amount: "", unit: "" }]);
                setInstructions(initialData.instructions || [""]);
                setNutrition(initialData.nutrition || { calories: "", protein: "", carbs: "", fat: "" });
                setPhaseBenefits(initialData.phaseBenefits || {});
            } else {
                // Reset for create
                setTitle("");
                setDescription("");
                setImage("");
                setCategory("Breakfast");
                setPhases([]);
                setPrepTime("");
                setCookTime("");
                setServings("");
                setIngredients([{ name: "", amount: "", unit: "" }]);
                setInstructions([""]);
                setNutrition({ calories: "", protein: "", carbs: "", fat: "" });
                setPhaseBenefits({});
            }
        }
    }, [isOpen, mode, initialData]);

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
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const addInstruction = () => {
        setInstructions([...instructions, ""]);
    };

    const removeInstruction = (index: number) => {
        setInstructions(instructions.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        // Here you would typically call an API
        console.log("Saving recipe:", {
            title, description, image, category, phases,
            prepTime, cookTime, servings, ingredients, instructions,
            nutrition, phaseBenefits
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 bg-sidebar/50 backdrop-blur-sm border-none">
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

                        {/* Image URL */}
                        <div className="space-y-2">
                            <Label>Image URL</Label>
                            <Input 
                                placeholder="https://..." 
                                className="bg-white border-none shadow-sm"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
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
                                {ingredients.map((ing, i) => (
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
                        
                        {/* Nutrition */}
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
                    >
                        {mode === "create" ? "Create Recipe" : "Update Recipe"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

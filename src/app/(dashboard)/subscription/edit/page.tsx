"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, X, Star } from "lucide-react";
import { useRouter } from "next/navigation";

interface PlanFeature {
  id: string;
  text: string;
}

interface Plan {
  id: string;
  name: string;
  billingCycle: string;
  price: string;
  isPopular: boolean;
  features: PlanFeature[];
  description?: string;
}

export default function SubscriptionEditPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: "free",
      name: "FREE PLAN",
      billingCycle: "Monthly Billing",
      price: "14.99",
      isPopular: false,
      features: [
        { id: "1", text: "Unlimited recipe access" },
        { id: "2", text: "Personalized meal plans" },
        { id: "3", text: "Grocery list generator" },
        { id: "4", text: "Cycle tracking" },
        { id: "5", text: "Health insights" },
      ]
    },
    {
      id: "yearly",
      name: "YEARLY PLAN",
      billingCycle: "Yearly Billing",
      price: "99.99",
      isPopular: true,
      description: "$8.33/month when billed annually",
      features: [
        { id: "1", text: "Everything in Monthly" },
        { id: "2", text: "Save 44% annually" },
        { id: "3", text: "Priority support" },
        { id: "4", text: "Early access to new features" },
        { id: "5", text: "Exclusive wellness content" },
        { id: "6", text: "Personal nutrition coach" },
      ]
    },
    {
      id: "monthly",
      name: "MONTHLY PLAN",
      billingCycle: "Monthly Billing",
      price: "14.99",
      isPopular: false,
      features: [
        { id: "1", text: "Unlimited recipe access" },
        { id: "2", text: "Personalized meal plans" },
        { id: "3", text: "Grocery list generator" },
        { id: "4", text: "Cycle tracking" },
        { id: "5", text: "Health insights" },
      ]
    }
  ]);

  const updatePlan = (planId: string, field: keyof Plan, value: any) => {
    setPlans(plans.map(plan => 
      plan.id === planId ? { ...plan, [field]: value } : plan
    ));
  };

  const updateFeature = (planId: string, featureId: string, text: string) => {
    setPlans(plans.map(plan => {
      if (plan.id !== planId) return plan;
      return {
        ...plan,
        features: plan.features.map(f => f.id === featureId ? { ...f, text } : f)
      };
    }));
  };

  const addFeature = (planId: string) => {
    setPlans(plans.map(plan => {
      if (plan.id !== planId) return plan;
      return {
        ...plan,
        features: [...plan.features, { id: Math.random().toString(), text: "New feature" }]
      };
    }));
  };

  const removeFeature = (planId: string, featureId: string) => {
    setPlans(plans.map(plan => {
      if (plan.id !== planId) return plan;
      return {
        ...plan,
        features: plan.features.filter(f => f.id !== featureId)
      };
    }));
  };

  const handleSave = () => {
    console.log("Saving plans:", plans);
    // Add toast or API call here
    router.push("/subscription");
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 pb-24">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-serif text-foreground uppercase tracking-widest">EDIT SUBSCRIPTION PLANS</h1>
          <p className="text-muted-foreground mt-1">Update pricing and features</p>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full"
          onClick={() => router.push("/subscription")}
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Edit Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="font-serif text-xl uppercase tracking-wider text-foreground">{plan.name}</CardTitle>
                  <CardDescription className="mt-1">{plan.billingCycle}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {plan.isPopular ? (
                    <Badge className="bg-[#F48FB1] hover:bg-[#F48FB1]/90 text-white gap-1 px-3 py-1 rounded-full border-none">
                      <Star className="w-3 h-3 fill-current" /> Popular
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full px-3 py-1 border-none cursor-pointer" onClick={() => updatePlan(plan.id, 'isPopular', true)}>
                      Set Popular
                    </Badge>
                  )}
                  {plan.isPopular && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 rounded-full text-muted-foreground"
                      onClick={() => updatePlan(plan.id, 'isPopular', false)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <Label className="text-sm text-foreground/70">Price (USD)</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</div>
                  <Input 
                    value={plan.price}
                    onChange={(e) => updatePlan(plan.id, 'price', e.target.value)}
                    className="pl-7 bg-[#FDE8ED] border-none text-foreground font-medium h-10"
                  />
                </div>
                {plan.description && (
                  <p className="text-xs text-muted-foreground mt-1">{plan.description}</p>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Label className="font-serif text-foreground">Features</Label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-auto p-0 text-[#F48FB1] hover:text-[#F48FB1]/80 hover:bg-transparent text-xs"
                  onClick={() => addFeature(plan.id)}
                >
                  + Add Feature
                </Button>
              </div>
              
              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature.id} className="flex gap-2 items-center group">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <Input 
                      value={feature.text}
                      onChange={(e) => updateFeature(plan.id, feature.id, e.target.value)}
                      className="flex-1 bg-[#FDE8ED] border-none h-9 text-sm"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFeature(plan.id, feature.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Preview Section */}
      <div className="pt-8">
        <h2 className="text-lg font-serif text-foreground mb-6">Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className="border-none shadow-sm bg-white overflow-hidden h-full">
              <CardHeader className="pb-4">
                 <div className="flex justify-between items-start">
                    <CardTitle className="font-serif text-xl uppercase tracking-wider text-foreground">{plan.name}</CardTitle>
                    {plan.isPopular && (
                        <Badge className="bg-[#F48FB1] hover:bg-[#F48FB1]/90 text-white gap-1 px-3 py-1 rounded-full border-none">
                            <Star className="w-3 h-3 fill-current" /> Most Popular
                        </Badge>
                    )}
                 </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-serif text-[#F48FB1] font-medium">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.billingCycle.includes("Yearly") ? "yr" : "mo"}</span>
                </div>
                {plan.description && (
                  <p className="text-xs text-muted-foreground mt-1">{plan.description}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature.id} className="flex gap-3 items-start">
                      <div className="mt-1">
                        <Check className="w-4 h-4 text-green-500" />
                      </div>
                      <span className="text-sm text-foreground/80">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t flex justify-center gap-4 z-50 md:pl-64">
        <div className="w-full max-w-4xl flex gap-4">
            <Button 
              variant="outline" 
              className="flex-1 rounded-xl h-12 border-gray-200" 
              onClick={() => router.push("/subscription")}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 rounded-xl h-12 bg-[#F48FB1] hover:bg-[#F48FB1]/90 text-white" 
              onClick={handleSave}
            >
              Save Changes
            </Button>
        </div>
      </div>
    </div>
  );
}

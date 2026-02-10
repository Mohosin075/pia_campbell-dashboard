"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Copy, Tags, Zap, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { CreatePromotionModal } from "@/components/dashboard/promotions/PromotionModal";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
    useGetMyPromotionsQuery,
    useTogglePromotionStatusMutation,
    useCreatePromotionMutation,
    useGetOrganizerPromotionStatsQuery, // Import the new hook
} from "@/redux/features/promotion/promotionApi";
import { toast } from "sonner";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export default function PromotionsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    // Fetch promotion statistics
    const { data: statsData, isLoading: statsLoading, isError: statsError, refetch: refetchStats } = useGetOrganizerPromotionStatsQuery(undefined);

    // Fetch promotions
    const {
        data: promotionsData,
        isLoading: promotionsLoading,
        isError: promotionsError,
        refetch: refetchPromotions,
    } = useGetMyPromotionsQuery({
        page: currentPage,
        limit: pageSize,
    });

    const [togglePromotionStatus] = useTogglePromotionStatusMutation();
    const [createPromotion] = useCreatePromotionMutation();

    const promotions = promotionsData?.data || [];
    const meta = promotionsData?.meta;
    const totalPages = meta?.totalPages || 1;

    // Handle toggle promotion status
    const handleToggleStatus = async (id: string) => {
        try {
            await togglePromotionStatus(id).unwrap();
            refetchPromotions();
            refetchStats(); // Also refetch stats since they changed
            toast.success("Promotion status updated successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update promotion status");
        }
    };

    // Handle create promotion from modal
    const handleCreatePromotion = async (data: any) => {
        try {
            // Format the data to match API
            const promotionData = {
                code: data.promotionCode,
                description: `Promotion code: ${data.promotionCode}`,
                discountType: data.discountType,
                discountValue: parseFloat(data.percentage),
                validUntil: new Date(data.validUntil).toISOString(),
                usageLimit: parseInt(data.usageLimit),
                isSingleUse: false,
            };

            await createPromotion(promotionData).unwrap();
            setIsModalOpen(false);
            refetchPromotions();
            refetchStats(); // Also refetch stats since new promotion was created
            toast.success("Promotion created successfully");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to create promotion");
        }
    };

    // Copy code to clipboard
    const handleCopyCode = async (code: string) => {
        try {
            await navigator.clipboard.writeText(code);
            toast.success("Copied to clipboard!");
        } catch (err) {
            console.log(err);
            toast.error("Failed to copy code");
        }
    };

    // Use API stats instead of calculating from promotions
    const stats = statsData?.data || {
        activePromotions: 0,
        totalPromotions: 0,
        totalRedemptions: 0,
    };

    const isLoading = statsLoading || promotionsLoading;
    const isError = statsError || promotionsError;

    if (isLoading) {
        return (
            <div className="min-h-screen md:p-8 flex items-center justify-center">
                <div className="max-w-6xl mx-auto w-full">
                    {/* Header Skeleton */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger className="md:hidden block" />
                            <Skeleton className="h-10 w-64" />
                        </div>
                        <Skeleton className="h-5 w-80 mt-2" />
                    </div>

                    {/* Stats Section Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        {[1, 2, 3].map((i) => (
                            <Card key={i}>
                                <CardHeader className="pb-3">
                                    <Skeleton className="h-4 w-32" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-10 w-20" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Main Content Skeleton */}
                    <Card>
                        <CardHeader className="flex flex-col md:flex-row items-center justify-between pb-4 border-b">
                            <div>
                                <Skeleton className="h-6 w-48" />
                                <Skeleton className="h-4 w-64 mt-2" />
                            </div>
                            <Skeleton className="h-10 w-40" />
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-6">
                                {[1, 2].map((i) => (
                                    <Skeleton key={i} className="h-32 w-full" />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen md:p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center py-12">
                        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                        <p className="text-destructive mb-4">Failed to load promotions data.</p>
                        <div className="flex gap-2 justify-center">
                            <Button
                                onClick={() => {
                                    refetchPromotions();
                                    refetchStats();
                                }}
                            >
                                Retry
                            </Button>
                            <Button variant="outline" onClick={() => setIsModalOpen(true)}>
                                Create Promotion Anyway
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="md:hidden block" />
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Promotions & Discounts</h1>
                    </div>
                    <p className="text-muted-foreground">Manage your promotions with ease</p>
                </div>

                {/* Stats Section - Using API data */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Active Promotions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-foreground">{stats.activePromotions}</div>
                            <p className="text-xs text-muted-foreground mt-1">Currently active promotion codes</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Tags className="w-4 h-4" />
                                Total Promotions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-foreground">{stats.totalPromotions}</div>
                            <p className="text-xs text-muted-foreground mt-1">All promotions created</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <CalendarDays className="w-4 h-4" />
                                Total Redemptions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-foreground">{stats.totalRedemptions}</div>
                            <p className="text-xs text-muted-foreground mt-1">Total times promotions used</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Section */}
                <Card>
                    <CardHeader className="flex flex-col md:flex-row items-center justify-between pb-4 border-b">
                        <div>
                            <CardTitle>Promotions & Discounts</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                                Showing {promotions.length} of {stats.totalPromotions} promotions
                            </p>
                        </div>
                        <Button onClick={() => setIsModalOpen(true)} className="bg-primary text-primary-foreground">
                            + New Promotion
                        </Button>
                    </CardHeader>

                    <CardContent className="pt-6">
                        {/* Promotion Items */}
                        {promotions.length === 0 ? (
                            <div className="text-center py-12">
                                <Tags className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground mb-4">No promotions found</p>
                                <Button onClick={() => setIsModalOpen(true)}>Create Your First Promotion</Button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {promotions.map((promotion: any) => {
                                    const usagePercentage = (promotion.usedCount / promotion.usageLimit) * 100;
                                    const validDate = new Date(promotion.validUntil);
                                    const isExpired = new Date() > validDate;

                                    return (
                                        <div key={promotion._id} className="flex items-start justify-between pb-6 border-b last:border-b-0">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <h3 className="text-lg font-semibold text-foreground">{promotion.code}</h3>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant={!promotion.isActive ? "secondary" : isExpired ? "destructive" : "default"}>{!promotion.isActive ? "Inactive" : isExpired ? "Expired" : "Active"}</Badge>
                                                        {promotion.isActive && !isExpired && <Switch checked={promotion.isActive} onCheckedChange={() => handleToggleStatus(promotion._id)} />}
                                                    </div>
                                                    {/* Copy Button */}
                                                    <Button variant="ghost" size="sm" className="ml-auto" onClick={() => handleCopyCode(promotion.code)}>
                                                        <Copy className="w-4 h-4 mr-2" />
                                                        Copy Code
                                                    </Button>
                                                </div>

                                                {promotion.description && <p className="text-sm text-muted-foreground mb-4">{promotion.description}</p>}

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                                                    <div>
                                                        <p className="text-sm text-muted-foreground mb-1">Discount</p>
                                                        <p className="text-xl font-bold text-foreground">{promotion.discountType === "percentage" ? `${promotion.discountValue}%` : `$${promotion.discountValue}`}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-muted-foreground mb-1">Valid Until</p>
                                                        <p className="text-xl font-bold text-foreground">{format(validDate, "MM/dd/yyyy")}</p>
                                                        {isExpired && <p className="text-xs text-destructive mt-1">Expired</p>}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-muted-foreground mb-1">Usage</p>
                                                        <div className="flex items-center gap-2">
                                                            <Progress value={usagePercentage} className="flex-1 h-2" />
                                                            <p className="text-sm font-medium text-foreground">
                                                                {promotion.usedCount} / {promotion.usageLimit}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between pt-6 border-t">
                                <div className="text-sm text-muted-foreground">
                                    Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, meta?.total || 0)} of {meta?.total || 0} promotions
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                                        <ChevronLeft className="w-4 h-4 mr-1" />
                                        Previous
                                    </Button>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                            let pageNum;
                                            if (totalPages <= 5) {
                                                pageNum = i + 1;
                                            } else if (currentPage <= 3) {
                                                pageNum = i + 1;
                                            } else if (currentPage >= totalPages - 2) {
                                                pageNum = totalPages - 4 + i;
                                            } else {
                                                pageNum = currentPage - 2 + i;
                                            }
                                            return (
                                                <Button key={pageNum} variant={currentPage === pageNum ? "default" : "outline"} size="sm" className="w-8 h-8 p-0" onClick={() => setCurrentPage(pageNum)}>
                                                    {pageNum}
                                                </Button>
                                            );
                                        })}
                                    </div>
                                    <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                                        Next
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Modal */}
            <CreatePromotionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreatePromotion} />
        </div>
    );
}

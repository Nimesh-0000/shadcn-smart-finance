import type { TransactionType, FilterOptions } from '@/types';
import { DEFAULT_CATEGORIES } from '@/lib/constants';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
    filters: FilterOptions;
    onFilterChange: (filters: FilterOptions) => void;
}

export function CategoryFilter({ filters, onFilterChange }: CategoryFilterProps) {
    const hasActiveFilters = filters.category || filters.type || filters.startDate || filters.endDate;

    const clearFilters = () => {
        onFilterChange({});
    };

    return (
        <Card className="glass-effect border-white/10 bg-white/5">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Filters</CardTitle>
                    {hasActiveFilters && (
                        <Button variant="ghost" size="sm" onClick={clearFilters}>
                            <X className="h-4 w-4 mr-1" />
                            Clear
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="filter-type" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Type</Label>
                        <select
                            id="filter-type"
                            value={filters.type || ''}
                            onChange={(e) => onFilterChange({ ...filters, type: e.target.value as TransactionType || undefined })}
                            className="flex h-12 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm font-medium transition-colors focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 appearance-none"
                        >
                            <option value="">All Types</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="filter-category" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Category</Label>
                        <select
                            id="filter-category"
                            value={filters.category || ''}
                            onChange={(e) => onFilterChange({ ...filters, category: e.target.value || undefined })}
                            className="flex h-12 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm font-medium transition-colors focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 appearance-none"
                        >
                            <option value="">All Categories</option>
                            {DEFAULT_CATEGORIES.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.icon} {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="filter-start" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Start Date</Label>
                        <Input
                            id="filter-start"
                            type="date"
                            value={filters.startDate || ''}
                            onChange={(e) => onFilterChange({ ...filters, startDate: e.target.value || undefined })}
                            className="h-12 rounded-xl border-white/10 bg-black/40 px-4"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="filter-end" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">End Date</Label>
                        <Input
                            id="filter-end"
                            type="date"
                            value={filters.endDate || ''}
                            onChange={(e) => onFilterChange({ ...filters, endDate: e.target.value || undefined })}
                            className="h-12 rounded-xl border-white/10 bg-black/40 px-4"
                        />
                    </div>
                </div>

                {hasActiveFilters && (
                    <div className="flex flex-wrap gap-2 pt-2">
                        {filters.type && (
                            <Badge variant="secondary">
                                Type: {filters.type}
                            </Badge>
                        )}
                        {filters.category && (
                            <Badge variant="secondary">
                                {DEFAULT_CATEGORIES.find(c => c.id === filters.category)?.name}
                            </Badge>
                        )}
                        {filters.startDate && (
                            <Badge variant="secondary">
                                From: {filters.startDate}
                            </Badge>
                        )}
                        {filters.endDate && (
                            <Badge variant="secondary">
                                To: {filters.endDate}
                            </Badge>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

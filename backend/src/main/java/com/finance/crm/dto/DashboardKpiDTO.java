package com.finance.crm.dto;

import java.math.BigDecimal;

public class DashboardKpiDTO {
    private BigDecimal totalRevenue;
    private BigDecimal cashBalance;
    private BigDecimal accountsReceivable;
    private BigDecimal overdueAmount;
    private double revenueGrowth;
    private double overduePercentage;

    public DashboardKpiDTO() {
    }

    public DashboardKpiDTO(BigDecimal totalRevenue, BigDecimal cashBalance, BigDecimal accountsReceivable,
            BigDecimal overdueAmount, double revenueGrowth, double overduePercentage) {
        this.totalRevenue = totalRevenue;
        this.cashBalance = cashBalance;
        this.accountsReceivable = accountsReceivable;
        this.overdueAmount = overdueAmount;
        this.revenueGrowth = revenueGrowth;
        this.overduePercentage = overduePercentage;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public BigDecimal getCashBalance() {
        return cashBalance;
    }

    public void setCashBalance(BigDecimal cashBalance) {
        this.cashBalance = cashBalance;
    }

    public BigDecimal getAccountsReceivable() {
        return accountsReceivable;
    }

    public void setAccountsReceivable(BigDecimal accountsReceivable) {
        this.accountsReceivable = accountsReceivable;
    }

    public BigDecimal getOverdueAmount() {
        return overdueAmount;
    }

    public void setOverdueAmount(BigDecimal overdueAmount) {
        this.overdueAmount = overdueAmount;
    }

    public double getRevenueGrowth() {
        return revenueGrowth;
    }

    public void setRevenueGrowth(double revenueGrowth) {
        this.revenueGrowth = revenueGrowth;
    }

    public double getOverduePercentage() {
        return overduePercentage;
    }

    public void setOverduePercentage(double overduePercentage) {
        this.overduePercentage = overduePercentage;
    }

    public static DashboardKpiDTOBuilder builder() {
        return new DashboardKpiDTOBuilder();
    }

    public static class DashboardKpiDTOBuilder {
        private BigDecimal totalRevenue;
        private BigDecimal cashBalance;
        private BigDecimal accountsReceivable;
        private BigDecimal overdueAmount;
        private double revenueGrowth;
        private double overduePercentage;

        public DashboardKpiDTOBuilder totalRevenue(BigDecimal totalRevenue) {
            this.totalRevenue = totalRevenue;
            return this;
        }

        public DashboardKpiDTOBuilder cashBalance(BigDecimal cashBalance) {
            this.cashBalance = cashBalance;
            return this;
        }

        public DashboardKpiDTOBuilder accountsReceivable(BigDecimal accountsReceivable) {
            this.accountsReceivable = accountsReceivable;
            return this;
        }

        public DashboardKpiDTOBuilder overdueAmount(BigDecimal overdueAmount) {
            this.overdueAmount = overdueAmount;
            return this;
        }

        public DashboardKpiDTOBuilder revenueGrowth(double revenueGrowth) {
            this.revenueGrowth = revenueGrowth;
            return this;
        }

        public DashboardKpiDTOBuilder overduePercentage(double overduePercentage) {
            this.overduePercentage = overduePercentage;
            return this;
        }

        public DashboardKpiDTO build() {
            return new DashboardKpiDTO(totalRevenue, cashBalance, accountsReceivable, overdueAmount, revenueGrowth,
                    overduePercentage);
        }
    }
}

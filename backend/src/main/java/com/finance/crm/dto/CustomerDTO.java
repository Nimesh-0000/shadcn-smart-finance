package com.finance.crm.dto;

import java.math.BigDecimal;

public class CustomerDTO {
    private Long id;
    private String name;
    private String region;
    private BigDecimal totalRevenue;
    private BigDecimal outstandingBalance;
    private String status;
    private String lastActivity;

    public CustomerDTO() {
    }

    public CustomerDTO(Long id, String name, String region, BigDecimal totalRevenue, BigDecimal outstandingBalance,
            String status, String lastActivity) {
        this.id = id;
        this.name = name;
        this.region = region;
        this.totalRevenue = totalRevenue;
        this.outstandingBalance = outstandingBalance;
        this.status = status;
        this.lastActivity = lastActivity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public BigDecimal getOutstandingBalance() {
        return outstandingBalance;
    }

    public void setOutstandingBalance(BigDecimal outstandingBalance) {
        this.outstandingBalance = outstandingBalance;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLastActivity() {
        return lastActivity;
    }

    public void setLastActivity(String lastActivity) {
        this.lastActivity = lastActivity;
    }

    public static CustomerDTOBuilder builder() {
        return new CustomerDTOBuilder();
    }

    public static class CustomerDTOBuilder {
        private Long id;
        private String name;
        private String region;
        private BigDecimal totalRevenue;
        private BigDecimal outstandingBalance;
        private String status;
        private String lastActivity;

        public CustomerDTOBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public CustomerDTOBuilder name(String name) {
            this.name = name;
            return this;
        }

        public CustomerDTOBuilder region(String region) {
            this.region = region;
            return this;
        }

        public CustomerDTOBuilder totalRevenue(BigDecimal totalRevenue) {
            this.totalRevenue = totalRevenue;
            return this;
        }

        public CustomerDTOBuilder outstandingBalance(BigDecimal outstandingBalance) {
            this.outstandingBalance = outstandingBalance;
            return this;
        }

        public CustomerDTOBuilder status(String status) {
            this.status = status;
            return this;
        }

        public CustomerDTOBuilder lastActivity(String lastActivity) {
            this.lastActivity = lastActivity;
            return this;
        }

        public CustomerDTO build() {
            return new CustomerDTO(id, name, region, totalRevenue, outstandingBalance, status, lastActivity);
        }
    }
}

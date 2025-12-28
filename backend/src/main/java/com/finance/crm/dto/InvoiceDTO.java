package com.finance.crm.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class InvoiceDTO {
    private String id;
    private String customerName;
    private BigDecimal amount;
    private LocalDate dueDate;
    private String status;
    private String description;
    private String owner;

    public InvoiceDTO() {
    }

    public InvoiceDTO(String id, String customerName, BigDecimal amount, LocalDate dueDate, String status,
            String description, String owner) {
        this.id = id;
        this.customerName = customerName;
        this.amount = amount;
        this.dueDate = dueDate;
        this.status = status;
        this.description = description;
        this.owner = owner;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public static InvoiceDTOBuilder builder() {
        return new InvoiceDTOBuilder();
    }

    public static class InvoiceDTOBuilder {
        private String id;
        private String customerName;
        private BigDecimal amount;
        private LocalDate dueDate;
        private String status;
        private String description;
        private String owner;

        public InvoiceDTOBuilder id(String id) {
            this.id = id;
            return this;
        }

        public InvoiceDTOBuilder customerName(String customerName) {
            this.customerName = customerName;
            return this;
        }

        public InvoiceDTOBuilder amount(BigDecimal amount) {
            this.amount = amount;
            return this;
        }

        public InvoiceDTOBuilder dueDate(LocalDate dueDate) {
            this.dueDate = dueDate;
            return this;
        }

        public InvoiceDTOBuilder status(String status) {
            this.status = status;
            return this;
        }

        public InvoiceDTOBuilder description(String description) {
            this.description = description;
            return this;
        }

        public InvoiceDTOBuilder owner(String owner) {
            this.owner = owner;
            return this;
        }

        public InvoiceDTO build() {
            return new InvoiceDTO(id, customerName, amount, dueDate, status, description, owner);
        }
    }
}

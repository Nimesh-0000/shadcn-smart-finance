package com.finance.crm.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "invoices", indexes = {
        @Index(name = "idx_invoices_due_date", columnList = "due_date"),
        @Index(name = "idx_invoices_status", columnList = "status"),
        @Index(name = "idx_invoices_account_id", columnList = "account_id"),
        @Index(name = "idx_invoices_owner_id", columnList = "owner_id")
})
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public enum Status {
        OPEN, PAID, OVERDUE
    }

    public Invoice() {
    }

    public Invoice(Long id, Account account, BigDecimal amount, LocalDate dueDate, Status status, User owner,
            LocalDateTime createdAt) {
        this.id = id;
        this.account = account;
        this.amount = amount;
        this.dueDate = dueDate;
        this.status = status;
        this.owner = owner;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public static InvoiceBuilder builder() {
        return new InvoiceBuilder();
    }

    public static class InvoiceBuilder {
        private Long id;
        private Account account;
        private BigDecimal amount;
        private LocalDate dueDate;
        private Status status;
        private User owner;
        private LocalDateTime createdAt;

        public InvoiceBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public InvoiceBuilder account(Account account) {
            this.account = account;
            return this;
        }

        public InvoiceBuilder amount(BigDecimal amount) {
            this.amount = amount;
            return this;
        }

        public InvoiceBuilder dueDate(LocalDate dueDate) {
            this.dueDate = dueDate;
            return this;
        }

        public InvoiceBuilder status(Status status) {
            this.status = status;
            return this;
        }

        public InvoiceBuilder owner(User owner) {
            this.owner = owner;
            return this;
        }

        public InvoiceBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Invoice build() {
            return new Invoice(id, account, amount, dueDate, status, owner, createdAt);
        }
    }
}

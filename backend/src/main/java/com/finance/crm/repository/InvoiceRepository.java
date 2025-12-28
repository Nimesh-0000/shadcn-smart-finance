package com.finance.crm.repository;

import com.finance.crm.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    @Query("SELECT SUM(i.amount) FROM Invoice i WHERE (i.status = 'OPEN' OR i.status = 'OVERDUE') AND i.createdAt BETWEEN :start AND :end")
    BigDecimal calculateTotalAccountsReceivableInRange(LocalDateTime start, LocalDateTime end);

    @Query("SELECT SUM(i.amount) FROM Invoice i WHERE i.status = 'OVERDUE' AND i.createdAt BETWEEN :start AND :end")
    BigDecimal calculateTotalOverdueAmountInRange(LocalDateTime start, LocalDateTime end);

    @Query("SELECT SUM(i.amount) FROM Invoice i WHERE i.status = 'OVERDUE'")
    BigDecimal calculateTotalOverdueAmount();

    @Query("SELECT i FROM Invoice i WHERE i.status = 'OVERDUE' ORDER BY i.dueDate ASC")
    List<Invoice> findTopOverdueInvoices();

    @Query("SELECT i FROM Invoice i WHERE i.owner.id IS NULL")
    List<Invoice> findInvoicesWithoutOwner();

    @Query("SELECT i FROM Invoice i WHERE i.account.id = :accountId")
    List<Invoice> findByAccountId(@Param("accountId") Long accountId);
}

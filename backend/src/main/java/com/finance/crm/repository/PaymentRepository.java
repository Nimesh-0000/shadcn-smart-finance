package com.finance.crm.repository;

import com.finance.crm.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.paymentDate BETWEEN :start AND :end")
    BigDecimal calculateTotalRevenueInRange(LocalDate start, LocalDate end);

    @Query("SELECT SUM(p.amount) FROM Payment p")
    BigDecimal calculateTotalLifespanRevenue();

    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.paymentDate <= :asOf")
    BigDecimal calculateBalanceAsOf(LocalDate asOf);

    @Query("SELECT FUNCTION('MONTHNAME', p.paymentDate) as month, SUM(p.amount) as revenue " +
            "FROM Payment p " +
            "WHERE p.paymentDate >= :since " +
            "GROUP BY FUNCTION('MONTH', p.paymentDate), FUNCTION('MONTHNAME', p.paymentDate) " +
            "ORDER BY FUNCTION('MONTH', p.paymentDate) ASC")
    List<Object[]> AggregateMonthlyRevenue(LocalDate since);
}

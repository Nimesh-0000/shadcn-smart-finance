package com.finance.crm.service;

import com.finance.crm.dto.ArAgingDTO;
import com.finance.crm.dto.DashboardKpiDTO;
import com.finance.crm.dto.CustomerDTO;
import com.finance.crm.dto.RevenueTrendDTO;
import com.finance.crm.dto.RiskDTO;
import com.finance.crm.model.Account;
import com.finance.crm.model.Invoice;
import com.finance.crm.repository.AccountRepository;
import com.finance.crm.repository.InvoiceRepository;
import com.finance.crm.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {
    private final InvoiceRepository invoiceRepository;
    private final PaymentRepository paymentRepository;
    private final AccountRepository accountRepository;

    public DashboardService(InvoiceRepository invoiceRepository, PaymentRepository paymentRepository,
            AccountRepository accountRepository) {
        this.invoiceRepository = invoiceRepository;
        this.paymentRepository = paymentRepository;
        this.accountRepository = accountRepository;
    }

    public DashboardKpiDTO getKpis(LocalDate startDate, LocalDate endDate) {
        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atTime(23, 59, 59);

        BigDecimal currentRevenue = paymentRepository.calculateTotalRevenueInRange(startDate, endDate);
        if (currentRevenue == null)
            currentRevenue = BigDecimal.ZERO;

        BigDecimal cashBalance = paymentRepository.calculateBalanceAsOf(endDate);
        if (cashBalance == null)
            cashBalance = BigDecimal.ZERO;

        BigDecimal ar = invoiceRepository.calculateTotalAccountsReceivableInRange(startDateTime, endDateTime);
        if (ar == null)
            ar = BigDecimal.ZERO;

        BigDecimal overdue = invoiceRepository.calculateTotalOverdueAmountInRange(startDateTime, endDateTime);
        if (overdue == null)
            overdue = BigDecimal.ZERO;

        // Calculate Revenue Growth (vs previous period of same length)
        long days = ChronoUnit.DAYS.between(startDate, endDate) + 1;
        LocalDate prevStart = startDate.minusDays(days);
        LocalDate prevEnd = endDate.minusDays(days);
        BigDecimal prevRevenue = paymentRepository.calculateTotalRevenueInRange(prevStart, prevEnd);
        if (prevRevenue == null)
            prevRevenue = BigDecimal.ZERO;

        double growth = 0;
        if (prevRevenue.compareTo(BigDecimal.ZERO) > 0) {
            growth = currentRevenue.subtract(prevRevenue)
                    .divide(prevRevenue, 4, RoundingMode.HALF_UP)
                    .multiply(new BigDecimal("100")).doubleValue();
        }

        double overduePct = 0;
        if (ar.compareTo(BigDecimal.ZERO) > 0) {
            overduePct = overdue.divide(ar, 4, RoundingMode.HALF_UP)
                    .multiply(new BigDecimal("100")).doubleValue();
        }

        return DashboardKpiDTO.builder()
                .totalRevenue(currentRevenue)
                .cashBalance(cashBalance)
                .accountsReceivable(ar)
                .overdueAmount(overdue)
                .revenueGrowth(growth)
                .overduePercentage(overduePct)
                .build();
    }

    public ArAgingDTO getArAging() {
        List<Invoice> openInvoices = invoiceRepository.findAll().stream()
                .filter(i -> i.getStatus() != Invoice.Status.PAID)
                .collect(Collectors.toList());

        BigDecimal bucket0_30 = BigDecimal.ZERO;
        BigDecimal bucket31_60 = BigDecimal.ZERO;
        BigDecimal bucket61_90 = BigDecimal.ZERO;
        BigDecimal bucket90Plus = BigDecimal.ZERO;

        LocalDate now = LocalDate.now();
        for (Invoice inv : openInvoices) {
            long daysOverdue = ChronoUnit.DAYS.between(inv.getDueDate(), now);

            if (daysOverdue <= 30)
                bucket0_30 = bucket0_30.add(inv.getAmount());
            else if (daysOverdue <= 60)
                bucket31_60 = bucket31_60.add(inv.getAmount());
            else if (daysOverdue <= 90)
                bucket61_90 = bucket61_90.add(inv.getAmount());
            else
                bucket90Plus = bucket90Plus.add(inv.getAmount());
        }

        return ArAgingDTO.builder()
                .current0_30(bucket0_30)
                .overdue31_60(bucket31_60)
                .overdue61_90(bucket61_90)
                .overdue90Plus(bucket90Plus)
                .build();
    }

    public List<RiskDTO> getRisks() {
        List<RiskDTO> risks = new ArrayList<>();
        List<Invoice> criticalOverdue = invoiceRepository.findTopOverdueInvoices();
        for (Invoice inv : criticalOverdue) {
            if (ChronoUnit.DAYS.between(inv.getDueDate(), LocalDate.now()) > 7) {
                risks.add(RiskDTO.builder()
                        .id("risk_" + inv.getId())
                        .severity("high")
                        .title("Critical Overdue (> 7 Days)")
                        .description(inv.getAccount().getName() + ": Invoice #" + inv.getId() + " ($" + inv.getAmount()
                                + ") is highly overdue.")
                        .type("OVERDUE")
                        .build());
            }
        }

        List<Invoice> unassigned = invoiceRepository.findInvoicesWithoutOwner();
        if (!unassigned.isEmpty()) {
            risks.add(RiskDTO.builder()
                    .id("risk_unassigned")
                    .severity("medium")
                    .title("Missing Accountability")
                    .description(unassigned.size() + " invoices have no assigned financial owner.")
                    .type("UNASSIGNED")
                    .build());
        }

        return risks;
    }

    public List<RevenueTrendDTO> getRevenueTrend() {
        LocalDate since = LocalDate.now().minusMonths(6).withDayOfMonth(1);
        List<Object[]> results = paymentRepository.AggregateMonthlyRevenue(since);

        return results.stream()
                .map(r -> new RevenueTrendDTO((String) r[0], (BigDecimal) r[1]))
                .collect(Collectors.toList());
    }

    public List<CustomerDTO> getTopCustomersByRevenue() {
        List<Object[]> results = accountRepository.findTopAccountsByRevenue();
        return results.stream()
                .limit(5)
                .map(r -> {
                    Account a = (Account) r[0];
                    BigDecimal rev = (BigDecimal) r[1];
                    return CustomerDTO.builder()
                            .id(a.getId())
                            .name(a.getName())
                            .region(a.getRegion())
                            .totalRevenue(rev)
                            .outstandingBalance(BigDecimal.ZERO) // Simplified: focus on ranking primary metric
                            .status("ACTIVE")
                            .lastActivity("N/A")
                            .build();
                })
                .collect(Collectors.toList());
    }

    public List<CustomerDTO> getTopCustomersByOutstanding() {
        List<Object[]> results = accountRepository.findTopAccountsByOutstanding();
        return results.stream()
                .limit(5)
                .map(r -> {
                    Account a = (Account) r[0];
                    BigDecimal out = (BigDecimal) r[1];
                    return CustomerDTO.builder()
                            .id(a.getId())
                            .name(a.getName())
                            .region(a.getRegion())
                            .totalRevenue(BigDecimal.ZERO)
                            .outstandingBalance(out)
                            .status("ACTIVE")
                            .lastActivity("N/A")
                            .build();
                })
                .collect(Collectors.toList());
    }
}

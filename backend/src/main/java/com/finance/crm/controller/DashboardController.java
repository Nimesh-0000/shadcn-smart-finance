package com.finance.crm.controller;

import com.finance.crm.dto.ArAgingDTO;
import com.finance.crm.dto.CustomerDTO;
import com.finance.crm.dto.DashboardKpiDTO;
import com.finance.crm.dto.RevenueTrendDTO;
import com.finance.crm.dto.RiskDTO;
import com.finance.crm.service.DashboardService;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {
    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/kpis")
    public DashboardKpiDTO getKpis(
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate) {
        if (startDate == null)
            startDate = LocalDate.now().withDayOfMonth(1);
        if (endDate == null)
            endDate = LocalDate.now();
        return dashboardService.getKpis(startDate, endDate);
    }

    @GetMapping("/ar-aging")
    public ArAgingDTO getArAging() {
        return dashboardService.getArAging();
    }

    @GetMapping("/risks")
    public List<RiskDTO> getRisks() {
        return dashboardService.getRisks();
    }

    @GetMapping("/revenue-trend")
    public List<RevenueTrendDTO> getRevenueTrend() {
        return dashboardService.getRevenueTrend();
    }

    @GetMapping("/customers/top-revenue")
    public List<CustomerDTO> getTopRevenueCustomers() {
        return dashboardService.getTopCustomersByRevenue();
    }

    @GetMapping("/customers/top-outstanding")
    public List<CustomerDTO> getTopOutstandingCustomers() {
        return dashboardService.getTopCustomersByOutstanding();
    }
}

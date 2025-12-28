package com.finance.crm.controller;

import com.finance.crm.dto.InvoiceDTO;
import com.finance.crm.service.InvoiceService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "*")
public class InvoiceController {
    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @GetMapping("/open")
    public List<InvoiceDTO> getOpenInvoices() {
        return invoiceService.getOpenInvoices();
    }

    @GetMapping("/overdue")
    public List<InvoiceDTO> getOverdueInvoices() {
        return invoiceService.getOverdueInvoices();
    }

    @GetMapping("/customer/{accountId}")
    public List<InvoiceDTO> getInvoicesByCustomer(@PathVariable Long accountId) {
        return invoiceService.getInvoicesByCustomer(accountId);
    }

    @PutMapping("/{id}/owner")
    public InvoiceDTO reassignOwner(
            @PathVariable Long id,
            @RequestParam Long newOwnerId,
            @RequestParam String performedBy) {
        return invoiceService.reassignOwner(id, newOwnerId, performedBy);
    }
}

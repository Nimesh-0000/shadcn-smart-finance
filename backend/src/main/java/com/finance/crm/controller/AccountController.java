package com.finance.crm.controller;

import com.finance.crm.dto.CustomerDTO;
import com.finance.crm.model.Account;
import com.finance.crm.model.Invoice;
import com.finance.crm.repository.AccountRepository;
import com.finance.crm.repository.InvoiceRepository;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class AccountController {
    private final AccountRepository accountRepository;
    private final InvoiceRepository invoiceRepository;

    public AccountController(AccountRepository accountRepository, InvoiceRepository invoiceRepository) {
        this.accountRepository = accountRepository;
        this.invoiceRepository = invoiceRepository;
    }

    @GetMapping
    public List<CustomerDTO> getCustomers() {
        List<Account> accounts = accountRepository.findAll();
        List<CustomerDTO> dtos = new ArrayList<>();

        for (Account account : accounts) {
            List<Invoice> invoices = invoiceRepository.findByAccountId(account.getId());
            BigDecimal outstanding = BigDecimal.ZERO;
            for (Invoice inv : invoices) {
                if (inv.getStatus() != Invoice.Status.PAID) {
                    outstanding = outstanding.add(inv.getAmount());
                }
            }

            CustomerDTO dto = CustomerDTO.builder()
                    .id(account.getId())
                    .name(account.getName())
                    .region(account.getRegion())
                    .totalRevenue(new BigDecimal("150000.00"))
                    .outstandingBalance(outstanding)
                    .status("Active")
                    .build();
            dtos.add(dto);
        }

        return dtos;
    }
}

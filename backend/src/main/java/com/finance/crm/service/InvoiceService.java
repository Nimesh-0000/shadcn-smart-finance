package com.finance.crm.service;

import com.finance.crm.dto.InvoiceDTO;
import com.finance.crm.model.AuditLog;
import com.finance.crm.model.Invoice;
import com.finance.crm.model.User;
import com.finance.crm.repository.AuditLogRepository;
import com.finance.crm.repository.InvoiceRepository;
import com.finance.crm.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvoiceService {
        private final InvoiceRepository invoiceRepository;
        private final UserRepository userRepository;
        private final AuditLogRepository auditLogRepository;

        public InvoiceService(InvoiceRepository invoiceRepository, UserRepository userRepository,
                        AuditLogRepository auditLogRepository) {
                this.invoiceRepository = invoiceRepository;
                this.userRepository = userRepository;
                this.auditLogRepository = auditLogRepository;
        }

        public List<InvoiceDTO> getOpenInvoices() {
                return invoiceRepository.findAll().stream()
                                .filter(i -> i.getStatus() == Invoice.Status.OPEN)
                                .map(this::convertToDTO)
                                .collect(Collectors.toList());
        }

        public List<InvoiceDTO> getOverdueInvoices() {
                return invoiceRepository.findAll().stream()
                                .filter(i -> i.getStatus() == Invoice.Status.OVERDUE)
                                .map(this::convertToDTO)
                                .collect(Collectors.toList());
        }

        public List<InvoiceDTO> getInvoicesByCustomer(Long accountId) {
                return invoiceRepository.findByAccountId(accountId).stream()
                                .map(this::convertToDTO)
                                .collect(Collectors.toList());
        }

        @Transactional
        public InvoiceDTO reassignOwner(Long invoiceId, Long newOwnerId, String performedBy) {
                Invoice invoice = invoiceRepository.findById(invoiceId)
                                .orElseThrow(() -> new RuntimeException("Invoice not found"));

                User newOwner = userRepository.findById(newOwnerId)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                String oldOwnerName = invoice.getOwner() != null ? invoice.getOwner().getName() : "Unassigned";
                invoice.setOwner(newOwner);
                invoiceRepository.save(invoice);

                auditLogRepository.save(AuditLog.builder()
                                .entityType("Invoice")
                                .entityId(String.valueOf(invoiceId))
                                .action("Reassigned from " + oldOwnerName + " to " + newOwner.getName())
                                .performedBy(performedBy)
                                .build());

                return convertToDTO(invoice);
        }

        private InvoiceDTO convertToDTO(Invoice invoice) {
                return InvoiceDTO.builder()
                                .id(String.valueOf(invoice.getId()))
                                .customerName(invoice.getAccount().getName())
                                .amount(invoice.getAmount())
                                .dueDate(invoice.getDueDate())
                                .status(invoice.getStatus().name())
                                .owner(invoice.getOwner() != null ? invoice.getOwner().getName() : "Unassigned")
                                .description("Invoice lookup description")
                                .build();
        }
}

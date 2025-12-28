package com.finance.crm.config;

import com.finance.crm.model.*;
import com.finance.crm.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Configuration
@Profile("!test")
public class DataInitializer implements CommandLineRunner {
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final InvoiceRepository invoiceRepository;
    private final PaymentRepository paymentRepository;

    public DataInitializer(AccountRepository accountRepository, UserRepository userRepository,
            InvoiceRepository invoiceRepository, PaymentRepository paymentRepository) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
        this.invoiceRepository = invoiceRepository;
        this.paymentRepository = paymentRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0)
            return;

        // 1. Create Users
        User nimesh = User.builder().username("nimesh_l").name("Nimesh Lokhande").role(User.Role.ADMIN).build();
        User sarah = User.builder().username("sarah_k").name("Sarah Kapoor").role(User.Role.EDITOR).build();
        User john = User.builder().username("john_d").name("John Doe").role(User.Role.VIEWER).build();
        userRepository.save(nimesh);
        userRepository.save(sarah);
        userRepository.save(john);

        // 2. Create Accounts
        Account globalTech = Account.builder().name("Global Tech Corp").region("North America").build();
        Account infinite = Account.builder().name("Infinite Solutions").region("EMEA").build();
        Account skyline = Account.builder().name("Skyline Ventures").region("APAC").build();
        Account apex = Account.builder().name("Apex Logistics").region("North America").build();
        Account stellar = Account.builder().name("Stellar Manufacturing").region("EMEA").build();

        accountRepository.save(globalTech);
        accountRepository.save(infinite);
        accountRepository.save(skyline);
        accountRepository.save(apex);
        accountRepository.save(stellar);

        List<Account> accounts = List.of(globalTech, infinite, skyline, apex, stellar);
        List<User> owners = List.of(nimesh, sarah);
        Random random = new Random();

        // 3. Create Invoices
        for (int i = 1; i <= 20; i++) {
            Account account = accounts.get(random.nextInt(accounts.size()));
            User owner = owners.get(random.nextInt(owners.size()));
            BigDecimal amount = new BigDecimal(1000 + random.nextInt(49000)).setScale(2);

            Invoice.Status status;
            LocalDate dueDate;

            int statusRoll = random.nextInt(10);
            if (statusRoll < 4) {
                status = Invoice.Status.PAID;
                dueDate = LocalDate.now().minusDays(random.nextInt(60) + 10);
            } else if (statusRoll < 6) {
                status = Invoice.Status.OPEN;
                dueDate = LocalDate.now().plusDays(random.nextInt(30));
            } else {
                // Overdue invoices spread across aging buckets
                status = Invoice.Status.OVERDUE;
                int agingRoll = random.nextInt(4);
                if (agingRoll == 0) {
                    dueDate = LocalDate.now().minusDays(random.nextInt(30) + 1); // 0-30 days overdue
                } else if (agingRoll == 1) {
                    dueDate = LocalDate.now().minusDays(random.nextInt(30) + 31); // 31-60 days overdue
                } else if (agingRoll == 2) {
                    dueDate = LocalDate.now().minusDays(random.nextInt(30) + 61); // 61-90 days overdue
                } else {
                    dueDate = LocalDate.now().minusDays(random.nextInt(60) + 91); // 90+ days overdue
                }
            }

            Invoice inv = Invoice.builder()
                    .account(account)
                    .amount(amount)
                    .dueDate(dueDate)
                    .status(status)
                    .owner(owner)
                    .build();
            invoiceRepository.save(inv);

            // 4. Create Partial/Full Payments for some invoices
            if (status == Invoice.Status.PAID) {
                Payment p = Payment.builder()
                        .invoice(inv)
                        .amount(amount)
                        .paymentDate(dueDate.plusDays(random.nextInt(5)))
                        .build();
                paymentRepository.save(p);
            } else if (random.nextBoolean()) {
                // Partial payment for open/overdue
                BigDecimal partialAmount = amount.multiply(new BigDecimal("0.3")).setScale(2, BigDecimal.ROUND_HALF_UP);
                Payment p = Payment.builder()
                        .invoice(inv)
                        .amount(partialAmount)
                        .paymentDate(LocalDate.now().minusDays(random.nextInt(5)))
                        .build();
                paymentRepository.save(p);
            }
        }
    }
}

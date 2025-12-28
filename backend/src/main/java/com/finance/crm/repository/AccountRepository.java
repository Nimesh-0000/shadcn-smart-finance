package com.finance.crm.repository;

import com.finance.crm.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

        @Query("SELECT a, SUM(p.amount) as revenue " +
                        "FROM Account a JOIN Invoice i ON i.account = a JOIN Payment p ON p.invoice = i " +
                        "GROUP BY a " +
                        "ORDER BY revenue DESC")
        List<Object[]> findTopAccountsByRevenue();

        @Query("SELECT a, SUM(i.amount) as outstanding " +
                        "FROM Account a JOIN Invoice i ON i.account = a " +
                        "WHERE i.status != 'PAID' " +
                        "GROUP BY a " +
                        "ORDER BY outstanding DESC")
        List<Object[]> findTopAccountsByOutstanding();
}

package com.rrms.rrms.services;

import com.rrms.rrms.models.Account;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Map;

public interface IStatistics {
    Long getTotalAccounts();

    Long getTotalTenants();

    Long getTotalHostAccounts();

    Long getTotalMotels();

    Map<DayOfWeek, Long> getAccountsCreatedLastWeek();

    Map<Integer, Long> getAccountsCreatedThisYear();

    Map<Integer, Long> getAccountsCreatedLastYear();

    Map<Integer, Long> getTotalMotelsByMonth();

    List<Account> getRecentHosts();
}

package com.rrms.rrms.services;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Map;

import com.rrms.rrms.models.Account;

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

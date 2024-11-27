package com.rrms.rrms.services;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.rrms.rrms.configs.CustomerEnvironment;
import com.rrms.rrms.configs.PartnerInfo;
import com.rrms.rrms.util.Execute;

public abstract class AbstractProcess<T, V> {

    protected PartnerInfo partnerInfo;
    protected CustomerEnvironment environment;
    protected Execute execute = new Execute();

    public AbstractProcess(CustomerEnvironment environment) {
        this.environment = environment;
        this.partnerInfo = environment.getPartnerInfo();
    }

    public static Gson getGson() {
        return new GsonBuilder().disableHtmlEscaping().create();
    }

    public abstract V execute(T request) throws RuntimeException;
}
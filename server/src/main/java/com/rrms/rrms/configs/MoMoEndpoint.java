package com.rrms.rrms.configs;

public class MoMoEndpoint {
    private String endpoint;
    private String create;

    public MoMoEndpoint(String endpoint, String create) {
        this.endpoint = endpoint;
        this.create = create;
    }

    public String getCreateUrl() {
        return endpoint + create;
    }
}

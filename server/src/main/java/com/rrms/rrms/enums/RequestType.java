package com.rrms.rrms.enums;

import com.google.gson.annotations.SerializedName;

public enum RequestType {

    @SerializedName("captureWallet")
    CAPTURE_WALLET("captureWallet"),

    @SerializedName("payWithATM")
    PAY_WITH_ATM("payWithATM"),


    @SerializedName("payWithMethod")
    PAY_WITH_METHOD("payWithMethod"),


    @SerializedName("payWithCC")
    PAY_WITH_CREDIT("payWithCC"),

    @SerializedName("linkWallet")
    LINK_WALLET("linkWallet");

    private final String value;

    RequestType(String value) {
        this.value = value;
    }

    public static RequestType findByName(String name) {
        for (RequestType type : values()) {
            if (type.getRequestType().equals(name)) {
                return type;
            }
        }
        return null;
    }

    public String getRequestType() {
        return value;
    }
}


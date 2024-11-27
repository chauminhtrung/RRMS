package com.rrms.rrms.enums;

import com.google.gson.annotations.SerializedName;

public enum ConfirmRequestType {


    @SerializedName("capture")
    CAPTURE("capture"),


    @SerializedName("cancel")
    CANCEL("cancel");

    private final String value;

    ConfirmRequestType(String value) {
        this.value = value;
    }

    public static ConfirmRequestType findByName(String name) {
        for (ConfirmRequestType type : values()) {
            if (type.getConfirmRequestType().equals(name)) {
                return type;
            }
        }
        return null;
    }

    public String getConfirmRequestType() {
        return value;
    }
}


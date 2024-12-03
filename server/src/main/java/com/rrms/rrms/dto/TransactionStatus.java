package com.rrms.rrms.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionStatus implements Serializable {
    private String status;
    private String message;
    private String data;
}

package com.rrms.rrms.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class TransactionStatus implements Serializable {
    private String status;
    private String message;
    private String data;
}

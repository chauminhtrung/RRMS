package com.rrms.rrms.services;

public interface IMailService {
    public boolean Send_ForgetPassword(String to, String subject, String text);
}

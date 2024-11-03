package com.rrms.rrms.services;

public interface IMailService {
    public void sendMail(String to, String subject, String text);
}

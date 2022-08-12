package com.project.jejuair.repository;
import java.util.Map;

public interface MailInterface {
    public Map<String, Object> send(String email, String title, String body);
}

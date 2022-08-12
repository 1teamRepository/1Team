package com.project.jejuair.service;

import com.project.jejuair.repository.MailInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class MailService implements MailInterface {

    @Autowired
    private JavaMailSender sender;

    @Override
    public Map<String, Object> send(String email, String title, String body){

        MailHandler mail;

        try {
            mail = new MailHandler(sender);
            mail.setFrom("esk3784@naver.com", "제주항공");
            mail.setTo(email);
            mail.setSubject(title + " 고객님의 제주항공 비밀번호 입니다.");
            mail.setText("제주항공 비밀번호는" + body +"입니다.");
            mail.send();

        } catch (Exception e){
            e.printStackTrace();
           System.out.println("보내기 실패");
        }
        String resultCode = "S-1";
        String msg = "Ok";
        Map<String, Object> rs = new HashMap<>();
        rs.put("resultCode", resultCode);
        rs.put("msg", msg);
        return rs;
    }

}

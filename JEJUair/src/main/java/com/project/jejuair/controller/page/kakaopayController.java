package com.project.jejuair.controller.page;

import com.project.jejuair.service.TbKakaoPayApiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Log
@Controller
@RequestMapping("")
@RequiredArgsConstructor
public class kakaopayController {


    //카카오페이 api 결제준비
    @Autowired
    private final TbKakaoPayApiService kakaopay;


    @GetMapping("/kakaoPay")
    public void kakaoPayGet() {

    }


    @PostMapping("/kakaoPay")
    public String kakaoPay(String partner_user_id, String item_name, String total_amount) {
        System.out.println("kakaoPay post............................................");
        log.info("kakaoPay post............................................");
        return "redirect:" + kakaopay.kakaoPayReady(partner_user_id, item_name, total_amount);
    }

    @RequestMapping("/kakaoPayCancel")
    public ModelAndView kakaoPayCancel(HttpServletRequest request) {
        HttpSession session = request.getSession();
        System.out.println("kakaoPay post............................................");
        log.info("kakaoPay post............................................");
        return new ModelAndView("/user/pages/index")
                .addObject("memPoint", session.getAttribute("point"));

    }

    @RequestMapping("/kakaoPaySuccess")
    public ModelAndView kakaoPaySuccess(HttpServletRequest request, @RequestParam("pg_token") String pg_token) {
        HttpSession session = request.getSession();
        System.out.println("kakaoPaySuccess get............................................");
        log.info("kakaoPaySuccess get............................................");
        log.info("kakaoPaySuccess pg_token : " + pg_token);
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/view_payment_complete")
                .addObject("memPoint", session.getAttribute("point"));
        //결제승인단계
        // Controller에서 model.addAttribute를 이용하여 화면 쪽에 정보를 전송
//        model.addAttribute("info", kakaopay.kakaoPayInfo(pg_token));
    }
}

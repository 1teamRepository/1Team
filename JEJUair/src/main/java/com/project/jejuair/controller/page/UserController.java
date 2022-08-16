package com.project.jejuair.controller.page;

import com.project.jejuair.model.network.response.TbMemberResponse;
import com.project.jejuair.service.MailService;
import com.project.jejuair.service.TbMemberApiLogicService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.net.URI;
import java.time.LocalDateTime;

@Controller
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    // http://localhost:10000/user
    @Autowired
    private final TbMemberApiLogicService tbMemberApiLogicService;

    //로그인페이지


    @RequestMapping("/login") //localhost:8899/user/login
    public String Logout(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.invalidate();
        return "/user/pages/login/login";
    }


    //로그인 검증
    @PostMapping("/loginOk")
    public ModelAndView LoginOk(HttpServletRequest request, String memUserid, String memUserpw) throws Exception{
        TbMemberResponse tbMemberResponse = tbMemberApiLogicService.pwCheck(memUserid, memUserpw).getData();
        if(tbMemberResponse != null){
            HttpSession session = request.getSession();
            Long memIdx = tbMemberResponse.getMemIdx();
            String koLastname = tbMemberResponse.getMemKoLastname();
            String koFirstname = tbMemberResponse.getMemKoFirstname();
            String engLastname = tbMemberResponse.getMemEngLastname();
            String engFirstname = tbMemberResponse.getMemEngFirstname();
            String ssn = tbMemberResponse.getMemSsn();
            String gender = String.valueOf(tbMemberResponse.getMemGender());
            String hp = tbMemberResponse.getMemHp();
            String email = tbMemberResponse.getMemEmail();
            Integer point = tbMemberResponse.getMemPoint();

            session.setAttribute("idx", memIdx);
            session.setAttribute("userid", memUserid);
            session.setAttribute("koLastname", koLastname);
            session.setAttribute("koFirstname", koFirstname);
            session.setAttribute("engLastname", engLastname);
            session.setAttribute("engFirstname", engFirstname);
            session.setAttribute("ssn", ssn);
            session.setAttribute("gender", gender);
            session.setAttribute("hp", hp);
            session.setAttribute("email", email);
            session.setAttribute("point", point);

            System.out.println("로그인 성공");
            return new ModelAndView("redirect:/user/");
        }else{
            System.out.println("로그인 실패");
            return new ModelAndView("/user/pages/login/login")
                    .addObject("message", "fail");
        }
    }

    @PostMapping("/pwCheckOK")
    public ModelAndView pwCheckOK(HttpServletRequest request, String memUserpw, String newmemUserpw, String againmemUserpw)  throws Exception{
        HttpSession session = request.getSession();
        String memUserid = (String)session.getAttribute("userid");

        TbMemberResponse tbMemberResponse = tbMemberApiLogicService.pwCheck(memUserid, memUserpw).getData();
        if(tbMemberResponse != null) {
            if(newmemUserpw.equals(againmemUserpw)){
                tbMemberApiLogicService.pwUpdate(memUserid, newmemUserpw);
                return new ModelAndView("redirect:/user/info_edit_mypage");
            }else {
                return new ModelAndView("/user/pages/mypage/info_edit/password_edit")
                        .addObject("message1", "fail1");
            }
        }else {
            return new ModelAndView("/user/pages/mypage/info_edit/password_edit")
                    .addObject("message2", "fail2");
        }
    }

    @PostMapping("/pwCheckGo")
    public ModelAndView pwCheckGo(HttpServletRequest request, String memUserpw)  throws Exception{
        HttpSession session = request.getSession();
        String memUserid = (String)session.getAttribute("userid");

        TbMemberResponse tbMemberResponse = tbMemberApiLogicService.pwCheck(memUserid, memUserpw).getData();
        if(tbMemberResponse != null) {
                return new ModelAndView("redirect:/user/password_edit");
            }else {
                return new ModelAndView("/user/pages/mypage/info_edit/info_edit_password")
                        .addObject("message1", "fail1");
            }
        }




    @RequestMapping("/password_edit") //localhost:8899/user/password_edit
    public ModelAndView password_edit(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session.getAttribute("userid") != null) {
            return new ModelAndView("/user/pages/mypage/info_edit/password_edit")
                    .addObject("memPoint", session.getAttribute("point"));
        }else {
            return new ModelAndView("/user/pages/login/login");
        }
    }

    @PostMapping("/nameChangeOK")
    public ModelAndView nameChangeOK(HttpServletRequest request, String memEngLastname, String memEngFirstname)  throws Exception{
        HttpSession session = request.getSession();
        String memUserid = (String)session.getAttribute("userid");

        TbMemberResponse tbMemberResponse = tbMemberApiLogicService.nameChange(memUserid, memEngLastname, memEngFirstname).getData();
            if(tbMemberResponse != null){
                tbMemberApiLogicService.nameChange(memUserid, memEngLastname, memEngFirstname);
                String engLastname = tbMemberResponse.getMemEngLastname();
                String engFirstname = tbMemberResponse.getMemEngFirstname();

                session.setAttribute("engLastname", engLastname);
                session.setAttribute("engFirstname", engFirstname);
                return new ModelAndView("redirect:/user/info_edit_mypage");
            }else {
                return new ModelAndView("/user/pages/mypage/info_edit/nameChange")
                        .addObject("message1", "fail1");
            }

    }

    @RequestMapping("/nameChange") //localhost:8899/user/nameChange
    public ModelAndView nameChange(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session.getAttribute("idx") != null) {
            return new ModelAndView("/user/pages/mypage/info_edit/nameChange")
                    .addObject("memPoint", session.getAttribute("point"));
        }else {
            return new ModelAndView("/user/pages/login/login");
        }
    }


    //로그아웃
    @RequestMapping("/logout") //localhost:8899/user/logout
    public ModelAndView logOut(HttpServletRequest request) throws Exception {
        HttpSession session = request.getSession();
        session.invalidate();
        System.out.println("로그아웃");
        return new ModelAndView("/user/pages/index");
    }

    @RequestMapping("")
    public ModelAndView index(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/index")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/findEmailUserInfo") //localhost:8899/user/findEmailUserInfo      //emailOk 넘어가는거 확인
    public ModelAndView findEmailUserInfo(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/member/find/findEmailUserInfo/findEmailUserInfo")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @PostMapping("/emailOk")
    public ModelAndView emailOk(HttpServletRequest request, String memEmail){
        TbMemberResponse tbMemberResponse = tbMemberApiLogicService.emailOk(memEmail).getData();
        if (tbMemberResponse != null) {
            HttpSession session = request.getSession();
            String email = tbMemberResponse.getMemEmail();
            String userid = tbMemberResponse.getMemUserid();
            LocalDateTime regdate = tbMemberResponse.getMemRegDate();
            String userPw = tbMemberResponse.getMemUserpw();

            session.setAttribute("email", email);
            session.setAttribute("userid", userid);
            session.setAttribute("regdate", regdate);
            session.setAttribute("userPw", userPw);

            return new ModelAndView("redirect:/user/findUserInfoList");
        } else {
            System.out.println("실패");
            return new ModelAndView("/user/pages/member/find/findEmailUserInfo/findEmailUserInfo");
        }
    }

    @RequestMapping("/findUserInfoList") //localhost:8899/user/findUserInfoList
    public ModelAndView findUserInfoList(HttpServletRequest request) {
        HttpSession session = request.getSession();
        System.out.println("findUserInfoList 도착");
        System.out.println(session.getAttribute("email"));
        System.out.println(session.getAttribute("userid"));
        System.out.println(session.getAttribute("regdate"));
        System.out.println(session.getAttribute("userPw"));

        return new ModelAndView("/user/pages/member/find/findUserInfoList/findUserInfoList")
                .addObject("memUserid", session.getAttribute("userid"))
                .addObject("memRegDate", session.getAttribute("regdate"))
                .addObject("memEmail", session.getAttribute("email"))
                .addObject("memUserPw", session.getAttribute("userPw"));
    }


    @Autowired
    private MailService mailService;

    @RequestMapping("/mail/send")
    public String showSend(){
        return "/mail/send";
    }

    @RequestMapping("/mail/doSend")
    @ResponseBody
    public ResponseEntity<?> doSend(String email, String title, String body){
        mailService.send(email, title, body);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/user/findResult"));
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    }

    @RequestMapping("/findResult")
    public ModelAndView findUserInfo(HttpServletRequest request) {
        HttpSession session = request.getSession();

        return new ModelAndView("/user/pages/member/find/findResult/findResult")
                .addObject("email", session.getAttribute("email"));
    }


    @RequestMapping("/member_benefit_new") //localhost:8899/user/member_benefit_new   //이미지하나 안뜸
    public ModelAndView member_benefit(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/member_benefit/member_benefit_new/member_benefit_new")
                .addObject("memPoint", session.getAttribute("point"));
    }


//    @RequestMapping("/point_main") //localhost:8899/user/point_main
//    public ModelAndView point_main(HttpServletRequest request) {
//        HttpSession session = request.getSession();
//        if(session.getAttribute("idx") != null) {
//            return new ModelAndView("/user/pages/member_benefit/point/point_main")
//                    .addObject("memPoint", session.getAttribute("point"));
//        }else {
//            return new ModelAndView("/user/pages/login/login");
//        }
//    }


    @RequestMapping("/after_point_save") //localhost:8899/user/after_point_save //잘 모르겠음
    public ModelAndView after_point_save(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session.getAttribute("idx") != null) {
        return new ModelAndView("/user/pages/member_benefit/point/point_save/after_point_save/after_point_save")
                .addObject("memPoint", session.getAttribute("point"));
        }else {
            return new ModelAndView("/user/pages/login/login");
        }
    }

    @RequestMapping("/point_save_info") //localhost:8899/user/point_save_info
    public ModelAndView point_save_info(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session.getAttribute("idx") != null) {
        return new ModelAndView("/user/pages/member_benefit/point/point_save_info/point_save_info")
                .addObject("memPoint", session.getAttribute("point"));
    }else {
        return new ModelAndView("/user/pages/login/login");
        }
    }


//    @RequestMapping("/point_member")
//    public ModelAndView point_member() {
//        return new ModelAndView("/user/pages/member_benefit/point/point_use_info/point_member");
//    }

//    @RequestMapping("/point_nomember")
//    public ModelAndView point_nomember() {
//        return new ModelAndView("/user/pages/member_benefit/point/point_use_info/point_nomember");
//    }

    @RequestMapping("/point_buy") //localhost:8899/user/point_buy
    public ModelAndView point_buy(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session.getAttribute("idx") != null) {
        return new ModelAndView("/user/pages/member_benefit/point_buy/point_buy")
                .addObject("memPoint", session.getAttribute("point"));
        }else {
            return new ModelAndView("/user/pages/login/login");
        }
    }

    @RequestMapping("/point_search") //JS 작동 안함 //localhost:8899/user/point_search
    public ModelAndView point_search(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session.getAttribute("idx") != null) {
        return new ModelAndView("/user/pages/member_benefit/point_search/point_search")
                .addObject("memPoint", session.getAttribute("point"));
        }else {
        return new ModelAndView("/user/pages/login/login");
     }
    }


    @RequestMapping("/info_edit") //localhost:8899/user/info_edit   //회원정보수정 안됨
    public ModelAndView info_edit(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session.getAttribute("idx") != null) {
        return new ModelAndView("/user/pages/mypage/info_edit/info_edit")
                .addObject("memPoint", session.getAttribute("point"));
    }else {
        return new ModelAndView("/user/pages/login/login");
    }
    }


    @RequestMapping("/info_edit_password") //localhost:8899/user/info_edit_password
    public ModelAndView userIndex(HttpServletRequest request){
        HttpSession session = request.getSession();
        if(session.getAttribute("idx") != null) {
            return new ModelAndView("/user/pages/mypage/info_edit/info_edit_password")
                    .addObject("memPoint", session.getAttribute("point"));
        }else {
            return new ModelAndView("/user/pages/login/login");
        }
    }


    @RequestMapping("/info_edit_mypage") //localhost:8899/user/info_edit_mypage
    public ModelAndView info_edit_mypage(HttpServletRequest request){
        HttpSession session = request.getSession();

        if(session.getAttribute("idx") != null) {
            return new ModelAndView("/user/pages/mypage/info_edit/info_edit_mypage")
                    .addObject("idx", session.getAttribute("idx"))
                    .addObject("userid", session.getAttribute("userid"))
                    .addObject("koLastname", session.getAttribute("koLastname"))
                    .addObject("koFirstname", session.getAttribute("koFirstname"))
                    .addObject("engLastname", session.getAttribute("engLastname"))
                    .addObject("engFirstname", session.getAttribute("engFirstname"))
                    .addObject("ssn", session.getAttribute("ssn"))
                    .addObject("gender", session.getAttribute("gender"))
                    .addObject("hp", session.getAttribute("hp"))
                    .addObject("email", session.getAttribute("email"))
                    .addObject("memPoint", session.getAttribute("point"));
        }else {
            return new ModelAndView("/user/pages/login/login");
        }
    }



    @RequestMapping("/my_history") //localhost:8899/user/my_history     //달력안먹음
    public ModelAndView my_history(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session.getAttribute("idx") != null) {
        return new ModelAndView("/user/pages/mypage/my_history/my_history")
                .addObject("memPoint", session.getAttribute("point"));
        }else {
            return new ModelAndView("/user/pages/login/login");
        }
    }

    @RequestMapping("/my_reserve") //localhost:8899/user/my_reserve     //항공권 조회 안됨
    public ModelAndView my_reserve(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session.getAttribute("idx") != null) {
        return new ModelAndView("/user/pages/mypage/my_reserve/my_reserve")
                .addObject("memPoint", session.getAttribute("point"));
        }else {
            return new ModelAndView("/user/pages/login/login");
        }
    }

    @RequestMapping("/mypage_main_member") //localhost:8899/user/mypage_main_member
    public ModelAndView mypage_main_member(HttpServletRequest request){

        HttpSession session = request.getSession();
        Long memIdx= (Long) session.getAttribute("idx");
        String userId = (String) session.getAttribute("userid");

        if (session.getAttribute("idx") != null) {
            return new ModelAndView("/user/pages/mypage/mypage_main/mypage_main_member")
                    .addObject("idx", memIdx)
                    .addObject("userid", userId)
                    .addObject("memPoint", session.getAttribute("point"));
        }else{
            return new ModelAndView("/user/pages/login/login");
        }
    }


    @RequestMapping("/reserve_info") //localhost:8899/user/reserve_info
    public ModelAndView reserve_info(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("idx") != null) {
            return new ModelAndView("/user/pages/mypage/reserve_info/reserve_info");
        } else {
            return new ModelAndView("/user/pages/login/login");
        }
    }

    @RequestMapping("/qna_list") //localhost:8899/user/qna_list     //헤더 안먹음
    public ModelAndView qna_list(HttpServletRequest request) {
        HttpSession session = request.getSession();
        String ansUserid= (String) session.getAttribute("userid");

        if (session.getAttribute("idx") != null) {
            return new ModelAndView("/user/pages/mypage/mypage_main/qna_list/qna_list")
                    .addObject("ansUserid", ansUserid)
                    .addObject("memPoint", session.getAttribute("point"));
        } else {
            return new ModelAndView("/user/pages/login/login");
        }
    }

    @RequestMapping("/qna_form") //localhost:8899/user/qna_form  //헤더 안먹음
    public ModelAndView qna_form(HttpServletRequest request) {

        HttpSession session = request.getSession();
        String memUserid= (String) session.getAttribute("userid");
        System.out.println("id: "+ memUserid);

        if (session.getAttribute("idx") != null) {
            return new ModelAndView("/user/pages/mypage/mypage_main/qna_list/qna_form/qna_form")
                    .addObject("id", memUserid)
                    .addObject("memPoint", session.getAttribute("point"));
        } else {
            return new ModelAndView("/user/pages/login/login");
        }
    }

    @RequestMapping("/domestic_price")  //localhost:8899/user/domestic_price
    public ModelAndView domestic_price(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/travel_pre_info/domestic_price/domestic_price")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/flight_info") //우재가 하기로 함 //localhost:8899/user/flight_info
    public ModelAndView flight_info(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/travel_pre_info/flight_info/flight_info")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/inter_price") //localhost:8899/user/inter_price
    public ModelAndView inter_price(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/travel_pre_info/inter_price/inter_price")
                .addObject("memPoint", session.getAttribute("point"));
    }


//    예매 페이지 시작

    @RequestMapping("/ticket_reservation") //메인에서 해결 후 가져오기 //localhost:8899/user/ticket_reservation
    public ModelAndView ticket_reservation(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("userid") != null) {
            return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/ticket_reservation")
                    .addObject("memPoint", session.getAttribute("point"));
        }else{
            return new ModelAndView("/user/pages/login/login");
        }
    }

    @PostMapping("/avail_search_form")
    public ModelAndView get_avail_search_form(
            HttpServletRequest request, HttpServletResponse response,
            @RequestParam(value = "reserveRoute") String reserveRoute,
            @RequestParam(value = "departureData") String departureData,
            @RequestParam(value = "arrivalData") String arrivalData,
            @RequestParam(value = "onewayStart") String onewayStart,
            @RequestParam(value = "roundStart") String roundStart,
            @RequestParam(value = "roundEnd") String roundEnd,
            @RequestParam(value = "passengerNum") int passengerNum,
            @RequestParam(value = "foreign") String foreign)
    {
        HttpSession session = request.getSession();
        if (session.getAttribute("userid") != null) {
            return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/avail_search")
                    .addObject("reserveRoute", reserveRoute)
                    .addObject("departureData", departureData)
                    .addObject("arrivalData", arrivalData)
                    .addObject("onewayStart", onewayStart)
                    .addObject("roundStart", roundStart)
                    .addObject("roundEnd", roundEnd)
                    .addObject("passengerNum", passengerNum)
                    .addObject("foreign", foreign)
                    .addObject("idx",session.getAttribute("idx"))
                    .addObject("userid",session.getAttribute("userid"))
                    .addObject("memPoint", session.getAttribute("point"));
        } else {
            return new ModelAndView("/user/pages/login/login");
        }
    }


    @RequestMapping("/avail_search") //되는데 허접,,데이터 필요  //localhost:8899/user/avail_search //데이터필요
    public ModelAndView avail_search(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("idx") != null) {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/avail_search")
                .addObject("memPoint", session.getAttribute("point"));
        }else {
            return new ModelAndView("/user/pages/login/login");
        }
    }


    @RequestMapping("/view_passenger_input")  //localhost:8899/user/view_passenger_input
    public ModelAndView oneway_view_passenger_input(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("userid") != null) {
            return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/view_passenger_input")
                    .addObject("idx", session.getAttribute("idx"))
                    .addObject("userid", session.getAttribute("userid"))
                    .addObject("koLastname", session.getAttribute("koLastname"))
                    .addObject("koFirstname", session.getAttribute("koFirstname"))
                    .addObject("engLastname", session.getAttribute("engLastname"))
                    .addObject("engFirstname", session.getAttribute("engFirstname"))
                    .addObject("ssn", session.getAttribute("ssn"))
                    .addObject("gender", session.getAttribute("gender"))
                    .addObject("hp", session.getAttribute("hp"))
                    .addObject("email", session.getAttribute("email"))
                    .addObject("memPoint", session.getAttribute("point"));
        } else {
            return new ModelAndView("/user/pages/login/login");
        }
    }

    @RequestMapping("/seat_select") //localhost:8899/user/seat_select
    public ModelAndView oneway_seat_select(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("userid") != null) {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/seat_select")
                .addObject("memPoint", session.getAttribute("point"));
        }else {
            return new ModelAndView("/user/pages/login/login");
        }
    }

    @RequestMapping("/baggage_select") //localhost:8899/user/baggage_select
    public ModelAndView oneway_baggage_select(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("userid") != null) {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/baggage_select")
                .addObject("memPoint", session.getAttribute("point"));
        }else {
            return new ModelAndView("/user/pages/login/login");
        }
    }

    @RequestMapping("/meal_select") //localhost:8899/user/meal_select
    public ModelAndView oneway_meal_select(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("userid") != null) {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/meal_select")
                .addObject("memPoint", session.getAttribute("point"));
        }else {
            return new ModelAndView("/user/pages/login/login");
        }
    }

    @RequestMapping("/view_confirm") //localhost:8899/user/view_confirm
    public ModelAndView oneway_view_confirm(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("userid") != null) {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/view_confirm")
                .addObject("memPoint", session.getAttribute("point"));
        }else {
            return new ModelAndView("/user/pages/login/login");
        }
    }


    @RequestMapping("/view_payment") //localhost:8899/user/view_payment
    public ModelAndView oneway_view_payment(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("userid") != null) {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/view_payment_complete")
                .addObject("memPoint", session.getAttribute("point"));
        }else {
            return new ModelAndView("/user/pages/login/login");
        }
    }

// 예매 페이지 끝



//    @RequestMapping("")
//    public ModelAndView index(HttpServletRequest request) {
//        HttpSession session = request.getSession();
//        return new ModelAndView("/user/pages/index")
//                .addObject("memPoint", session.getAttribute("point"));
//    }
    @RequestMapping("/additionalInfo/additionalIntro") //localhost:8899/user/additionalInfo/additionalIntro //헤더안먹음
    public ModelAndView user_additionalIntro(HttpServletRequest request) {
        HttpSession session = request.getSession();
    return new ModelAndView("/user/pages/additional_info/additional_intro/additional_intro")
            .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/additionalInfo/advanceBaggage") //localhost:8899/user/additionalInfo/advanceBaggage  //구매하기 안넘어감//링크작업
    public ModelAndView user_advanceBaggage(HttpServletRequest request) {
        HttpSession session = request.getSession();
    return new ModelAndView("/user/pages/additional_info/advance_baggage/advance_baggage")
            .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/additionalInfo/advanceMeal") //localhost:8899/user/additionalInfo/advanceMeal
    public ModelAndView user_advanceMeal(HttpServletRequest request) {
        HttpSession session = request.getSession();
    return new ModelAndView("/user/pages/additional_info/advance_meal/advance_meal")
            .addObject("memPoint", session.getAttribute("point"));
    }


    @RequestMapping("/additionalInfo/advanceSeat") //localhost:8899/user/additionalInfo/advanceSeat
    public ModelAndView user_advanceSeat(HttpServletRequest request) {
        HttpSession session = request.getSession();
    return new ModelAndView("/user/pages/additional_info/advance_seat/advance_seat")
            .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/additionalInfo/afterPayment") //localhost:8899/user/additionalInfo/afterPayment   //유의사항, 구매 안넘어감//링크작업
    public ModelAndView user_afterPayment(HttpServletRequest request) {
        HttpSession session = request.getSession();
    return new ModelAndView("/user/pages/additional_info/after_payment/after_payment")
            .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/additionalInfo/bicycleService") //localhost:8899/user/additionalInfo/bicycleService
    public ModelAndView user_bicycleService(HttpServletRequest request) {
        HttpSession session = request.getSession();
    return new ModelAndView("/user/pages/additional_info/bicycle_service/bicycle_service")
            .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/additionalInfo/bundlePurchase") //localhost:8899/user/additionalInfo/bundlePurchase   //예매하기안넘어감//링크작업
    public ModelAndView user_bundlePurchase(HttpServletRequest request) {
        HttpSession session = request.getSession();
    return new ModelAndView("/user/pages/additional_info/bundle_purchase/bundle_purchase")
            .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/additionalInfo/insurance") //localhost:8899/user/additionalInfo/insurance
    public ModelAndView user_insurance(HttpServletRequest request) {
        HttpSession session = request.getSession();
    return new ModelAndView("/user/pages/additional_info/insurance/insurance")
            .addObject("memPoint", session.getAttribute("point"));
    }


    @RequestMapping("/boardingInfo/cabinBaggage") //localhost:8899/user/boardingInfo/cabinBaggage
    public ModelAndView user_cabinBaggage(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/boarding_info/baggage/cabin_baggage/cabin_baggage")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/boardingInfo/liability") //localhost:8899/user/boardingInfo/liability     //링크작업
    public ModelAndView user_liability(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/boarding_info/baggage/liability/liability")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/boardingInfo/transportLimit") //localhost:8899/user/boardingInfo/transportLimit
    public ModelAndView user_transportLimit(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/boarding_info/baggage/transport_limit/transport_limit")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/boardingInfo/trustBaggage") //localhost:8899/user/boardingInfo/trustBaggage
    public ModelAndView user_trustBaggage(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/boarding_info/baggage/trust_baggage/trust_baggage")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/boardingInfo/baggage") //localhost:8899/user/boardingInfo/baggage
    public ModelAndView user_baggage(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/boarding_info/baggage/baggage")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/boardingInfo/customerHelp") //localhost:8899/user/boardingInfo/customerHelp
    public ModelAndView user_customerHelp(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/boarding_info/customer_for_help/customer_for_help")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/boardingInfo/fastCheckIn") //localhost:8899/user/boardingInfo/fastCheckIn     //링크작업//셀프백드랍안뜸
    public ModelAndView user_fastCheckIn(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/boarding_info/fast_checkin/fast_checkin")
                .addObject("memPoint", session.getAttribute("point"));
    }



    @RequestMapping("/customerService/faqList") //localhost:8899/user/customerService/faqList
    public ModelAndView user_faqList(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/customer_service/customer_service/faqList")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/customerService/cabinLost") //localhost:8899/user/customerService/cabinLost
    public ModelAndView user_cabinLost(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/customer_service/lost_items/cabin_lostinquire/cabinLost")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/customerService/notice/noticeDetail") //localhost:8899/user/customerService/notice/noticeDetail       //공지사항목록으로안감 경로확인
    public ModelAndView user_noticeDetail(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/customer_service/notice/notice_detail/noticeDetail")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/customerService/notice/noticeList") //localhost:8899/user/customerService/notice/noticeList
    public ModelAndView user_notice(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/customer_service/notice/notice")
                .addObject("memPoint", session.getAttribute("point"));

    }




    @RequestMapping("/event/pastEvent") //localhost:8899/user/event/pastEvent
    public ModelAndView user_pastEvent(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/event/event_last/pastEvent")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/event/pastEventDetail") //localhost:8899/user/event/pastEventDetail       //버튼 안넘어감 링크작업
    public ModelAndView user_pastEventDetail(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/event/event_last/pastEventDetail")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/event/pastEventDetail1") //localhost:8899/user/event/pastEventDetail1 //다른이벤트 버튼 안넘어감 링크작업
    public ModelAndView user_pastEventDetail1(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/event/event_last/pastEventDetail1")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/event/pastEventDetail2") //localhost:8899/user/event/pastEventDetail2 //버튼 안넘어감 링크작업
    public ModelAndView user_pastEventDetail2(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/event/event_last/pastEventDetail2")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/event/eventDetail/{evtIdx}")
    public ModelAndView user_eventDetail(HttpServletRequest request, @PathVariable(name = "evtIdx") Long evtIdx) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/event/event_now/event_detail/eventDetail")
                .addObject("memPoint", session.getAttribute("point"));
    }


    @RequestMapping("/event/eventList") //localhost:8899/user/event/eventList
    public ModelAndView user_eventList(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/event/event_now/eventList")
                .addObject("memPoint", session.getAttribute("point"));
    }


    @RequestMapping("/flight_service/immigration_form")  //localhost:8899/user/flight_service/immigration_form
    public ModelAndView immigration_form(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/flight_service/immigration_form/immigration_form")
                .addObject("memPoint", session.getAttribute("point"));
    }


    @RequestMapping("/footer_menu/carriage_terms") //localhost:8899/user/footer_menu/carriage_terms
    public ModelAndView carriage_terms(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/footer_menu/carriage_terms/carriageTemrs")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/footer_menu/corp_info") //localhost:8899/user/footer_menu/corp_info
    public ModelAndView corp_info(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/footer_menu/corp_info/corp_info")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/footer_menu/esg") //localhost:8899/user/footer_menu/esg
    public ModelAndView esg(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/footer_menu/esg/esg")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/footer_menu/homepage_terms") //localhost:8899/user/footer_menu/homepage_terms
    public ModelAndView homepage_terms(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/footer_menu/homepage_terms/homepage_terms")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/footer_menu/invest_info/invest_info_detail") //localhost:8899/user/footer_menu/invest_info/invest_info_detail
    public ModelAndView invest_info_detail(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/footer_menu/invest_info/invest_info_detail/invest_info_detail")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/footer_menu/invest_info/notice_detail") //localhost:8899/user/footer_menu/invest_info/notice_detail
    public ModelAndView notice_detail(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/footer_menu/invest_info/notice_detail/notice_detail")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/footer_menu/personal_terms") //localhost:8899/user/footer_menu/personal_terms
    public ModelAndView personal_terms(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/footer_menu/personal_terms/personal_terms")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/footer_menu/sitemap")  //localhost:8899/user/footer_menu/sitemap
    public ModelAndView sitemap(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/footer_menu/sitemap/sitemap")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/footer_menu/transportationServicePlan") //localhost:8899/user/footer_menu/transportationServicePlan
    public ModelAndView transportationServicePlan(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return new ModelAndView("/user/pages/footer_menu/sitemap/transportationServicePlan")
                .addObject("memPoint", session.getAttribute("point"));
    }

    @RequestMapping("/join")   //localhost:8899/user/join
    public ModelAndView join() {
        return new ModelAndView("/user/pages/join/join");}

    @RequestMapping("/join_form") //localhost:8899/user/join_form
    public ModelAndView join_form() {
        return new ModelAndView("/user/pages/join/join_form");}


    //우재 테스트 끝


    //항공권 결제 후 예매 확인 및 취소


    @RequestMapping("/viewReservationDetail/{resIdx}")
    public ModelAndView viewReservationDetail(HttpServletRequest request, @PathVariable(name = "resIdx") Long resIdx) {
        HttpSession session = request.getSession();
        if (session.getAttribute("userid") != null) {
            return new ModelAndView("/user/pages/mypage/afterpayment/viewReservationDetail")
                    .addObject("idx", session.getAttribute("idx"))
                    .addObject("memPoint", session.getAttribute("point"));
        } else {
            return new ModelAndView("/user/pages/login/login");
        }
    }

    @RequestMapping("/viewPnrCancelComplete") //localhost:8899/user/viewPnrCancelComplete       //안먹음
    public ModelAndView viewPnrCancelComplete(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("idx") != null) {          //userid? idx?
        return new ModelAndView("/user/pages/mypage/afterpayment/viewPnrCancelComplete")
                .addObject("idx", session.getAttribute("idx"))
                .addObject("memPoint", session.getAttribute("point"));
        } else {
            return new ModelAndView("/user/pages/login/login");
        }
    }

    @RequestMapping("/viewReservationList")  //localhost:8899/user/viewReservationList      //안먹음
    public ModelAndView viewReservationList(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("idx") != null) {      //userid? idx?
            return new ModelAndView("/user/pages/mypage/afterpayment/viewReservationList")
                    .addObject("idx", session.getAttribute("idx"))
                    .addObject("memPoint", session.getAttribute("point"));
        } else {
            return new ModelAndView("/user/pages/login/login");
        }
    }

}

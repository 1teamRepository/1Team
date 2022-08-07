package com.project.jejuair.controller.page;

import com.project.jejuair.model.network.response.TbMemberResponse;
import com.project.jejuair.service.TbMemberApiLogicService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    // http://localhost:10000/user
    @Autowired
    private final TbMemberApiLogicService tbMemberApiLogicService;

    //로그인페이지

    @RequestMapping("/login")
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


    @RequestMapping("/password_edit")
    public ModelAndView password_edit(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session.getAttribute("userid") != null) {
            return new ModelAndView("/user/pages/mypage/info_edit/password_edit");
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

    @RequestMapping("/nameChange")
    public ModelAndView nameChange(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session.getAttribute("idx") != null) {
            return new ModelAndView("/user/pages/mypage/info_edit/nameChange");
        }else {
            return new ModelAndView("/user/pages/login/login");
        }
    }




    @RequestMapping("")
    public ModelAndView index() {
        return new ModelAndView("/user/pages/index");
    }

    @RequestMapping("/findEmailUserInfo")
    public ModelAndView findEmailUserInfo() {
        return new ModelAndView("/user/pages/member/find/findEmailUserInfo/findEmailUserInfo");
    }

    @RequestMapping("/findPhoneUserInfo") //이메일로 변경 예정, 국가번호 선택 안됨
    public ModelAndView findPhoneUserInfo() {
        return new ModelAndView("/user/pages/member/find/findPhoneUserInfo/findPhoneUserInfo");
    }

    @RequestMapping("/findUserIdInfo")
    public ModelAndView findUserIdInfo() {
        return new ModelAndView("/user/pages/member/find/findUserIdInfo/findUserIdInfo");
    }

    @RequestMapping("/findUserInfo") //이메일로 변경 예정, 국가번호 선택 안됨
    public ModelAndView findUserInfo() {
        return new ModelAndView("/user/pages/member/find/findUserInfo/findUserInfo");
    }

    @RequestMapping("/findUserInfoList")
    public ModelAndView findUserInfoList() {
        return new ModelAndView("/user/pages/member/find/findUserInfoList/findUserInfoList");
    }

    @RequestMapping("/emailSendGuide")
    public ModelAndView emailSendGuide() {
        return new ModelAndView("/user/pages/member/login/emailSendGuide");
    }

    @RequestMapping("/member_benefit_new")
    public ModelAndView member_benefit() {
        return new ModelAndView("/user/pages/member_benefit/member_benefit_new/member_benefit_new");
    }


    @RequestMapping("/point_main")
    public ModelAndView point_main() {
        return new ModelAndView("/user/pages/member_benefit/point/point_main");
    }


    @RequestMapping("/after_point_save")
    public ModelAndView after_point_save() {
        return new ModelAndView("/user/pages/member_benefit/point/point_save/after_point_save/after_point_save");
    }

    @RequestMapping("/point_save_info")
    public ModelAndView point_save_info() {
        return new ModelAndView("/user/pages/member_benefit/point/point_save_info/point_save_info");
    }


//    @RequestMapping("/point_member")
//    public ModelAndView point_member() {
//        return new ModelAndView("/user/pages/member_benefit/point/point_use_info/point_member");
//    }

//    @RequestMapping("/point_nomember")
//    public ModelAndView point_nomember() {
//        return new ModelAndView("/user/pages/member_benefit/point/point_use_info/point_nomember");
//    }

    @RequestMapping("/point_buy")
    public ModelAndView point_buy() {
        return new ModelAndView("/user/pages/member_benefit/point_buy/point_buy");
    }

    @RequestMapping("/point_search") //JS 작동 안함
    public ModelAndView point_search() {
        return new ModelAndView("/user/pages/member_benefit/point_search/point_search");
    }


    @RequestMapping("/info_edit")
    public ModelAndView info_edit() {
        return new ModelAndView("/user/pages/mypage/info_edit/info_edit");
    }

//    @RequestMapping("/info_edit_password")
//    public ModelAndView info_edit_password() {
//        return new ModelAndView("/user/pages/mypage/info_edit/info_edit_password");
//    }

    @RequestMapping("/info_edit_password")
    public ModelAndView userIndex(HttpServletRequest request){
        HttpSession session = request.getSession();
        if(session.getAttribute("idx") != null) {
            return new ModelAndView("/user/pages/mypage/info_edit/info_edit_password");
        }else {
            return new ModelAndView("/user/pages/login/login");
        }
    }


    @RequestMapping("/info_edit_mypage")
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
                    .addObject("email", session.getAttribute("email"));
        }else {
            return new ModelAndView("/user/pages/login/login");
        }
    }



    @RequestMapping("/my_history")
    public ModelAndView my_history() {
        return new ModelAndView("/user/pages/mypage/my_history/my_history");
    }

    @RequestMapping("/my_reserve")
    public ModelAndView my_reserve() {
        return new ModelAndView("/user/pages/mypage/my_reserve/my_reserve");
    }

    @RequestMapping("/mypage_main_member")
    public ModelAndView mypage_main_member(HttpServletRequest request){

        HttpSession session = request.getSession();
        Long memIdx= (Long) session.getAttribute("idx");

        if (session.getAttribute("idx") != null) {
            return new ModelAndView("/user/pages/mypage/mypage_main/mypage_main_member")
                    .addObject("idx", memIdx);
        }else{
            return new ModelAndView("/user/pages/login/login");
        }
    }


    @RequestMapping("/reserve_info")
    public ModelAndView reserve_info(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("idx") != null) {
            return new ModelAndView("/user/pages/mypage/reserve_info/reserve_info");
        } else {
            return new ModelAndView("/user/pages/login/login");
        }
    }

    @RequestMapping("/qna_list")
    public ModelAndView qna_list(HttpServletRequest request) {
        HttpSession session = request.getSession();
        Long memIdx= (Long) session.getAttribute("idx");

        if (session.getAttribute("idx") != null) {
            return new ModelAndView("/user/pages/mypage/mypage_main/qna_list/qna_list")
                    .addObject("idx", memIdx);
        } else {
            return new ModelAndView("/user/pages/login/login");
        }
    }

    @RequestMapping("/qna_form")
    public ModelAndView qna_form(HttpServletRequest request) {

        HttpSession session = request.getSession();
        Long memIdx= (Long) session.getAttribute("idx");
        String memUserid= (String) session.getAttribute("id");
        System.out.println("id: "+ memUserid);

        if (session.getAttribute("idx") != null) {
            return new ModelAndView("/user/pages/mypage/mypage_main/qna_list/qna_form/qna_form")
                    .addObject("id", memUserid);
        } else {
            return new ModelAndView("/user/pages/login/login");
        }
    }

    @RequestMapping("/domestic_price")
    public ModelAndView domestic_price() {
        return new ModelAndView("/user/pages/travel_pre_info/domestic_price/domestic_price");
    }

    @RequestMapping("/flight_info") //우재가 하기로 함
    public ModelAndView flight_info() {
        return new ModelAndView("/user/pages/travel_pre_info/flight_info/flight_info");
    }

    @RequestMapping("/inter_price")
    public ModelAndView inter_price() {
        return new ModelAndView("/user/pages/travel_pre_info/inter_price/inter_price");
    }

//    예매 페이지 시작

    @RequestMapping("/ticket_reservation") //메인에서 해결 후 가져오기
    public ModelAndView ticket_reservation(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("userid") != null) {
            return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/ticket_reservation");
        } else {
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
            @RequestParam(value = "passengerNum") int passengerNum)
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
                    .addObject("idx",session.getAttribute("idx"))
                    .addObject("userid",session.getAttribute("userid"));
        } else {
            return new ModelAndView("/user/pages/login/login");
        }
    }


    @RequestMapping("/avail_search") //되는데 허접,,데이터 필요
    public ModelAndView avail_search() {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/avail_search");
    }




    //    편도노선
    @RequestMapping("/oneway/view_passenger_input")
    public ModelAndView oneway_view_passenger_input(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("userid") != null) {
            return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/oneway/view_passenger_input")
                    .addObject("idx", session.getAttribute("idx"))
                    .addObject("userid", session.getAttribute("userid"))
                    .addObject("koLastname", session.getAttribute("koLastname"))
                    .addObject("koFirstname", session.getAttribute("koFirstname"))
                    .addObject("engLastname", session.getAttribute("engLastname"))
                    .addObject("engFirstname", session.getAttribute("engFirstname"))
                    .addObject("ssn", session.getAttribute("ssn"))
                    .addObject("gender", session.getAttribute("gender"))
                    .addObject("hp", session.getAttribute("hp"))
                    .addObject("email", session.getAttribute("email"));
        } else {
            return new ModelAndView("/user/pages/login/login");
        }
    }

    @RequestMapping("/oneway/seat_select")
    public ModelAndView oneway_seat_select() {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/oneway/seat_select_ow");
    }

    @RequestMapping("/oneway/baggage_select")
    public ModelAndView oneway_baggage_select() {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/oneway/baggage_select_ow");
    }

    @RequestMapping("/oneway/meal_select")
    public ModelAndView oneway_meal_select() {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/oneway/meal_select_ow");
    }

    @RequestMapping("/oneway/view_confirm")
    public ModelAndView oneway_view_confirm() {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/oneway/view_confirm_ow");
    }

//    @RequestMapping("/oneway/view_payment")
//    public ModelAndView oneway_view_payment(HttpServletRequest request) {
//        HttpSession session = request.getSession();
//        if (session.getAttribute("userid") != null) {
//            return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/oneway/view_payment_complete_ow")
//                    .addObject("idx",session.getAttribute("idx"))
//                    .addObject("userid",session.getAttribute("userid"));
//        } else {
//            return new ModelAndView("/user/pages/login/login");
//        }
//    }

    @RequestMapping("/oneway/view_payment")
    public ModelAndView oneway_view_payment() {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/oneway/view_payment_complete_ow");
    }

//    왕복노선

    @RequestMapping("/round/view_passenger_input")
    public ModelAndView round_view_passenger_input() {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/round/view_passenger_input");
    }

    @RequestMapping("/round/seat_select1")
    public ModelAndView round_seat_select1() {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/round/seat_select_ro1");
    }

    @RequestMapping("/round/seat_select2")
    public ModelAndView round_seat_select2() {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/round/seat_select_ro2");
    }


    @RequestMapping("/round/baggage_select")
    public ModelAndView round_baggage_select() {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/round/baggage_select_ro");
    }

    @RequestMapping("/round/meal_select")
    public ModelAndView round_meal_select() {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/round/meal_select_ro");
    }

    @RequestMapping("/round/view_confirm")
    public ModelAndView round_view_confirm() {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/round/view_confirm_ro");
    }

    @RequestMapping("/round/view_payment")
    public ModelAndView round_view_payment() {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/round/view_payment_ro");
    }

    //    예매 페이지 끝

    //은비 테스트 끝




    //응수 테스트

        //additional_intro 시작(응수)
        @RequestMapping("/additionalInfo/additionalIntro") //localhost:10000/user/additionalInfo/additionalIntro
        public ModelAndView user_additionalIntro() { return new ModelAndView("/user/pages/additional_info/additional_intro/additional_intro");}

        @RequestMapping("/additionalInfo/advanceBaggage") //localhost:10000/user/additionalInfo/advanceBaggage
        public ModelAndView user_advanceBaggage() { return new ModelAndView("/user/pages/additional_info/advance_baggage/advance_baggage");}

        @RequestMapping("/additionalInfo/advanceMeal") //localhost:10000/user/additionalInfo/advanceMeal
        public ModelAndView user_advanceMeal() { return new ModelAndView("/user/pages/additional_info/advance_meal/advance_meal");}

        //안됨
        @RequestMapping("/additionalInfo/advanceSeat") //localhost:10000/user/additionalInfo/advanceSeat
        public ModelAndView user_advanceSeat() { return new ModelAndView("/user/pages/additional_info/advance_seat/advance_seat");}

        @RequestMapping("/additionalInfo/afterPayment") //localhost:10000/user/additionalInfo/afterPayment
        public ModelAndView user_afterPayment() { return new ModelAndView("/user/pages/additional_info/after_payment/after_payment");}

        @RequestMapping("/additionalInfo/bicycleService") //localhost:10000/user/additionalInfo/bicycleService
        public ModelAndView user_bicycleService() { return new ModelAndView("/user/pages/additional_info/bicycle_service/bicycle_service");}

        @RequestMapping("/additionalInfo/bundlePurchase") //localhost:10000/user/additionalInfo/bundlePurchase
        public ModelAndView user_bundlePurchase() { return new ModelAndView("/user/pages/additional_info/bundle_purchase/bundle_purchase");}

        @RequestMapping("/additionalInfo/insurance") //localhost:10000/user/additionalInfo/insurance
        public ModelAndView user_insurance() { return new ModelAndView("/user/pages/additional_info/insurance/insurance");}
        //additional_intro 끝(응수)


        //boarding_info 시작(응수)

        @RequestMapping("/boardingInfo/baggagePrice") //localhost:10000/user/boardingInfo/baggagePrice
        public ModelAndView user_baggagePrice() { return new ModelAndView("/user/pages/boarding_info/baggage/baggage_price/baggage_price");}

        @RequestMapping("/boardingInfo/cabinBaggage") //localhost:10000/user/boardingInfo/cabinBaggage
        public ModelAndView user_cabinBaggage() { return new ModelAndView("/user/pages/boarding_info/baggage/cabin_baggage/cabin_baggage");}

        @RequestMapping("/boardingInfo/liability") //localhost:10000/user/boardingInfo/liability
        public ModelAndView user_liability() { return new ModelAndView("/user/pages/boarding_info/baggage/liability/liability");}

        @RequestMapping("/boardingInfo/specialBaggage") //localhost:10000/user/boardingInfo/specialBaggage
        public ModelAndView user_specialBaggage() { return new ModelAndView("/user/pages/boarding_info/baggage/special_baggage/special_baggage");}

        @RequestMapping("/boardingInfo/transportLimit") //localhost:10000/user/boardingInfo/transportLimit
        public ModelAndView user_transportLimit() { return new ModelAndView("/user/pages/boarding_info/baggage/transport_limit/transport_limit");}

        @RequestMapping("/boardingInfo/trustBaggage") //localhost:10000/user/boardingInfo/trustBaggage
        public ModelAndView user_trustBaggage() { return new ModelAndView("/user/pages/boarding_info/baggage/trust_baggage/trust_baggage");}

        @RequestMapping("/boardingInfo/baggage") //localhost:10000/user/boardingInfo/baggage
        public ModelAndView user_baggage() { return new ModelAndView("/user/pages/boarding_info/baggage/baggage");}

        @RequestMapping("/boardingInfo/customerHelp") //localhost:10000/user/boardingInfo/customerHelp
        public ModelAndView user_customerHelp() { return new ModelAndView("/user/pages/boarding_info/customer_for_help/customer_for_help");}

        @RequestMapping("/boardingInfo/fastCheckIn") //localhost:10000/user/boardingInfo/fastCheckIn
        public ModelAndView user_fastCheckIn() { return new ModelAndView("/user/pages/boarding_info/fast_checkin/fast_checkin");}
        //boarding_info 끝(응수)


        //customer_service 시작(응수)
        @RequestMapping("/customerService/faqList") //localhost:10000/user/customerService/faqList
        public ModelAndView user_faqList() { return new ModelAndView("/user/pages/customer_service/customer_service/faqList");}

        @RequestMapping("/customerService/cabinLost") //localhost:10000/user/customerService/cabinLost
        public ModelAndView user_cabinLost() { return new ModelAndView("/user/pages/customer_service/lost_items/cabin_lostinquire/cabinLost");}

        @RequestMapping("/customerService/notice/noticeDetail") //localhost:10000/user/customerService/notice/noticeDetail
        public ModelAndView user_noticeDetail() { return new ModelAndView("/user/pages/customer_service/notice/notice_detail/noticeDetail");}

        @RequestMapping("/customerService/notice/noticeList") //localhost:10000/user/customerService/notice/noticeList
        public ModelAndView user_notice() { return new ModelAndView("/user/pages/customer_service/notice/notice");}
        //customer_service 끝(응수)

        //event 시작(응수)
        @RequestMapping("/event/pastEvent") //localhost:10000/user/event/pastEvent
        public ModelAndView user_pastEvent() { return new ModelAndView("/user/pages/event/event_last/pastEvent");}

        @RequestMapping("/event/eventDetail") //localhost:10000/user/event/eventDetail"
        public ModelAndView user_eventDetail() { return new ModelAndView("/user/pages/event/event_now/event_detail/eventDetail");}

        @RequestMapping("/event/eventList") //localhost:10000/user/event/eventList
        public ModelAndView user_eventList() { return new ModelAndView("/user/pages/event/event_now/eventList");}
        //event 끝(응수)

    //응수 테스트 끝



    //우재 테스트
    // flight_service/immigration_form
    // http://localhost:10000/user/flight_service/immigration_form
    @RequestMapping("/flight_service/immigration_form")
    public ModelAndView immigration_form() {
        return new ModelAndView("/user/pages/flight_service/immigration_form/immigration_form");
    }

    // footer_menu/carriage_terms
    // http://localhost:10000/user/footer_menu/carriage_terms
    @RequestMapping("/footer_menu/carriage_terms")
    public ModelAndView carriage_terms() {
        return new ModelAndView("/user/pages/footer_menu/carriage_terms/carriageTemrs");
    }

    // footer_menu/corp_info
    // http://localhost:10000/user/footer_menu/corp_info
    @RequestMapping("/footer_menu/corp_info")
    public ModelAndView corp_info() {
        return new ModelAndView("/user/pages/footer_menu/corp_info/corp_info");
    }

    // footer_menu/esg
    // http://localhost:10000/user/footer_menu/esg
    @RequestMapping("/footer_menu/esg")
    public ModelAndView esg() {
        return new ModelAndView("/user/pages/footer_menu/esg/esg");
    }

    // footer_menu/homepage_terms
    // http://localhost:10000/user/footer_menu/homepage_terms
    @RequestMapping("/footer_menu/homepage_terms")
    public ModelAndView homepage_terms() {
        return new ModelAndView("/user/pages/footer_menu/homepage_terms/homepage_terms");
    }

    // footer_menu/invest_info/invest_info_detail
    // http://localhost:10000/user/footer_menu/invest_info/invest_info_detail
    @RequestMapping("/footer_menu/invest_info/invest_info_detail")
    public ModelAndView invest_info_detail() {
        return new ModelAndView("/user/pages/footer_menu/invest_info/invest_info_detail/invest_info_detail");
    }

    // footer_menu/invest_info/notice_detail
    // http://localhost:10000/user/footer_menu/invest_info/notice_detail
    @RequestMapping("/footer_menu/invest_info/notice_detail")
    public ModelAndView notice_detail() {
        return new ModelAndView("/user/pages/footer_menu/invest_info/notice_detail/notice_detail");
    }

    // footer_menu/personal_terms/personal_terms
    // http://localhost:10000/user/footer_menu/personal_terms
    @RequestMapping("/footer_menu/personal_terms")
    public ModelAndView personal_terms() {
        return new ModelAndView("/user/pages/footer_menu/personal_terms/personal_terms");
    }

    // footer_menu/sitemap/sitemap
    // http://localhost:10000/user/footer_menu/sitemap
    @RequestMapping("/footer_menu/sitemap")
    public ModelAndView sitemap() {
        return new ModelAndView("/user/pages/footer_menu/sitemap/sitemap");
    }

    // join/join
    // http://localhost:10000/user/join
    @RequestMapping("/join")
    public ModelAndView join() {
        return new ModelAndView("/user/pages/join/join");
    }

    @RequestMapping("/join_form")
    public ModelAndView join_form() {
        return new ModelAndView("/user/pages/join/join_form");
    }


    //우재 테스트 끝


    //항공권 결제 후 예매 확인 및 취소
    @RequestMapping("/viewReservationList")
    public ModelAndView viewReservationList() {
        return new ModelAndView("/user/pages/mypage/afterpayment/viewReservationList");
    }

    @RequestMapping("/viewReservationDetail")
    public ModelAndView viewReservationDetail() {
        return new ModelAndView("/user/pages/mypage/afterpayment/viewReservationDetail");
    }


    @RequestMapping("/viewPnrCancelComplete")
    public ModelAndView viewPnrCancelComplete() {
        return new ModelAndView("/user/pages/mypage/afterpayment/viewPnrCancelComplete");
    }

    @RequestMapping("/viewPaymentComplete")
    public ModelAndView viewPaymentComplete() {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/viewPaymentComplete");
    }

}

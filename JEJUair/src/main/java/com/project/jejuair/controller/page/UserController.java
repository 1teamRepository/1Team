package com.project.jejuair.controller.page;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/user")
public class UserController {

    // http://localhost:10000/user
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

    @RequestMapping("/my_history")
    public ModelAndView my_history() {
        return new ModelAndView("/user/pages/mypage/my_history/my_history");
    }

    @RequestMapping("/my_reserve")
    public ModelAndView my_reserve() {
        return new ModelAndView("/user/pages/mypage/my_reserve/my_reserve");
    }

    @RequestMapping("/mypage_main_member")
    public ModelAndView mypage_main_member() {
        return new ModelAndView("/user/pages/mypage/mypage_main/mypage_main_member");
    }

    @RequestMapping("/mypage_main_nomember")
    public ModelAndView mypage_main_nomember() {
        return new ModelAndView("/user/pages/mypage/mypage_main/mypage_main_nomember");
    }

    @RequestMapping("/reserve_info")
    public ModelAndView reserve_info() {
        return new ModelAndView("/user/pages/mypage/reserve_info/reserve_info");
    }

    @RequestMapping("/qna_list")
    public ModelAndView qna_list() {
        return new ModelAndView("/user/pages/mypage/mypage_main/qna_list/qna_list");
    }

    @RequestMapping("/qna_form") //우재가 하기로함
    public ModelAndView qna_form() {
        return new ModelAndView("/user/pages/mypage/mypage_main/qna_list/qna_form/qna_form");
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

    @RequestMapping("/ticket_reservation") //메인에서 해결 후 가져오기
    public ModelAndView ticket_reservation() {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/ticket_reservation");
    }

    @RequestMapping("/avail_search") //되는데 허접,,데이터 필요
    public ModelAndView avail_search() {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/avail_search");
    }



    @RequestMapping("/view_passenger_input")
    public ModelAndView view_passenger_input() {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/view_passenger_input");
    }

    @RequestMapping("/seat_select") //데이터 넣어야..
    public ModelAndView seat_select() {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/seat_select");
    }

    @RequestMapping("/baggage_select") //우재가 집가서 해결 불가능,,,스크립트 지우고 다시 작성
    public ModelAndView baggage_select() {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/baggage_select");
    }

    @RequestMapping("/ancillary_gate")
    public ModelAndView ancillary_gate() {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/ancillary_gate");
    }

    @RequestMapping("/view_confirm")
    public ModelAndView view_confirm() {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/view_confirm");
    }

    @RequestMapping("/view_payment")
    public ModelAndView view_payment() {
        return new ModelAndView("/user/pages/travel_pre_info/ticket_reservation/view_payment");
    }


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

    // login/nonuser_login/nonuser_login
    // http://localhost:10000/user/login/nonuser_login
    @RequestMapping("/login/nonUserLogin")
    public ModelAndView nonuser_login() {
        return new ModelAndView("/user/pages/login/nonUserLogin");
    }

    // login/login
    // http://localhost:10000/user/login
    @RequestMapping("/login")
    public ModelAndView login() {
        return new ModelAndView("/user/pages/login/login");
    }

    //우재 테스트 끝

}

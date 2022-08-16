package com.project.jejuair.controller.page;

import com.project.jejuair.model.entity.TbAdminuser;
import com.project.jejuair.model.network.response.TbAdminuserResponse;
import com.project.jejuair.service.TbAdminuserApiLogicService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Controller
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    @Autowired
    private final TbAdminuserApiLogicService tbAdminuserApiLogicService;

    @RequestMapping("/login")
    public String Logout(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.invalidate();
        return "/admin/pages/login";
    }


    @PostMapping("/loginOk")
    public ModelAndView LoginOk(HttpServletRequest request, String admAdminId, String admAdminPw) throws Exception{
        TbAdminuserResponse tbAdminuserResponse = tbAdminuserApiLogicService.pwCheck(admAdminId, admAdminPw).getData();
        if(tbAdminuserResponse != null){
            HttpSession session = request.getSession();
            String name = tbAdminuserResponse.getAdmKorName();
            session.setAttribute("name", name);
            session.setAttribute("id", admAdminId);
            System.out.println("로그인 성공");
            return new ModelAndView("redirect:/admin/flight_schedule/list");
        }else{
            System.out.println("로그인 실패");
            return new ModelAndView("/admin/pages/login")
                    .addObject("message", "fail");
        }
    }

    @RequestMapping("")
    public ModelAndView adminIndex(HttpServletRequest request){
        HttpSession session = request.getSession();
        if(session.getAttribute("name") != null) {
            return new ModelAndView("/admin/pages/flight_schedule/flight_schedule_list/flight_schedule_list");
        }else {
            return new ModelAndView("/admin/pages/login");
        }
    }


    @RequestMapping("/flight_schedule/list")
    public ModelAndView flightScheduleList(){
        return new ModelAndView("/admin/pages/flight_schedule/flight_schedule_list/flight_schedule_list");
    }

    @RequestMapping("/flight_schedule/view/{schIdx}")
    public ModelAndView flightScheduleView(HttpServletRequest request, @PathVariable(name="schIdx") Long schIdx){
        HttpSession session = request.getSession();
        if(session.getAttribute("name") != null) {
            return new ModelAndView("/admin/pages/flight_schedule/flight_schedule_list/flight_schedule_info");
        }else {
            return new ModelAndView("/admin/pages/login");
        }
    }

    @RequestMapping("/flight_schedule/edit/{schIdx}")
    public ModelAndView flightScheduleEdit(HttpServletRequest request, @PathVariable(name="schIdx") Long schIdx){
        HttpSession session = request.getSession();
        if(session.getAttribute("name") != null) {
            return new ModelAndView("/admin/pages/flight_schedule/flight_schedule_list/flight_schedule_edit");
        }else {
            return new ModelAndView("/admin/pages/login");
        }
    }

    @RequestMapping("/flight_schedule/regist")
    public ModelAndView flightScheduleRegist(){
        return new ModelAndView("/admin/pages/flight_schedule/flight_schedule_regist/flight_schedule_regist");
    }

    @RequestMapping("/aircraft/list")
    public ModelAndView aircraftList(){
        return new ModelAndView("/admin/pages/flight_schedule/aircraft_list/aircraft_list");
    }

    @RequestMapping("/aircraft/view/{acftIdx}")
    public ModelAndView aircraftView(HttpServletRequest request, @PathVariable(name="acftIdx") Long acftIdx){
        HttpSession session = request.getSession();
        if(session.getAttribute("name") != null) {
            return new ModelAndView("/admin/pages/flight_schedule/aircraft_list/aircraft_info");
        }else {
            return new ModelAndView("/admin/pages/login");
        }
    }

    @RequestMapping("/aircraft/edit/{acftIdx}")
    public ModelAndView aircraftEdit(HttpServletRequest request, @PathVariable(name="acftIdx") Long acftIdx){
        HttpSession session = request.getSession();
        if(session.getAttribute("name") != null) {
            return new ModelAndView("/admin/pages/flight_schedule/aircraft_list/aircraft_edit");
        }else {
            return new ModelAndView("/admin/pages/login");
        }
    }

    @RequestMapping("/aircraft/regist")
    public ModelAndView aircraftRegist(){
        return new ModelAndView("/admin/pages/flight_schedule/aircraft_regist/aircraft_regist");
    }

    @RequestMapping("/destination/list")
    public ModelAndView destinationList(){
        return new ModelAndView("/admin/pages/flight_schedule/destination_list/destination_list");
    }

    @RequestMapping("/destination/view/{desIdx}")
    public ModelAndView destinationView(HttpServletRequest request, @PathVariable(name="desIdx") Long desIdx){
        HttpSession session = request.getSession();
        if(session.getAttribute("name") != null) {
            return new ModelAndView("/admin/pages/flight_schedule/destination_list/destination_info");
        }else {
            return new ModelAndView("/admin/pages/login");
        }
    }

    @RequestMapping("/destination/edit/{desIdx}")
    public ModelAndView destinationEdit(HttpServletRequest request, @PathVariable(name="desIdx") Long desIdx){
        HttpSession session = request.getSession();
        if(session.getAttribute("name") != null) {
            return new ModelAndView("/admin/pages/flight_schedule/destination_list/destination_edit");
        }else {
            return new ModelAndView("/admin/pages/login");
        }
    }

    @RequestMapping("/destination/regist")
    public ModelAndView destinationRegist(){
        return new ModelAndView("/admin/pages/flight_schedule/destination_regist/destination_regist");
    }

    @RequestMapping("/customer/list")
    public ModelAndView customerList(){
        return new ModelAndView("/admin/pages/customer/customer_list/customer_list");
    }

    @RequestMapping("/customer/view/{memIdx}")
    public ModelAndView customerView(HttpServletRequest request, @PathVariable(name="memIdx") Long memIdx){
        HttpSession session = request.getSession();
        if(session.getAttribute("name") != null) {
            return new ModelAndView("/admin/pages/customer/customer_list/customer_view");
        }else {
            return new ModelAndView("/admin/pages/login");
        }
    }

    @RequestMapping("/customer/edit/{memIdx}")
    public ModelAndView customerEdit(HttpServletRequest request, @PathVariable(name="memIdx") Long memIdx){
        HttpSession session = request.getSession();
        if(session.getAttribute("name") != null) {
            return new ModelAndView("/admin/pages/customer/customer_list/customer_edit");
        }else {
            return new ModelAndView("/admin/pages/login");
        }
    }


    @RequestMapping("/reservation/namelist")
    public ModelAndView reservationNamelist(){
        return new ModelAndView("/admin/pages/reservation/reservation_namelist/reservation_namelist");
    }

    @RequestMapping("/reservation/view/{resIdx}")
    public ModelAndView reservationView(HttpServletRequest request, @PathVariable(name="resIdx") Long resIdx){
        HttpSession session = request.getSession();
        if(session.getAttribute("name") != null) {
            return new ModelAndView("/admin/pages/reservation/reservation_namelist/reservation_detail_byname");
        }else {
            return new ModelAndView("/admin/pages/login");
        }
    }



    @RequestMapping("/payment/list")
    public ModelAndView paymentList(){
        return new ModelAndView("/admin/pages/payment/payment_list/payment_list");
    }


    @RequestMapping("/payment/info")
    public ModelAndView paymentInfoList(){
        return new ModelAndView("/admin/pages/payment/payment_settings/payment_settings_multi");
    }

    @RequestMapping("/payment/view/{payIdx}")
    public ModelAndView paymentView(HttpServletRequest request, @PathVariable(name="payIdx") Long payIdx){
        HttpSession session = request.getSession();
        if(session.getAttribute("name") != null) {
            return new ModelAndView("/admin/pages/payment/payment_settings/payment_settings_multi");
        }else {
            return new ModelAndView("/admin/pages/login");
        }
    }



    // 우재 포인트 시작
    @RequestMapping("/point/list")
    public ModelAndView pointList(){
        return new ModelAndView("/admin/pages/point/point_list/point_list");
    }

    @RequestMapping("/point/view/{pntIdx}")
    public ModelAndView pointView(HttpServletRequest request, @PathVariable(name="pntIdx") Long pntIdx){
        HttpSession session = request.getSession();
        if(session.getAttribute("name") != null) {
            return new ModelAndView("/admin/pages/point/point_list/point_view");
        }else {
            return new ModelAndView("/admin/pages/login");
        }
    }

    @RequestMapping("/point/edit/{pntIdx}")
    public ModelAndView pointEdit(HttpServletRequest request, @PathVariable(name="pntIdx") Long pntIdx){
        HttpSession session = request.getSession();
        if(session.getAttribute("name") != null) {
            return new ModelAndView("/admin/pages/point/point_list/point_edit");
        }else {
            return new ModelAndView("/admin/pages/login");
        }
    }

    @RequestMapping("/point/regist")
    public ModelAndView pointRegist(){
        return new ModelAndView("/admin/pages/point/point_regist/point_regist");
    }

    // 우재 이벤트  // http://localhost:10000/admin/event/list
    @RequestMapping("/event/list")
    public ModelAndView eventList(){
        return new ModelAndView("/admin/pages/event/event_list/event_list");
    }

    @RequestMapping("/event/view/{evtIdx}")
    public ModelAndView eventView(HttpServletRequest request, @PathVariable(name="evtIdx") Long evtIdx){
        HttpSession session = request.getSession();
        if(session.getAttribute("name") != null) {
            return new ModelAndView("/admin/pages/event/event_list/event_view");
        }else {
            return new ModelAndView("/admin/pages/login");
        }
    }

    @RequestMapping("/event/edit/{evtIdx}")
    public ModelAndView eventEdit(HttpServletRequest request, @PathVariable(name="evtIdx") Long evtIdx){
        HttpSession session = request.getSession();
        if(session.getAttribute("name") != null) {
            return new ModelAndView("/admin/pages/event/event_list/event_edit");
        }else {
            return new ModelAndView("/admin/pages/login");
        }
    }
    // http://localhost:10000/admin/event/regist
    @RequestMapping("/event/regist")
    public ModelAndView eventRegist(){
        return new ModelAndView("/admin/pages/event/event_regist/event_regist");
    }
    // 이벤트 끝



    @RequestMapping("/lost_item/list")
    public ModelAndView lostItemList(){
        return new ModelAndView("/admin/pages/lost_item/lost_item_list/lost_item_list");
    }

    @RequestMapping("/lost_item/view/{lostIdx}")
    public ModelAndView lostItemView(HttpServletRequest request, @PathVariable(name="lostIdx") Long lostIdx){
        HttpSession session = request.getSession();
        if(session.getAttribute("name") != null) {
            return new ModelAndView("/admin/pages/lost_item/lost_item_list/lost_item_view");
        }else {
            return new ModelAndView("/admin/pages/login");
        }
    }

    @RequestMapping("/lost_item/edit/{lostIdx}")
    public ModelAndView lostItemEdit(HttpServletRequest request, @PathVariable(name="lostIdx") Long lostIdx){
        HttpSession session = request.getSession();
        if(session.getAttribute("name") != null) {
            return new ModelAndView("/admin/pages/lost_item/lost_item_list/lost_item_edit");
        }else {
            return new ModelAndView("/admin/pages/login");
        }
    }

    @RequestMapping("/lost_item/regist")
    public ModelAndView lostItemRegist(){
        return new ModelAndView("/admin/pages/lost_item/lost_item_register/lost_item_register");
    }


    @RequestMapping("/food/list")
    public ModelAndView foodList(){
        return new ModelAndView("/admin/pages/airline_food_/airline_food_list/airline_food_list");
    }

    @RequestMapping("/food/view/{foodIdx}")
    public ModelAndView foodView(HttpServletRequest request, @PathVariable(name="foodIdx") Long foodIdx){
        HttpSession session = request.getSession();
        if(session.getAttribute("name") != null) {
            return new ModelAndView("/admin/pages/airline_food_/airline_food_list/airline_food_view");
        }else {
            return new ModelAndView("/admin/pages/login");
        }
    }

    @RequestMapping("/food/edit/{foodIdx}")
    public ModelAndView foodEdit(HttpServletRequest request, @PathVariable(name="foodIdx") Long foodIdx){
        HttpSession session = request.getSession();
        if(session.getAttribute("name") != null) {
            return new ModelAndView("/admin/pages/airline_food_/airline_food_list/airline_food_edit");
        }else {
            return new ModelAndView("/admin/pages/login");
        }
    }

    @RequestMapping("/food/regist")
    public ModelAndView foodRegist(){
        return new ModelAndView("/admin/pages/airline_food_/airline_food_regist/airline_food_regist");
    }

    @RequestMapping("/adminuser/list")
    public ModelAndView adminList(){
        return new ModelAndView("/admin/pages/admin_settings/admin_list/admin_list");
    }

    @RequestMapping("/adminuser/view/{admIdx}")
    public ModelAndView adminView(HttpServletRequest request, @PathVariable(name="admIdx") Long admIdx){
        HttpSession session = request.getSession();
        if(session.getAttribute("name") != null) {
            return new ModelAndView("/admin/pages/admin_settings/admin_list/admin_view");
        }else {
            return new ModelAndView("/admin/pages/login");
        }
    }

    @RequestMapping("/adminuser/edit/{admIdx}")
    public ModelAndView adminEdit(HttpServletRequest request, @PathVariable(name="admIdx") Long admIdx){
        HttpSession session = request.getSession();
        if(session.getAttribute("name") != null) {
            return new ModelAndView("/admin/pages/admin_settings/admin_list/admin_edit");
        }else {
            return new ModelAndView("/admin/pages/login");
        }
    }

    @RequestMapping("/adminuser/regist")
    public ModelAndView adminRegist(){
        return new ModelAndView("/admin/pages/admin_settings/admin_regist/admin_regist");
    }

    @RequestMapping("/recommended/list")
    public ModelAndView recommendedList(){
        return new ModelAndView("/admin/pages/mainpage_settings/recommended_flight_list/recommended_flight_list");
    }

    @RequestMapping("/recommended/regist")
    public ModelAndView recommendedRegist(){
        return new ModelAndView("/admin/pages/mainpage_settings/recommended_flight_regist/recommended_flight_regist");
    }


    @RequestMapping("/coupon/list") //localhost:10000/admin/coupon/list
    public ModelAndView couponList(){
        return new ModelAndView("/admin/pages/coupon/coupon_list/coupon_list");
    }

    @RequestMapping("/coupon/view/{copIdx}")
    public ModelAndView couponView(@PathVariable(name="copIdx") Long copIdx){
        return new ModelAndView("/admin/pages/coupon/coupon_list/coupon_detail");
    }

    @RequestMapping("/coupon/edit/{copIdx}")
    public ModelAndView couponEdit(@PathVariable(name="copIdx") Long copIdx){
        return new ModelAndView("/admin/pages/coupon/coupon_list/coupon_edit");
    }

    @RequestMapping("/coupon/regist") //localhost:10000/admin/coupon/regist
    public ModelAndView couponRegist(){return new ModelAndView("/admin/pages/coupon/coupon_regist/coupon_reg");}

    @RequestMapping("/inquiry/list")
    public ModelAndView inquiryPersonal(){
        return new ModelAndView("/admin/pages/inquiry/personal_inquiry list/personal_inquiry list");
    }

    @RequestMapping("/inquiry/view/{ansIdx}")
    public ModelAndView inquiryInfo(@PathVariable(name="ansIdx") Long ansIdx){
        return new ModelAndView("/admin/pages/inquiry/personal_inquiry list/personal_inquiry_info");
    }


}
package com.project.jejuair.controller.page;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

    @Controller
    @RequestMapping("")   //http://localhost:10000/
    public class PageController {

        @RequestMapping("/admin")
        public ModelAndView admin_index(){
            return new ModelAndView("/admin/pages/index");
        }

        @RequestMapping("/user")
        public ModelAndView user_index(){
            return new ModelAndView("/user/pages/index");
        }

        @RequestMapping("/user/login")
        public ModelAndView user_login(){
            return new ModelAndView("/user/pages/login/login");
        }



    }

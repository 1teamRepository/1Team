package com.project.jejuair.model.network.response;

import lombok.Data;

import java.util.Date;

@Data
public class TbKakaoPay {
    //response
    private String tid, next_redirect_pc_url;
    private Date created_at;



}
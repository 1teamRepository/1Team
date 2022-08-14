package com.project.jejuair.model.network.response;


import lombok.Data;

@Data
public class TbKakaoAmount {

    private Integer total, tax_free, vat, point, discount;
}



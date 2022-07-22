package com.project.jejuair.model.enumclass.Coupon;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum CopType {

    MONEY(0, "금액권", "금액권"),
    DISCOUNT(1, "할인권", "할인권");

    private Integer id;
    private String title;
    private String description;
}

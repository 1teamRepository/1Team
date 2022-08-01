package com.project.jejuair.model.enumclass.payment;


import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum PayStatus {


    COMPLETE(0, "결제 완료", "결제 완료"),
    CANCEL(1,"결제 취소","결제 취소");

    private Integer id;
    private String title;
    private String description;
}


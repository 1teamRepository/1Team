package com.project.jejuair.model.enumclass.reservation;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ResPosition {

    ADULT(0, "성인", "성인"),
    CHILD(1, "소아", "소아"),
    BABY(2, "유아", "유아");

    private Integer id;
    private String title;
    private String description;
}

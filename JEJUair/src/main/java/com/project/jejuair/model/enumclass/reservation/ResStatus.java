package com.project.jejuair.model.enumclass.reservation;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ResStatus {

    DECIDE(0, "확정", "확정"),
    STANDBY(1, "대기", "대기"),
    CANCEL(2,"취소","취소");

    private Integer id;
    private String title;
    private String description;
}

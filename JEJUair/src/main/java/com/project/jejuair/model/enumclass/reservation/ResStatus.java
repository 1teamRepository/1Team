package com.project.jejuair.model.enumclass.reservation;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ResStatus {

    DECIDE(0, "예약 확정", "예약 확정"),
    STANDBY(1, "예약 대기", "예약 대기"),
    CANCEL(2,"예약 취소","예약 취소");

    private Integer id;
    private String title;
    private String description;
}

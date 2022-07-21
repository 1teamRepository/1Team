package com.project.jejuair.model.enumclass.destination;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum DesContinent {

    KOREA(0, "대한민국", "사용"),
    SOUTHEASTASIA(1, "동남아시아", "적립"),
    NORTHEASTASIA(2, "동북아시아", "적립"),
    OCEANIA(3, "대양주", "적립");

    private Integer id;
    private String title;
    private String description;
}

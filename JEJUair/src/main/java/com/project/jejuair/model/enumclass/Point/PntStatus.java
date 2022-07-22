package com.project.jejuair.model.enumclass.Point;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum PntStatus {

    USE(0, "사용", "사용"),
    SAVE(1, "적립", "적립");

    private Integer id;
    private String title;
    private String description;
}

package com.project.jejuair.model.enumclass.lost;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum LostStatus {

    STORAGE(0, "보관", "보관중"),
    FIND(1, "수령", "수령완료"),
    DISUSE(2, "폐기", "폐기");

    private Integer id;
    private String title;
    private String description;
}

package com.project.jejuair.model.enumclass.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Gender {

    MAN(0, "남성", "남성"),
    WOMAN(1, "여성", "여성");

    private Integer id;
    private String title;
    private String description;
}

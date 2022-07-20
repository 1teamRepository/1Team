package com.project.jejuair.model.enumclass.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Consent {

    AGREEMENT(0, "동의", "동의"),
    DISAGREEMENT(1, "비동의", "비동의"),
    NOCHECK(2,"비체크","선택하지 않음");

    private Integer id;
    private String title;
    private String description;
}

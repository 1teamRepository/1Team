package com.project.jejuair.model.enumclass.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum DomesticOverseas {

    DOMESTIC(0, "국내", "국내"),
    OVERSEAS(1, "국외", "국외");

    private Integer id;
    private String title;
    private String description;
}

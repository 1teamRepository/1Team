package com.project.jejuair.model.enumclass.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Check {
    YES(0, "yes", "yes"),
    No(1, "no", "no");

    private Integer id;
    private String title;
    private String description;
}

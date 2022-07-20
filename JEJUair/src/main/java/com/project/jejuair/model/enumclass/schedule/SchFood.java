package com.project.jejuair.model.enumclass.schedule;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum SchFood {
    YES(0, "제공", "기내식 제공"),
    No(1, "미제공", "기내식 미제공");

    private Integer id;
    private String title;
    private String description;
}

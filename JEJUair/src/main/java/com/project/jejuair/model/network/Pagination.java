package com.project.jejuair.model.network;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pagination {
    private Integer totalPages;     //전체 페이지 수
    private Long totalElements;
    private Integer currentPage;    // 현재 페이지
    private Integer currentElements;    // 현재 페이지의 요소
}

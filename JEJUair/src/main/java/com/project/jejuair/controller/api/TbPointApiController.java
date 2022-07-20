package com.project.jejuair.controller.api;


import com.project.jejuair.controller.CrudController;
import com.project.jejuair.model.entity.TbPoint;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.request.TbPointRequest;
import com.project.jejuair.model.network.response.TbPointResponse;
import com.project.jejuair.service.TbPointApiLogicService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/point")
@RequiredArgsConstructor
public class TbPointApiController extends CrudController<TbPointRequest, TbPointResponse, TbPoint> {

    private final TbPointApiLogicService tbPointApiLogicService;

    @Override
    @PostMapping("")
    public Header<TbPointResponse> create(@RequestBody Header<TbPointRequest> request) {
        return tbPointApiLogicService.create(request);
    }

    @Override
    @GetMapping("{idx}")
    public Header<TbPointResponse> read(@PathVariable (name = "idx") Long idx) {
        return tbPointApiLogicService.read(idx);
    }

    @Override
    @PutMapping
    public Header<TbPointResponse> update(@RequestBody Header<TbPointRequest> request) {
        return tbPointApiLogicService.update(request);
    }

    @Override
    @DeleteMapping("{idx}")
    public Header<TbPointResponse> delete(@PathVariable Long idx) {
        return tbPointApiLogicService.delete(idx);
    }

    @GetMapping("")
    public Header<List<TbPointResponse>> findAll(@PageableDefault(sort = {"pntIdx"}, direction = Sort.Direction.DESC) Pageable pageable){
        return tbPointApiLogicService.search(pageable);
    }
}

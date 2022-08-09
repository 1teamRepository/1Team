package com.project.jejuair.controller.api;


import com.project.jejuair.controller.CrudController;
import com.project.jejuair.model.entity.TbLostProperty;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.request.TbLostPropertyRequest;
import com.project.jejuair.model.network.response.TbLostPropertyResponse;
import com.project.jejuair.service.TbLostPropertyApiLogicService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lost_item")
@RequiredArgsConstructor

public class TbLostPropertyApiController extends CrudController<TbLostPropertyRequest, TbLostPropertyResponse, TbLostProperty> {

    private final TbLostPropertyApiLogicService tbLostPropertyApiLogicService;

    @Override
    @PostMapping("")
    public Header<TbLostPropertyResponse> create(@RequestBody Header<TbLostPropertyRequest> request) {
        return tbLostPropertyApiLogicService.create(request);
    }

    @Override
    @GetMapping("{idx}")
    public Header<TbLostPropertyResponse> read(@PathVariable (name = "idx") Long idx) {
        return tbLostPropertyApiLogicService.read(idx);
    }

    @Override
    @PutMapping("")
    public Header<TbLostPropertyResponse> update(@RequestBody Header<TbLostPropertyRequest> request) {
        return tbLostPropertyApiLogicService.update(request);
    }

    @Override
    @DeleteMapping("{idx}")
    public Header<TbLostPropertyResponse> delete(@PathVariable Long idx) {
        return tbLostPropertyApiLogicService.delete(idx);
    }

    @GetMapping("")
    public Header<List<TbLostPropertyResponse>> findAll(@PageableDefault(sort = {"lostIdx"}, direction = Sort.Direction.DESC) Pageable pageable){     //paging할수있는 객체 생성함
        return tbLostPropertyApiLogicService.search(pageable);
    }

    @PostMapping("/search")
    public Header<List<TbLostPropertyResponse>> findByAll(@PageableDefault(sort = {"lostIdx"}, direction = Sort.Direction.DESC) Pageable pageable, @RequestBody Header<TbLostPropertyRequest> request){
        return tbLostPropertyApiLogicService.searchByAll(pageable, request);
    }
}

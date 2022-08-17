package com.project.jejuair.controller.api;


import com.project.jejuair.controller.CrudController;
import com.project.jejuair.model.entity.TbDestination;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.request.TbDestinationRequest;
import com.project.jejuair.model.network.response.TbDestinationResponse;
import com.project.jejuair.service.TbDestinationApiLogicService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/destination")
@RequiredArgsConstructor

public class TbDestinationApiController extends CrudController<TbDestinationRequest, TbDestinationResponse, TbDestination> {

    private final TbDestinationApiLogicService tbDestinationApiLogicService;

    @Override
    @PostMapping("")
    public Header<TbDestinationResponse> create(@RequestBody Header<TbDestinationRequest> request) {
        return tbDestinationApiLogicService.create(request);
    }

    @Override
    @GetMapping("{idx}")
    public Header<TbDestinationResponse> read(@PathVariable (name = "idx") Long idx) {
        return tbDestinationApiLogicService.read(idx);
    }

    @Override
    @PutMapping("")
    public Header<TbDestinationResponse> update(@RequestBody Header<TbDestinationRequest> request) {
        System.out.println("dd");
        return tbDestinationApiLogicService.update(request);
    }

    @Override
    @DeleteMapping("{idx}")
    public Header<TbDestinationResponse> delete(@PathVariable Long idx) {
        return tbDestinationApiLogicService.delete(idx);
    }

    @GetMapping("")
    public Header<List<TbDestinationResponse>> findAll(@PageableDefault(sort = {"desIdx"}, direction = Sort.Direction.DESC) Pageable pageable){     //paging할수있는 객체 생성함
        return tbDestinationApiLogicService.search(pageable);
    }

    @GetMapping("/findList")
    public Header<List<TbDestinationResponse>> findList(@PageableDefault(size = 100, sort = {"desIdx"}, direction = Sort.Direction.DESC) Pageable pageable){     //paging할수있는 객체 생성함
        return tbDestinationApiLogicService.search(pageable);
    }
}

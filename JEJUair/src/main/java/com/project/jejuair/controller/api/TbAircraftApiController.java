package com.project.jejuair.controller.api;


import com.project.jejuair.controller.CrudController;
import com.project.jejuair.model.entity.TbAircraft;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.request.TbAircraftRequest;
import com.project.jejuair.model.network.response.TbAircraftResponse;
import com.project.jejuair.service.TbAircraftApiLogicService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/aircraft")
@RequiredArgsConstructor

public class TbAircraftApiController extends CrudController<TbAircraftRequest, TbAircraftResponse, TbAircraft> {

    private final TbAircraftApiLogicService tbAircraftApiLogicService;

    @Override
    @PostMapping("")
    public Header<TbAircraftResponse> create(@RequestBody Header<TbAircraftRequest> request) {
        return tbAircraftApiLogicService.create(request);
    }

    @Override
    @GetMapping("{idx}")
    public Header<TbAircraftResponse> read(@PathVariable (name = "idx") Long idx) {
        return tbAircraftApiLogicService.read(idx);
    }

    @Override
    @PutMapping("")
    public Header<TbAircraftResponse> update(@RequestBody Header<TbAircraftRequest> request) {
        return tbAircraftApiLogicService.update(request);
    }

    @Override
    @DeleteMapping("{idx}")
    public Header<TbAircraftResponse> delete(@PathVariable Long idx) {
        return tbAircraftApiLogicService.delete(idx);
    }

    @GetMapping("")
    public Header<List<TbAircraftResponse>> findAll(@PageableDefault(sort = {""}, direction = Sort.Direction.DESC) Pageable pageable){     //paging할수있는 객체 생성함
        return tbAircraftApiLogicService.search(pageable);
    }
}

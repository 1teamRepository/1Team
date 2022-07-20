package com.project.jejuair.controller.api;


import com.project.jejuair.controller.CrudController;
import com.project.jejuair.model.entity.TbExtraService;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.request.TbExtraServiceRequest;
import com.project.jejuair.model.network.response.TbExtraServiceResponse;
import com.project.jejuair.service.TbExtraServiceApiLogicService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/extra")
@RequiredArgsConstructor

public class TbExtraServiceApiController extends CrudController<TbExtraServiceRequest, TbExtraServiceResponse, TbExtraService> {


    private final TbExtraServiceApiLogicService tbExtraServiceApiLogicService;

    @Override
    @PostMapping("")
    public Header<TbExtraServiceResponse> create(@RequestBody Header<TbExtraServiceRequest> request) {
        return tbExtraServiceApiLogicService.create(request);
    }

    @Override
    @GetMapping("{idx}")
    public Header<TbExtraServiceResponse> read(@PathVariable(name = "idx") Long idx) {
        return tbExtraServiceApiLogicService.read(idx);
    }

    @Override
    @PutMapping
    public Header<TbExtraServiceResponse> update(@RequestBody Header<TbExtraServiceRequest> request) {
        return tbExtraServiceApiLogicService.update(request);
    }

    @Override
    @DeleteMapping("{idx}")
    public Header<TbExtraServiceResponse> delete(@PathVariable Long idx) {
        return tbExtraServiceApiLogicService.delete(idx);
    }


    @GetMapping("")
    public Header<List<TbExtraServiceResponse>> findAll(@PageableDefault(sort = {"extIdx"}, direction = Sort.Direction.DESC) Pageable pageable){
        return tbExtraServiceApiLogicService.search(pageable);
    }


}

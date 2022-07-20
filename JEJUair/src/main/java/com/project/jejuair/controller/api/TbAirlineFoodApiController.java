package com.project.jejuair.controller.api;


import com.project.jejuair.controller.CrudController;
import com.project.jejuair.model.entity.TbAirlineFood;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.request.TbAirlineFoodRequest;
import com.project.jejuair.model.network.response.TbAirlineFoodResponse;
import com.project.jejuair.service.TbAirlineFoodApiLogicService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Pageable;
import java.util.List;

@RestController
@RequestMapping("/api/food")
@RequiredArgsConstructor

public class TbAirlineFoodApiController extends CrudController<TbAirlineFoodRequest, TbAirlineFoodResponse, TbAirlineFood> {


    private final TbAirlineFoodApiLogicService tbAirlineFoodApiLogicService;

    @Override
    @PostMapping("")
    public Header<TbAirlineFoodResponse> create(@RequestBody Header<TbAirlineFoodRequest> request) {
        return tbAirlineFoodApiLogicService.create(request);
    }

    @Override
    @GetMapping("{idx}")
    public Header<TbAirlineFoodResponse> read(@PathVariable(name = "idx") Long idx) { return tbAirlineFoodApiLogicService.read(idx);}

    @Override
    @PutMapping("")
    public Header<TbAirlineFoodResponse> update(@RequestBody Header<TbAirlineFoodRequest> request) {
        return tbAirlineFoodApiLogicService.update(request);
    }

    @Override
    @DeleteMapping("{idx}")
    public Header<TbAirlineFoodResponse> delete(@PathVariable Long idx) {return tbAirlineFoodApiLogicService.delete(idx);}


    @GetMapping("")
    public Header<List<TbAirlineFoodResponse>> findAll(@PageableDefault(sort = {"foodIdx"}, direction = Sort.Direction.DESC)Pageable pageable){     //paging할수있는 객체 생성함
        return tbAirlineFoodApiLogicService.search(pageable);
    }


}

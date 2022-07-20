package com.project.jejuair.controller.api;


import com.project.jejuair.controller.CrudController;
import com.project.jejuair.model.entity.TbAnswer;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.request.TbAnswerRequest;
import com.project.jejuair.model.network.response.TbAnswerResponse;
import com.project.jejuair.service.TbAnswerApiLogicService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/answer")
@RequiredArgsConstructor
public class TbAnswerApiController extends CrudController<TbAnswerRequest, TbAnswerResponse, TbAnswer> {

    private final TbAnswerApiLogicService tbAnswerApiLogicService;

    @Override
    @PostMapping("")
    public Header<TbAnswerResponse> create(@RequestBody Header<TbAnswerRequest> request) {
        return tbAnswerApiLogicService.create(request);
    }

    @Override
    @GetMapping("{idx}")
    public Header<TbAnswerResponse> read(@PathVariable (name = "idx") Long idx) {
        return tbAnswerApiLogicService.read(idx);
    }

    @Override
    @PutMapping("")
    public Header<TbAnswerResponse> update(@RequestBody Header<TbAnswerRequest> request) {
        return tbAnswerApiLogicService.update(request);
    }

    @Override
    @DeleteMapping("{idx}")
    public Header<TbAnswerResponse> delete(@PathVariable Long idx) {
        return tbAnswerApiLogicService.delete(idx);
    }

    @GetMapping("")
    public Header<List<TbAnswerResponse>> findAll(@PageableDefault(sort = {"ansIdx"}, direction = Sort.Direction.DESC) Pageable pageable){
        return tbAnswerApiLogicService.search(pageable);
    }


}

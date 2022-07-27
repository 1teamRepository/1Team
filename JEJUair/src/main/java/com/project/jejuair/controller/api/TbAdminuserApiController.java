package com.project.jejuair.controller.api;


import com.project.jejuair.controller.CrudController;
import com.project.jejuair.model.entity.TbAdminuser;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.request.TbAdminuserRequest;
import com.project.jejuair.model.network.response.TbAdminuserResponse;
import com.project.jejuair.model.network.response.TbAirlineFoodResponse;
import com.project.jejuair.service.TbAdminuserApiLogicService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/adminuser")
@RequiredArgsConstructor
public class TbAdminuserApiController extends CrudController<TbAdminuserRequest, TbAdminuserResponse, TbAdminuser> {

    private final TbAdminuserApiLogicService tbAdminuserApiLogicService;

    @Override
    @PostMapping("")
    public Header<TbAdminuserResponse> create(@RequestBody Header<TbAdminuserRequest> request) {
        return tbAdminuserApiLogicService.create(request);
    }

    @Override
    @GetMapping("{idx}")
    public Header<TbAdminuserResponse> read(@PathVariable (name = "idx") Long idx) {
        return tbAdminuserApiLogicService.read(idx);
    }

    @Override
    @PutMapping("")
    public Header<TbAdminuserResponse> update(@RequestBody Header<TbAdminuserRequest> request) {
        return tbAdminuserApiLogicService.update(request);
    }

    @Override
    @DeleteMapping("{idx}")
    public Header<TbAdminuserResponse> delete(@PathVariable Long idx) {
        return tbAdminuserApiLogicService.delete(idx);
    }

    @GetMapping("")
    public Header<List<TbAdminuserResponse>> findAll(@PageableDefault(sort = {"admIdx"}, direction = Sort.Direction.DESC) Pageable pageable){     //paging할수있는 객체 생성함
        return tbAdminuserApiLogicService.search(pageable);
    }


}

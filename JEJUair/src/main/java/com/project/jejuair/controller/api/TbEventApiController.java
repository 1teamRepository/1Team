package com.project.jejuair.controller.api;


import com.project.jejuair.controller.CrudController;
import com.project.jejuair.model.entity.TbEvent;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.request.TbEventRequest;
import com.project.jejuair.model.network.response.TbAirlineFoodResponse;
import com.project.jejuair.model.network.response.TbEventResponse;
import com.project.jejuair.service.TbEventApiLogicService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/event")
@RequiredArgsConstructor

public class TbEventApiController extends CrudController<TbEventRequest, TbEventResponse, TbEvent> {

    private final TbEventApiLogicService tbEventApiLogicService;

    @Override
    @PostMapping("/eventOk")
    public Header<TbEventResponse> create(@RequestBody Header<TbEventRequest> request) {
        return tbEventApiLogicService.create(request);
    }

    @PostMapping("")
    public Header<TbEventResponse> create(
            @RequestPart(value = "key") Header<TbEventRequest> request,
            @RequestPart(value = "file", required = false) MultipartFile file)throws IOException {

        String picName = file.getOriginalFilename();
        String picExtension = FilenameUtils.getExtension(picName).toLowerCase();
        FilenameUtils.removeExtension(picName);

        File dstPic;
        String dstPicName;
        String createPicName;
        String picUrl = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\admin\\lib\\images\\upload\\event\\";

        do{
            createPicName = RandomStringUtils.randomAlphabetic(32)+"."+picExtension;
            dstPicName = "/admin/lib/images/upload/event/"+ createPicName;
            dstPic = new File(picUrl + createPicName);
        }while(dstPic.exists());

        dstPic.getParentFile().mkdir();
        file.transferTo(dstPic);

        request.getData().setEvtImg(dstPicName);

        return tbEventApiLogicService.create(request);
    }

    @Override
    @GetMapping("{idx}")
    public Header<TbEventResponse> read(@PathVariable (name = "idx") Long idx) {
        return tbEventApiLogicService.read(idx);
    }

    @Override
    @PutMapping("")
    public Header<TbEventResponse> update(@RequestBody Header<TbEventRequest> request) {
        return tbEventApiLogicService.update(request);
    }

    @Override
    @DeleteMapping("{idx}")
    public Header<TbEventResponse> delete(@PathVariable Long idx) {
        return tbEventApiLogicService.delete(idx);
    }

    @GetMapping("")
    public Header<List<TbEventResponse>> findAll(@PageableDefault(sort = {"evtIdx"}, direction = Sort.Direction.DESC) Pageable pageable){     //paging할수있는 객체 생성함
        return tbEventApiLogicService.search(pageable);
    }

    @GetMapping("/findList")
    public Header<List<TbEventResponse>> findList(@PageableDefault(size = 100, sort = {"evtIdx"}, direction = Sort.Direction.DESC) Pageable pageable){     //paging할수있는 객체 생성함
        return tbEventApiLogicService.search(pageable);
    }
}

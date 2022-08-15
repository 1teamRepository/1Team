package com.project.jejuair.controller.api;


import com.project.jejuair.controller.CrudController;
import com.project.jejuair.model.entity.TbLostProperty;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.request.TbAirlineFoodRequest;
import com.project.jejuair.model.network.request.TbLostPropertyRequest;
import com.project.jejuair.model.network.response.TbAirlineFoodResponse;
import com.project.jejuair.model.network.response.TbLostPropertyResponse;
import com.project.jejuair.service.TbLostPropertyApiLogicService;
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
@RequestMapping("/api/lost_item")
@RequiredArgsConstructor

public class TbLostPropertyApiController extends CrudController<TbLostPropertyRequest, TbLostPropertyResponse, TbLostProperty> {

    private final TbLostPropertyApiLogicService tbLostPropertyApiLogicService;

    @Override
    @PostMapping("/lostOk")
    public Header<TbLostPropertyResponse> create(@RequestPart Header<TbLostPropertyRequest> request) {
        return tbLostPropertyApiLogicService.create(request);
    }


    @PostMapping("")
    public Header<TbLostPropertyResponse> create(
            @RequestPart(value = "key") Header<TbLostPropertyRequest> request,
            @RequestPart(value = "file", required = false) MultipartFile file)throws IOException {

        String picName = file.getOriginalFilename();
        String picExtension = FilenameUtils.getExtension(picName).toLowerCase();
        FilenameUtils.removeExtension(picName);

        File dstPic;
        String dstPicName;
        String createPicName;
        String picUrl = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\admin\\lib\\images\\upload\\lostItem\\";

        do{
            createPicName = RandomStringUtils.randomAlphabetic(32)+"."+picExtension;
            dstPicName = "/admin/lib/images/upload/lostItem/"+ createPicName;
            dstPic = new File(picUrl + createPicName);
        }while(dstPic.exists());

        dstPic.getParentFile().mkdir();
        file.transferTo(dstPic);

        request.getData().setLostImg(dstPicName);

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

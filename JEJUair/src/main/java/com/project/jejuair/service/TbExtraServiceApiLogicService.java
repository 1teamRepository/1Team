package com.project.jejuair.service;

import com.project.jejuair.model.entity.TbExtraService;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.Pagination;
import com.project.jejuair.model.network.request.TbExtraServiceRequest;
import com.project.jejuair.model.network.response.TbExtraServiceResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TbExtraServiceApiLogicService extends BaseService<TbExtraServiceRequest, TbExtraServiceResponse, TbExtraService> {


    private TbExtraServiceResponse response(TbExtraService tbExtraService){
        TbExtraServiceResponse tbExtraServiceResponse = TbExtraServiceResponse.builder()
                .extIdx(tbExtraService.getExtIdx())
                .extServiceType(tbExtraService.getExtServiceType())
                .extServiceDetail(tbExtraService.getExtServiceDetail())
                .extRegDate(tbExtraService.getExtRegDate())
                .extPrice(tbExtraService.getExtPrice())
                .build();
        return tbExtraServiceResponse;
    }

    @Override
    public Header<TbExtraServiceResponse> create(Header<TbExtraServiceRequest> request) {
        TbExtraServiceRequest tbExtraServiceRequest = request.getData();
        TbExtraService tbExtraService = TbExtraService.builder()
                .extIdx(tbExtraServiceRequest.getExtIdx())
                .extServiceType(tbExtraServiceRequest.getExtServiceType())
                .extServiceDetail(tbExtraServiceRequest.getExtServiceDetail())
                .extPrice(tbExtraServiceRequest.getExtPrice())
                .extRegDate(LocalDateTime.now())
                .build();
        TbExtraService newTbExtraService = baseRepository.save(tbExtraService);
        return Header.OK(response(newTbExtraService));
    }

    @Override
    public Header<TbExtraServiceResponse> read(Long extIdx) {
        return baseRepository.findById(extIdx).map(tbExtraService -> response(tbExtraService)).map(Header::OK)
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header<TbExtraServiceResponse> update(Header<TbExtraServiceRequest> request) {
        TbExtraServiceRequest tbExtraServiceRequest = request.getData();
        Optional<TbExtraService> tbExtraService = baseRepository.findById(tbExtraServiceRequest.getExtIdx());

        return tbExtraService.map(
                tbExtraService1 -> {
                    tbExtraService1.setExtServiceType(tbExtraServiceRequest.getExtServiceType());
                    tbExtraService1.setExtServiceDetail(tbExtraServiceRequest.getExtServiceDetail());
                    tbExtraService1.setExtRegDate(tbExtraServiceRequest.getExtRegDate());
                    tbExtraService1.setExtPrice(tbExtraServiceRequest.getExtPrice());
//                    System.out.println(tbExtraService1.getExtServiceDetail());
                    return tbExtraService1;
                }).map(tbExtraService1 -> baseRepository.save(tbExtraService1))
                .map(tbExtraService1 -> response(tbExtraService1))
                .map(Header::OK).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header delete(Long extIdx) {
        Optional<TbExtraService> tbExtraService = baseRepository.findById(extIdx);
        return tbExtraService.map(tbExtraService1 -> {
            baseRepository.delete(tbExtraService1);
            return Header.OK();
        }).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    public Header<List<TbExtraServiceResponse>> search(Pageable pageable){
        Page<TbExtraService> tbExtraService = baseRepository.findAll(pageable);
        List<TbExtraServiceResponse> tbExtraServiceResponseList = tbExtraService.stream().map(
                tbExtraService1 -> response(tbExtraService1)).collect(Collectors.toList());

        Pagination pagination = Pagination.builder()
                .totalPages(tbExtraService.getTotalPages())
                .totalElements(tbExtraService.getTotalElements())
                .currentPage(tbExtraService.getNumber())
                .currentElements(tbExtraService.getNumberOfElements())
                .build();
        return Header.OK(tbExtraServiceResponseList, pagination);
    }

}

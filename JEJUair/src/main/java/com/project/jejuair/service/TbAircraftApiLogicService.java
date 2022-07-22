package com.project.jejuair.service;

import com.project.jejuair.model.entity.TbAircraft;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.Pagination;
import com.project.jejuair.model.network.request.TbAircraftRequest;
import com.project.jejuair.model.network.response.TbAircraftResponse;
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
public class TbAircraftApiLogicService extends BaseService<TbAircraftRequest, TbAircraftResponse, TbAircraft> {

    private TbAircraftResponse response(TbAircraft tbAircraft){
        TbAircraftResponse tbAircraftResponse = TbAircraftResponse.builder()
                .acftIdx(tbAircraft.getAcftIdx())
                .acftAircraftType(tbAircraft.getAcftAircraftType())
                .acftAircraftName(tbAircraft.getAcftAircraftName())
                .acftDomesticOverseas(tbAircraft.getAcftDomesticOverseas())
                .acftBizLiteSeats(tbAircraft.getAcftBizLiteSeats())
                .acftNomalSeats(tbAircraft.getAcftNomalSeats())
                .acftTotalSeats(tbAircraft.getAcftTotalSeats())
                .acftRegDate(tbAircraft.getAcftRegDate())
                .build();
        return tbAircraftResponse;
    }

    @Override
    public Header<TbAircraftResponse> create(Header<TbAircraftRequest> request) {
        TbAircraftRequest tbAircraftRequest = request.getData();
        TbAircraft tbAircraft = TbAircraft.builder()
                .acftAircraftType(tbAircraftRequest.getAcftAircraftType())
                .acftAircraftName(tbAircraftRequest.getAcftAircraftName())
                .acftDomesticOverseas(tbAircraftRequest.getAcftDomesticOverseas())
                .acftBizLiteSeats(tbAircraftRequest.getAcftBizLiteSeats())
                .acftNomalSeats(tbAircraftRequest.getAcftNomalSeats())
                .acftTotalSeats(tbAircraftRequest.getAcftTotalSeats())
                .acftRegDate(LocalDateTime.now())
                .build();
        TbAircraft newTbAircraft = baseRepository.save(tbAircraft);
        return Header.OK(response(newTbAircraft));
    }

    @Override
    public Header<TbAircraftResponse> read(Long acftIdx) {
        return baseRepository.findById(acftIdx).map(tbAircraft -> response(tbAircraft))
                .map(Header::OK).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header<TbAircraftResponse> update(Header<TbAircraftRequest> request) {
        TbAircraftRequest tbAircraftRequest = request.getData();
        Optional<TbAircraft> tbAircraft = baseRepository.findById(tbAircraftRequest.getAcftIdx());
        return tbAircraft.map(
                newTbAircraft -> {
                 newTbAircraft.setAcftAircraftType(tbAircraftRequest.getAcftAircraftType());
                 newTbAircraft.setAcftAircraftName(tbAircraftRequest.getAcftAircraftName());
                 newTbAircraft.setAcftDomesticOverseas(tbAircraftRequest.getAcftDomesticOverseas());
                 newTbAircraft.setAcftBizLiteSeats(tbAircraftRequest.getAcftBizLiteSeats());
                 newTbAircraft.setAcftNomalSeats(tbAircraftRequest.getAcftNomalSeats());
                 newTbAircraft.setAcftTotalSeats(tbAircraftRequest.getAcftTotalSeats());
                 return newTbAircraft;
                }).map(newTbAircraft -> baseRepository.save(newTbAircraft))
                .map(newTbAircraft -> response(newTbAircraft))
                .map(Header::OK).orElseGet(() -> Header.ERROR("데이터 없음"));
                }

    @Override
    public Header delete(Long acftIdx) {
        Optional<TbAircraft> tbAircraft = baseRepository.findById(acftIdx);
        return tbAircraft.map(newTbAircraft -> {
            baseRepository.delete(newTbAircraft);
            return Header.OK();
        }).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    public Header<List<TbAircraftResponse>> search(Pageable pageable){
        Page<TbAircraft> tbAircraft = baseRepository.findAll(pageable);
        List<TbAircraftResponse> tbAircraftResponseList = tbAircraft.stream().map(
                newTbAircraft -> response(newTbAircraft)).collect(Collectors.toList());

        Pagination pagination = Pagination.builder()
                .totalPages(tbAircraft.getTotalPages())
                .totalElements(tbAircraft.getTotalElements())
                .currentPage(tbAircraft.getNumber())
                .currentElements(tbAircraft.getNumberOfElements())
                .build();
        return Header.OK(tbAircraftResponseList, pagination);
    }


}


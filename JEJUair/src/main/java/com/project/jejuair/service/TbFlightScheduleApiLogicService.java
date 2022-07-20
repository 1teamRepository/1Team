package com.project.jejuair.service;


import com.project.jejuair.model.entity.TbFlightSchedule;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.Pagination;
import com.project.jejuair.model.network.request.TbFlightScheduleRequest;
import com.project.jejuair.model.network.response.TbFlightScheduleResponse;
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
public class TbFlightScheduleApiLogicService extends BaseService<TbFlightScheduleRequest, TbFlightScheduleResponse, TbFlightSchedule> {

    private TbFlightScheduleResponse response(TbFlightSchedule tbFlightSchedule){
        TbFlightScheduleResponse tbFlightScheduleResponse = TbFlightScheduleResponse.builder()
                .schAircraftType(tbFlightSchedule.getSchAircraftType())
                .schDomesticOverseas(tbFlightSchedule.getSchDomesticOverseas())
                .schAircraftName(tbFlightSchedule.getSchAircraftName())
                .schDeparture(tbFlightSchedule.getSchDeparture())
                .schArrival(tbFlightSchedule.getSchArrival())
                .schDepartureDate(tbFlightSchedule.getSchDepartureDate())
                .schArrivalDate(tbFlightSchedule.getSchArrivalDate())
                .schArrivalTime(tbFlightSchedule.getSchArrivalTime())
                .schBizLitePrice(tbFlightSchedule.getSchBizLitePrice())
                .schBizLiteDiscount(tbFlightSchedule.getSchBizLiteDiscount())
                .schFlexPrice(tbFlightSchedule.getSchFlexPrice())
                .schFlexDiscount(tbFlightSchedule.getSchFlexDiscount())
                .schFlyBagPrice(tbFlightSchedule.getSchFlyBagPrice())
                .schFlyDiscount(tbFlightSchedule.getSchFlyDiscount())
                .schFlyPrice(tbFlightSchedule.getSchFlyPrice())
                .schFlyDiscount(tbFlightSchedule.getSchFlyDiscount())
                .schFood(tbFlightSchedule.getSchFood())
                .schRegDate(tbFlightSchedule.getSchRegDate())
                .build();
        return tbFlightScheduleResponse;
    }

    @Override
    public Header<TbFlightScheduleResponse> create(Header<TbFlightScheduleRequest> request) {
        TbFlightScheduleRequest tbFlightScheduleRequest = request.getData();
        TbFlightSchedule tbFlightSchedule = TbFlightSchedule.builder()
                .schAircraftType(tbFlightScheduleRequest.getSchAircraftType())
                .schDomesticOverseas(tbFlightScheduleRequest.getSchDomesticOverseas())
                .schAircraftName(tbFlightScheduleRequest.getSchAircraftName())
                .schDeparture(tbFlightScheduleRequest.getSchDeparture())
                .schArrival(tbFlightScheduleRequest.getSchArrival())
                .schDepartureDate(tbFlightScheduleRequest.getSchDepartureDate())
                .schArrivalDate(tbFlightScheduleRequest.getSchArrivalDate())
                .schDepartureTime(tbFlightScheduleRequest.getSchDepartureTime())
                .schArrivalTime(tbFlightScheduleRequest.getSchArrivalTime())
                .schBizLitePrice(tbFlightScheduleRequest.getSchBizLitePrice())
                .schBizLiteDiscount(tbFlightScheduleRequest.getSchBizLiteDiscount())
                .schFlexPrice(tbFlightScheduleRequest.getSchFlexPrice())
                .schFlexDiscount(tbFlightScheduleRequest.getSchFlexDiscount())
                .schFlyBagPrice(tbFlightScheduleRequest.getSchFlyBagPrice())
                .schFlyBagDiscount(tbFlightScheduleRequest.getSchFlyBagDiscount())
                .schFlyPrice(tbFlightScheduleRequest.getSchFlyPrice())
                .schFlyDiscount(tbFlightScheduleRequest.getSchFlyDiscount())
                .schFood(tbFlightScheduleRequest.getSchFood())
                .schRegDate(LocalDateTime.now())
                .build();
        return null;
    }

    @Override
    public Header<TbFlightScheduleResponse> read(Long schIdx) {
        return baseRepository.findById(schIdx).map(tbFlightSchedule -> response(tbFlightSchedule)).map(Header::OK)
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header<TbFlightScheduleResponse> update(Header<TbFlightScheduleRequest> request) {
        TbFlightScheduleRequest tbFlightScheduleRequest = request.getData();
        Optional<TbFlightSchedule> tbFlightSchedule = baseRepository.findById(tbFlightScheduleRequest.getSchIdx());
        return tbFlightSchedule.map(
                tbFlightSchedule1 -> {
                    tbFlightSchedule1.setSchAircraftType(tbFlightScheduleRequest.getSchAircraftType());
                    tbFlightSchedule1.setSchDomesticOverseas(tbFlightScheduleRequest.getSchDomesticOverseas());
                    tbFlightSchedule1.setSchAircraftName(tbFlightScheduleRequest.getSchAircraftName());
                    tbFlightSchedule1.setSchDeparture(tbFlightScheduleRequest.getSchDeparture());
                    tbFlightSchedule1.setSchArrival(tbFlightScheduleRequest.getSchArrival());
                    tbFlightSchedule1.setSchDepartureDate(tbFlightScheduleRequest.getSchDepartureDate());
                    tbFlightSchedule1.setSchArrivalDate(tbFlightScheduleRequest.getSchArrivalDate());
                    tbFlightSchedule1.setSchDepartureTime(tbFlightScheduleRequest.getSchDepartureTime());
                    tbFlightSchedule1.setSchArrivalTime(tbFlightScheduleRequest.getSchArrivalTime());
                    tbFlightSchedule1.setSchBizLitePrice(tbFlightScheduleRequest.getSchBizLitePrice());
                    tbFlightSchedule1.setSchBizLiteDiscount(tbFlightScheduleRequest.getSchBizLiteDiscount());
                    tbFlightSchedule1.setSchFlexPrice(tbFlightScheduleRequest.getSchFlexPrice());
                    tbFlightSchedule1.setSchFlexDiscount(tbFlightScheduleRequest.getSchFlexDiscount());
                    tbFlightSchedule1.setSchFlyBagPrice(tbFlightScheduleRequest.getSchFlyBagPrice());
                    tbFlightSchedule1.setSchFlyBagDiscount(tbFlightScheduleRequest.getSchFlyBagDiscount());
                    tbFlightSchedule1.setSchFood(tbFlightScheduleRequest.getSchFood());
                    return tbFlightSchedule1;
                }).map(tbFlightSchedule1 -> baseRepository.save(tbFlightSchedule1))
                .map(tbFlightSchedule1 -> response(tbFlightSchedule1)).map(Header::OK)
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header delete(Long schIdx) {
        Optional<TbFlightSchedule> tbFlightSchedule = baseRepository.findById(schIdx);
        return tbFlightSchedule.map(tbFlightSchedule1 -> {
            baseRepository.delete(tbFlightSchedule1);
            return Header.OK();
        }).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    public Header<List<TbFlightScheduleResponse>> search(Pageable pageable){
        Page<TbFlightSchedule> tbFlightSchedule = baseRepository.findAll(pageable);
        List<TbFlightScheduleResponse> tbFlightScheduleResponseList = tbFlightSchedule.stream().map(
                tbFlightSchedule1 -> response(tbFlightSchedule1)).collect(Collectors.toList());

        Pagination pagination = Pagination.builder()
                .totalPages(tbFlightSchedule.getTotalPages())
                .totalElements(tbFlightSchedule.getTotalElements())
                .currentPage(tbFlightSchedule.getNumber())
                .currentElements(tbFlightSchedule.getNumberOfElements())
                .build();
        return Header.OK(tbFlightScheduleResponseList, pagination);
    }


}

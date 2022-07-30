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
                .schIdx(tbFlightSchedule.getSchIdx())
                .schAircraftType(tbFlightSchedule.getSchAircraftType())
                .schDomesticOverseas(tbFlightSchedule.getSchDomesticOverseas())
                .schAircraftName(tbFlightSchedule.getSchAircraftName())
                .schDeparture(tbFlightSchedule.getSchDeparture())
                .schArrival(tbFlightSchedule.getSchArrival())
                .schDepartureDate(tbFlightSchedule.getSchDepartureDate())
                .schDepartureTime(tbFlightSchedule.getSchDepartureTime())
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
        TbFlightSchedule newTbflightschedule = baseRepository.save(tbFlightSchedule);
        return Header.OK(response(newTbflightschedule));
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
                newTbFlightSchedule -> {
                    newTbFlightSchedule.setSchAircraftType(tbFlightScheduleRequest.getSchAircraftType());
                    newTbFlightSchedule.setSchDomesticOverseas(tbFlightScheduleRequest.getSchDomesticOverseas());
                    newTbFlightSchedule.setSchAircraftName(tbFlightScheduleRequest.getSchAircraftName());
                    newTbFlightSchedule.setSchDeparture(tbFlightScheduleRequest.getSchDeparture());
                    newTbFlightSchedule.setSchArrival(tbFlightScheduleRequest.getSchArrival());
                    newTbFlightSchedule.setSchDepartureDate(tbFlightScheduleRequest.getSchDepartureDate());
                    newTbFlightSchedule.setSchArrivalDate(tbFlightScheduleRequest.getSchArrivalDate());
                    newTbFlightSchedule.setSchDepartureTime(tbFlightScheduleRequest.getSchDepartureTime());
                    newTbFlightSchedule.setSchArrivalTime(tbFlightScheduleRequest.getSchArrivalTime());
                    newTbFlightSchedule.setSchBizLitePrice(tbFlightScheduleRequest.getSchBizLitePrice());
                    newTbFlightSchedule.setSchBizLiteDiscount(tbFlightScheduleRequest.getSchBizLiteDiscount());
                    newTbFlightSchedule.setSchFlexPrice(tbFlightScheduleRequest.getSchFlexPrice());
                    newTbFlightSchedule.setSchFlexDiscount(tbFlightScheduleRequest.getSchFlexDiscount());
                    newTbFlightSchedule.setSchFlyBagPrice(tbFlightScheduleRequest.getSchFlyBagPrice());
                    newTbFlightSchedule.setSchFlyBagDiscount(tbFlightScheduleRequest.getSchFlyBagDiscount());
                    newTbFlightSchedule.setSchFood(tbFlightScheduleRequest.getSchFood());
                    return newTbFlightSchedule;
                }).map(newTbFlightSchedule -> baseRepository.save(newTbFlightSchedule))
                .map(newTbFlightSchedule -> response(newTbFlightSchedule)).map(Header::OK)
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header delete(Long schIdx) {
        Optional<TbFlightSchedule> tbFlightSchedule = baseRepository.findById(schIdx);
        return tbFlightSchedule.map(newTbFlightSchedule -> {
            baseRepository.delete(newTbFlightSchedule);
            return Header.OK();
        }).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    public Header<List<TbFlightScheduleResponse>> search(Pageable pageable){
        Page<TbFlightSchedule> tbFlightSchedule = baseRepository.findAll(pageable);
        List<TbFlightScheduleResponse> tbFlightScheduleResponseList = tbFlightSchedule.stream().map(
                newTbFlightSchedule -> response(newTbFlightSchedule)).collect(Collectors.toList());

        Pagination pagination = Pagination.builder()
                .totalPages(tbFlightSchedule.getTotalPages())
                .totalElements(tbFlightSchedule.getTotalElements())
                .currentPage(tbFlightSchedule.getNumber())
                .currentElements(tbFlightSchedule.getNumberOfElements())
                .build();
        return Header.OK(tbFlightScheduleResponseList, pagination);
    }


}

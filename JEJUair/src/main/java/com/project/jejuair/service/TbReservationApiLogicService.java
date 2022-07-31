package com.project.jejuair.service;


import com.project.jejuair.ifs.CrudInterface;
import com.project.jejuair.model.entity.TbFlightSchedule;
import com.project.jejuair.model.entity.TbMember;
import com.project.jejuair.model.entity.TbReservation;
import com.project.jejuair.model.enumclass.reservation.ResStatus;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.Pagination;
import com.project.jejuair.model.network.request.TbReservationRequest;
import com.project.jejuair.model.network.response.TbReservationResponse;
import com.project.jejuair.repository.TbFlightScheduleRepository;
import com.project.jejuair.repository.TbMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TbReservationApiLogicService extends BaseService<TbReservationRequest, TbReservationResponse, TbReservation> {

    private final TbMemberRepository tbMemberRepository;
    private final TbFlightScheduleRepository tbFlightScheduleRepository;

    private TbReservationResponse response(TbReservation tbReservation){
        TbReservationResponse tbReservationResponse = TbReservationResponse.builder()
                .resIdx(tbReservation.getResIdx())
                .resStatus(tbReservation.getResStatus())
                .resRegDate(tbReservation.getResRegDate())
                .resRoute(tbReservation.getResRoute())

                .tbMemberMemIdx(tbReservation.getTbMember().getMemIdx())
                .memKoFirstname(tbReservation.getTbMember().getMemKoFirstname())
                .memKoLastname(tbReservation.getTbMember().getMemKoLastname())
                .memHp(tbReservation.getTbMember().getMemHp())
                .memEmail(tbReservation.getTbMember().getMemEmail())

                .tbFlightScheduleSchIdx(tbReservation.getTbFlightSchedule().getSchIdx())
                .schAircraftName(tbReservation.getTbFlightSchedule().getSchAircraftName())
                .schDeparture(tbReservation.getTbFlightSchedule().getSchDeparture())
                .schDepartureDate(tbReservation.getTbFlightSchedule().getSchDepartureDate())
                .schDepartureTime(tbReservation.getTbFlightSchedule().getSchDepartureTime())
                .schArrival(tbReservation.getTbFlightSchedule().getSchArrival())
                .schArrivalDate(tbReservation.getTbFlightSchedule().getSchArrivalDate())
                .schArrivalTime(tbReservation.getTbFlightSchedule().getSchArrivalTime())

                .build();
        return tbReservationResponse;
    }

    @Override
    public Header<TbReservationResponse> create(Header<TbReservationRequest> request) {
        TbReservationRequest tbReservationRequest = request.getData();

        TbReservation tbReservation = TbReservation.builder()
                .resStatus(ResStatus.STANDBY)
                .resRegDate(LocalDateTime.now())
                .resRoute(tbReservationRequest.getResRoute())
                .tbMember(tbMemberRepository.findByMemIdx(tbReservationRequest.getTbMemberMemIdx()).get())
                .tbFlightSchedule(tbFlightScheduleRepository.findBySchIdx(tbReservationRequest.getTbFlightScheduleSchIdx()).get())
                .build();

        TbReservation newTbReservation = baseRepository.save(tbReservation);

        return Header.OK(response(newTbReservation));
    }

    @Override
    public Header<TbReservationResponse> read(Long resIdx) {
        return baseRepository.findById(resIdx).map(tbReservation -> response(tbReservation))
                .map(Header::OK).orElseGet(() -> Header.ERROR("데이터 없음"));
    }
    
    @Override
    public Header<TbReservationResponse> update(Header<TbReservationRequest> request) {
        TbReservationRequest tbReservationRequest = request.getData();
        Optional<TbReservation> tbReservation = baseRepository.findById(tbReservationRequest.getResIdx());
        return tbReservation.map(
                newTbReservation -> {
                    newTbReservation.setResStatus(tbReservationRequest.getResStatus());

                    return newTbReservation;
                }).map(newTbReservation -> baseRepository.save(newTbReservation))
                .map(newTbReservation -> response(newTbReservation)).map(Header::OK).orElseGet(()->Header.ERROR("데이터 없음"));
    }
    
    @Override
    public Header delete(Long resIdx) {
        Optional<TbReservation> tbReservation = baseRepository.findById(resIdx);
        return tbReservation.map(newTbReservation -> {
            baseRepository.delete(newTbReservation);
            return Header.OK();
        }).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    public Header<List<TbReservationResponse>> search(Pageable pageable){
        Page<TbReservation> tbReservation = baseRepository.findAll(pageable);
        List<TbReservationResponse> tbReservationResponseList = tbReservation.stream().map(
                newTbReservation -> response(newTbReservation)).collect(Collectors.toList());

        Pagination pagination = Pagination.builder()
                .totalPages(tbReservation.getTotalPages())
                .totalElements(tbReservation.getTotalElements())
                .currentPage(tbReservation.getNumber())
                .currentElements(tbReservation.getNumberOfElements())
                .build();
        return Header.OK(tbReservationResponseList, pagination);
    }


}

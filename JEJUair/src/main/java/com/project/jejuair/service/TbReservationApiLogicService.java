package com.project.jejuair.service;


import com.project.jejuair.model.entity.TbReservation;
import com.project.jejuair.model.enumclass.reservation.ResStatus;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.Pagination;
import com.project.jejuair.model.network.request.TbReservationRequest;
import com.project.jejuair.model.network.response.TbReservationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TbReservationApiLogicService extends BaseService<TbReservationRequest, TbReservationResponse, TbReservation> {

    private TbReservationResponse response(TbReservation tbReservation){
        TbReservationResponse tbReservationResponse = TbReservationResponse.builder()
                .resIdx(tbReservation.getResIdx())
                .resKoName(tbReservation.getResKoName())
                .resEngName(tbReservation.getResEngName())
                .resEmail(tbReservation.getResEmail())
                .resHp(tbReservation.getResHp())
                .resPosition(tbReservation.getResPosition())
                .resGender(tbReservation.getResGender())
                .resCheckIn(tbReservation.getResCheckIn())
                .resSsn(tbReservation.getResSsn())
                .resStatus(tbReservation.getResStatus())
                .resNationality(tbReservation.getResNationality())
                .resCoupon(tbReservation.getResCoupon())
                .resSeatNum(tbReservation.getResSeatNum())
                .resRegDate(tbReservation.getResRegDate())
                .resMemIdx(tbReservation.getResMemIdx())
                .build();
        return tbReservationResponse;
    }

    @Override
    public Header<TbReservationResponse> create(Header<TbReservationRequest> request) {
        TbReservationRequest tbReservationRequest = request.getData();
        TbReservation tbReservation = TbReservation.builder()
                .resIdx(tbReservationRequest.getResIdx())
                .resEmail(tbReservationRequest.getResEmail())
                .resKoName(tbReservationRequest.getResKoName())
                .resEngName(tbReservationRequest.getResEngName())
                .resHp(tbReservationRequest.getResHp())
                .resPosition(tbReservationRequest.getResPosition())
                .resGender(tbReservationRequest.getResGender())
                .resCheckIn(tbReservationRequest.getResCheckIn())
                .resSsn(tbReservationRequest.getResSsn())
                .resStatus(ResStatus.STANDBY)
                .resNationality(tbReservationRequest.getResNationality())
                .resCoupon(tbReservationRequest.getResCoupon())
                .resSeatNum(tbReservationRequest.getResSeatNum())
                .resRegDate(LocalDateTime.now())
                .resMemIdx(tbReservationRequest.getResMemIdx())
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
                tbReservation1 -> {
                    tbReservation1.setResEmail(tbReservationRequest.getResEmail());
                    tbReservation1.setResKoName(tbReservationRequest.getResKoName());
                    tbReservation1.setResEngName(tbReservationRequest.getResEngName());
                    tbReservation1.setResHp(tbReservationRequest.getResHp());
                    tbReservation1.setResPosition(tbReservationRequest.getResPosition());
                    tbReservation1.setResGender(tbReservationRequest.getResGender());
                    tbReservation1.setResCheckIn(tbReservationRequest.getResCheckIn());
                    tbReservation1.setResSsn(tbReservationRequest.getResSsn());
                    tbReservation1.setResStatus(tbReservationRequest.getResStatus());
                    tbReservation1.setResNationality(tbReservationRequest.getResNationality());
                    tbReservation1.setResCoupon(tbReservationRequest.getResCoupon());
                    tbReservation1.setResSeatNum(tbReservationRequest.getResSeatNum());
                    return tbReservation1;
                }).map(tbReservation1 -> baseRepository.save(tbReservation1))
                .map(tbReservation1 -> response(tbReservation1)).map(Header::OK).orElseGet(()->Header.ERROR("데이터 없음"));
    }

    @Override
    public Header delete(Long resIdx) {
        Optional<TbReservation> tbReservation = baseRepository.findById(resIdx);
        return tbReservation.map(tbReservation1 -> {
            baseRepository.delete(tbReservation1);
            return Header.OK();
        }).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    public Header<List<TbReservationResponse>> search(Pageable pageable){
        Page<TbReservation> tbReservation = baseRepository.findAll(pageable);
        List<TbReservationResponse> tbReservationResponseList = tbReservation.stream().map(
                tbReservation1 -> response(tbReservation1)).collect(Collectors.toList());

        Pagination pagination = Pagination.builder()
                .totalPages(tbReservation.getTotalPages())
                .totalElements(tbReservation.getTotalElements())
                .currentPage(tbReservation.getNumber())
                .currentElements(tbReservation.getNumberOfElements())
                .build();
        return Header.OK(tbReservationResponseList, pagination);
    }


}

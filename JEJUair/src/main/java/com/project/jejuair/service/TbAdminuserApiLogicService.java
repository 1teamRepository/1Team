package com.project.jejuair.service;

import com.project.jejuair.model.entity.TbAdminuser;
import com.project.jejuair.model.enumclass.adminuser.AdmStatus;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.Pagination;
import com.project.jejuair.model.network.request.TbAdminuserRequest;
import com.project.jejuair.model.network.response.TbAdminuserResponse;
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
public class TbAdminuserApiLogicService extends BaseService<TbAdminuserRequest, TbAdminuserResponse, TbAdminuser> {

    private TbAdminuserResponse response(TbAdminuser tbAdminuser){
        TbAdminuserResponse tbAdminuserResponse = TbAdminuserResponse.builder()
                .admIdx(tbAdminuser.getAdmIdx())
                .admAdminId(tbAdminuser.getAdmAdminId())
                .admAdminPw(tbAdminuser.getAdmAdminPw())
                .admEmployee(tbAdminuser.getAdmEmployee())
                .admAdminHp(tbAdminuser.getAdmAdminHp())
                .admDeparture(tbAdminuser.getAdmDeparture())
                .admKorName(tbAdminuser.getAdmKorName())
                .admEngName(tbAdminuser.getAdmEngName())
                .admEmail(tbAdminuser.getAdmEmail())
                .admStatus(tbAdminuser.getAdmStatus())
                .admRegDate(tbAdminuser.getAdmRegDate())
                .build();
        return tbAdminuserResponse;
    }

    @Override
    public Header<TbAdminuserResponse> create(Header<TbAdminuserRequest> request) {
        TbAdminuserRequest tbAdminuserRequest = request.getData();
        TbAdminuser tbAdminuser = TbAdminuser.builder()
                .admAdminId(tbAdminuserRequest.getAdmAdminId())
                .admAdminPw(tbAdminuserRequest.getAdmAdminPw())
                .admEmployee(tbAdminuserRequest.getAdmEmployee())
                .admAdminHp(tbAdminuserRequest.getAdmAdminHp())
                .admDeparture(tbAdminuserRequest.getAdmDeparture())
                .admKorName(tbAdminuserRequest.getAdmKorName())
                .admEngName(tbAdminuserRequest.getAdmEngName())
                .admEmail(tbAdminuserRequest.getAdmEmail())
                .admStatus(AdmStatus.OFFICE)
                .admRegDate(LocalDateTime.now())
                .build();
        TbAdminuser newTbAdminuser = baseRepository.save(tbAdminuser);
        return Header.OK(response(newTbAdminuser));
    }

    @Override
    public Header<TbAdminuserResponse> read(Long admIdx) {
        return baseRepository.findById(admIdx).map(tbAdminuser -> response(tbAdminuser)).map(Header::OK)
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header<TbAdminuserResponse> update(Header<TbAdminuserRequest> request) {
        TbAdminuserRequest tbAdminuserRequest = request.getData();
        Optional<TbAdminuser> tbAdminuser = baseRepository.findById(tbAdminuserRequest.getAdmIdx());

        return tbAdminuser.map(
                newTbAdminuser -> {
                    newTbAdminuser.setAdmAdminId(tbAdminuserRequest.getAdmAdminId());
                    newTbAdminuser.setAdmAdminPw(tbAdminuserRequest.getAdmAdminPw());
                    newTbAdminuser.setAdmEmployee(tbAdminuserRequest.getAdmEmployee());
                    newTbAdminuser.setAdmAdminHp(tbAdminuserRequest.getAdmAdminHp());
                    newTbAdminuser.setAdmDeparture(tbAdminuserRequest.getAdmDeparture());
                    newTbAdminuser.setAdmKorName(tbAdminuserRequest.getAdmEngName());
                    newTbAdminuser.setAdmEngName(tbAdminuserRequest.getAdmEngName());
                    newTbAdminuser.setAdmEmail(tbAdminuserRequest.getAdmEmail());
                    newTbAdminuser.setAdmStatus(tbAdminuserRequest.getAdmStatus());
                    return newTbAdminuser;
                }).map(newTbAdminuser -> baseRepository.save(newTbAdminuser))
                .map(newTbAdminuser -> response(newTbAdminuser))
                .map(Header::OK).orElseGet(() -> Header.ERROR("데이터 없음"));
    }
    @Override
    public Header delete(Long admIdx) {
        Optional<TbAdminuser> tbAdminuser = baseRepository.findById(admIdx);
        return tbAdminuser.map(newTbAdminuser -> {
            baseRepository.delete(newTbAdminuser);
            return Header.OK();
        }).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    public Header<List<TbAdminuserResponse>> search(Pageable pageable){
        //  객체를 리스트 타입으로 변환해서 반환
        Page<TbAdminuser> tbAdminuser = baseRepository.findAll(pageable);
        List<TbAdminuserResponse> tbAdminuserResponseList = tbAdminuser.stream().map(
                newTbAdminuser -> response(newTbAdminuser)).collect(Collectors.toList());
//
        Pagination pagination = Pagination.builder()
                .totalPages(tbAdminuser.getTotalPages())
                .totalElements(tbAdminuser.getTotalElements())
                .currentPage(tbAdminuser.getNumber())
                .currentElements(tbAdminuser.getNumberOfElements())
                .build();
        return Header.OK(tbAdminuserResponseList, pagination);
    }


}

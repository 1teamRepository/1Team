package com.project.jejuair.service;

import com.project.jejuair.model.entity.TbMember;
import com.project.jejuair.model.enumclass.member.MemberStatus;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.Pagination;
import com.project.jejuair.model.network.request.TbMemberRequest;
import com.project.jejuair.model.network.response.TbMemberResponse;
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
public class TbMemberApiLogicService extends BaseService<TbMemberRequest, TbMemberResponse, TbMember>{

    private TbMemberResponse response(TbMember tbMember){
        TbMemberResponse tbMemberResponse = TbMemberResponse.builder()
                .memIdx(tbMember.getMemIdx())
                .memUserid(tbMember.getMemUserid())
                .memUserpw(tbMember.getMemUserpw())
                .memKoLastname(tbMember.getMemKoLastname())
                .memKoFirstname(tbMember.getMemKoFirstname())
                .memEngLastname(tbMember.getMemEngLastname())
                .memEngFirstname(tbMember.getMemEngFirstname())
                .memGender(tbMember.getMemGender())
                .memSsn(tbMember.getMemSsn())
                .memHp(tbMember.getMemHp())
                .memEmail(tbMember.getMemEmail())
                .memMarketing(tbMember.getMemMarketing())
                .memStatus(tbMember.getMemStatus())
                .memRegDate(tbMember.getMemRegDate())
                .memPoint(tbMember.getMemPoint())
                .memSnsPush(tbMember.getMemSnsPush())
                .build();
        return tbMemberResponse;
    }


    @Override
    public Header<TbMemberResponse> create(Header<TbMemberRequest> request) {
        TbMemberRequest tbMemberRequest = request.getData();
        TbMember tbMember = TbMember.builder()
                .memUserid(tbMemberRequest.getMemUserid())
                .memUserpw(tbMemberRequest.getMemUserpw())
                .memKoLastname(tbMemberRequest.getMemKoLastname())
                .memKoFirstname(tbMemberRequest.getMemKoFirstname())
                .memEngLastname(tbMemberRequest.getMemEngLastname())
                .memEngFirstname(tbMemberRequest.getMemEngFirstname())
                .memGender(tbMemberRequest.getMemGender())
                .memSsn(tbMemberRequest.getMemSsn())
                .memHp(tbMemberRequest.getMemHp())
                .memEmail(tbMemberRequest.getMemEmail())
                .memMarketing(tbMemberRequest.getMemMarketing())
                .memStatus(MemberStatus.REGISTERED)
                .memRegDate(LocalDateTime.now())
                .memSnsPush(tbMemberRequest.getMemSnsPush())
                .build();
        TbMember newTbMember = baseRepository.save(tbMember);
        return Header.OK(response(newTbMember));
    }

    @Override
    public Header<TbMemberResponse> read(Long memIdx) {
        return baseRepository.findById(memIdx).map(tbMember -> response(tbMember)).map(Header::OK)
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header<TbMemberResponse> update(Header<TbMemberRequest> request) {
        TbMemberRequest tbMemberRequest = request.getData();
        Optional<TbMember> tbMember = baseRepository.findById(tbMemberRequest.getMemIdx());
        return tbMember.map(
                tbMember1 -> {
                    tbMember1.setMemUserpw(tbMemberRequest.getMemUserpw());
                    tbMember1.setMemKoLastname(tbMemberRequest.getMemKoLastname());
                    tbMember1.setMemKoFirstname(tbMemberRequest.getMemKoFirstname());
                    tbMember1.setMemEngLastname(tbMemberRequest.getMemEngLastname());
                    tbMember1.setMemEngFirstname(tbMemberRequest.getMemEngFirstname());
                    tbMember1.setMemGender(tbMemberRequest.getMemGender());
                    tbMember1.setMemHp(tbMemberRequest.getMemHp());
                    tbMember1.setMemEmail(tbMemberRequest.getMemEmail());
                    System.out.println(tbMemberRequest.getMemEmail() + " 1");
                    tbMember1.setMemMarketing(tbMemberRequest.getMemMarketing());
                    System.out.println(tbMemberRequest.getMemMarketing() + " 2");
                    tbMember1.setMemSnsPush(tbMemberRequest.getMemSnsPush());
                    System.out.println(tbMemberRequest.getMemMarketing() +" 3");
                    return tbMember1;
                }).map(tbMember1 -> baseRepository.save(tbMember1))
                .map(tbMember1 -> response(tbMember1))
                .map(Header::OK).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header delete(Long memIdx) {
        Optional<TbMember> tbMember = baseRepository.findById(memIdx);
        return tbMember.map(tbMember1 -> {
            baseRepository.delete(tbMember1);
            return Header.OK();
        }).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    public Header<List<TbMemberResponse>> search(Pageable pageable){
        Page<TbMember> tbMember = baseRepository.findAll(pageable);
        List<TbMemberResponse> tbMemberResponseList = tbMember.stream().map(
                tbMember1 -> response(tbMember1)).collect(Collectors.toList());

        Pagination pagination = Pagination.builder()
                .totalPages(tbMember.getTotalPages())
                .totalElements(tbMember.getTotalElements())
                .currentPage(tbMember.getNumber())
                .currentElements(tbMember.getNumberOfElements())
                .build();
        return Header.OK(tbMemberResponseList, pagination);
    }

}

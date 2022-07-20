package com.project.jejuair.controller;

import com.project.jejuair.ifs.CrudInterface;
import com.project.jejuair.model.network.Header;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@Component
public abstract class CrudController<Req, Res, Entity> implements CrudInterface<Req, Res> {
    @Override
    @PostMapping("")
    public Header<Res> create(@RequestBody Header<Req> request) {
        return null;
    }

    @Override
    @GetMapping("{idx}")
    public Header<Res> read(@PathVariable Long idx) {
        return null;
    }

    @Override
    @PutMapping
    public Header<Res> update(@RequestBody Header<Req> request) {
        return null;
    }

    @Override
    @DeleteMapping("{idx}")
    public Header<Res> delete(@PathVariable Long idx) {
        return null;
    }
}

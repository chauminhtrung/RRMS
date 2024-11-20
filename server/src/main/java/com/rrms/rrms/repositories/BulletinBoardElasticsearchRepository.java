package com.rrms.rrms.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.rrms.rrms.dto.response.BulletinBoardSearchResponse;

public interface BulletinBoardElasticsearchRepository
        extends ElasticsearchRepository<BulletinBoardSearchResponse, UUID> {

    @Query("{\"match\": {\"address\": {\"query\": \"?0\", \"fuzziness\": \"AUTO\"}}}")
    List<BulletinBoardSearchResponse> findByAddress(String address);
}

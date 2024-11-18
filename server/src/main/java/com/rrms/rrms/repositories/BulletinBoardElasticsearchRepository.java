package com.rrms.rrms.repositories;

import com.rrms.rrms.dto.response.BulletinBoardSearchResponse;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;
import java.util.UUID;

public interface BulletinBoardElasticsearchRepository extends ElasticsearchRepository<BulletinBoardSearchResponse, UUID> {

    @Query("{\"match\": {\"address\": {\"query\": \"?0\", \"fuzziness\": \"AUTO\"}}}")
    List<BulletinBoardSearchResponse> findByAddress(String address);

}



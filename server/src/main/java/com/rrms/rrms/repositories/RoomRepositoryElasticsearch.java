package com.rrms.rrms.repositories;

import com.rrms.rrms.dto.response.RoomSearchResponse;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;
import java.util.UUID;

public interface RoomRepositoryElasticsearch extends ElasticsearchRepository<RoomSearchResponse, UUID> {

    @Query("{\"bool\": {\"must\": {\"match\": {\"motel.address\": \"?0\"}}}}")
    List<RoomSearchResponse> findByAddress(String fieldValue);

    @Query("{\"fuzzy\": {\"motel.address\": {\"value\": \"?0\", \"fuzziness\": \"auto\"}}}")
    List<RoomSearchResponse> findByAddressFuzzy(String address);

}

package com.rrms.rrms.services;

import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.models.Motel;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public interface MotelService {
        public MotelResponse insert(Motel motel);
        public MotelResponse findById(UUID id);
        public List<MotelResponse> findAll();
        public MotelResponse update(UUID id,Motel motel);
        public void delete(UUID id);
}

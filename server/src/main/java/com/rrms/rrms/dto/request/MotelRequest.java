package com.rrms.rrms.dto.request;

import java.util.List;

import com.rrms.rrms.dto.response.MotelServiceResponse;
import com.rrms.rrms.models.Motel;
import com.rrms.rrms.models.TypeRoom;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class MotelRequest {
    String motelName;
    Double area;
    Long averagePrice;
    String address;
    String methodofcreation;
    int maxperson;
    int invoicedate;
    int paymentdeadline;
    TypeRoom typeRoom;
    AccountRequest account;
    List<MotelServiceResponse> motelServices;

    public MotelRequest(Motel motel) {
        this.motelName = motel.getMotelName();
        this.address = motel.getAddress();
        // Ánh xạ các thuộc tính khác của Motel nếu cần
    }
}

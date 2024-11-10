package com.rrms.rrms.models;

<<<<<<< HEAD
=======

import com.rrms.rrms.enums.Gender;
import com.rrms.rrms.enums.Unit;
>>>>>>> 5335406fe75dde3185682a62d41154e3daded24a
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "motel_device")
public class MotelDevice {
    @Id
    @GeneratedValue(generator = "UUID")
    private UUID motel_device_id;
    @ManyToOne
    @JoinColumn(name = "motel_id")
    private Motel motel;

    @Column(columnDefinition = "VARCHAR(255)")
    private String deviceName;
<<<<<<< HEAD
=======
    private String icon;
>>>>>>> 5335406fe75dde3185682a62d41154e3daded24a
    private Double value;
    private Double valueInput;
    private int totalQuantity;
    private int totalUsing;
    private int totalNull;
    private String supplier;
}

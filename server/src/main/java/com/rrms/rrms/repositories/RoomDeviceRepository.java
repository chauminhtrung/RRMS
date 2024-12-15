package com.rrms.rrms.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.MotelDevice;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.models.RoomDevice;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RoomDeviceRepository extends JpaRepository<RoomDevice, UUID> {
    List<RoomDevice> getAllByRoom(Room room);
    RoomDevice findByMotelDevice(MotelDevice motelDevice);
    RoomDevice getRoomDeviceByRoomAndMotelDevice(Room room, MotelDevice motelDevice);

}

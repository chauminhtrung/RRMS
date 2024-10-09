//package com.rrms.rrms.services.servicesImp;
//
//import com.rrms.rrms.models.Heart;
//import com.rrms.rrms.repositories.HeartRepository;
//import com.rrms.rrms.services.IHeart;
//import lombok.AccessLevel;
//import lombok.RequiredArgsConstructor;
//import lombok.experimental.FieldDefaults;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.UUID;
//
//@Service
//@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
//@RequiredArgsConstructor
//public class HeartService implements IHeart {
//
//    final HeartRepository heartRepository;
//
//    @Override
//    public Heart addHeart(Heart heart) {
//        return heartRepository.save(heart);
//    }
//
//    @Override
//    public void removeHeart(UUID heartId) {
//        heartRepository.deleteById(heartId);
//    }
//}

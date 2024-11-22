package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.BulletinBoardReviewsRequest;
import com.rrms.rrms.dto.response.BulletinBoardReviewsResponse;
import com.rrms.rrms.dto.response.RatingHistoryResponse;
import com.rrms.rrms.mapper.BulletinBoardReviewMapper;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.BulletinBoard;
import com.rrms.rrms.models.BulletinBoardReviews;
import com.rrms.rrms.repositories.AccountRepository;
import com.rrms.rrms.repositories.BulletinBoardRepository;
import com.rrms.rrms.repositories.BulletinBoardReviewsRepository;
import com.rrms.rrms.services.servicesImp.BulletinBoardReviewsService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.hibernate.validator.internal.util.Contracts.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BulletinBoardReviewsServiceTest {

    @Mock
    private BulletinBoardReviewsRepository bulletinBoardReviewsRepository;

    @Mock
    private BulletinBoardReviewMapper bulletinBoardReviewMapper;

    @Mock
    private AccountRepository accountRepository;

    @Mock
    private BulletinBoardRepository bulletinBoardRepository;

    @InjectMocks
    private BulletinBoardReviewsService bulletinBoardReviewsService;

    @Test
    void testCreateOrUpdateBulletinBoardReviews_CreateNew() {
        BulletinBoardReviewsRequest request = new BulletinBoardReviewsRequest();
        Account account = new Account();
        BulletinBoard bulletinBoard = new BulletinBoard();
        BulletinBoardReviews bulletinBoardReviews = new BulletinBoardReviews();
        BulletinBoardReviewsResponse bulletinBoardReviewsResponse = new BulletinBoardReviewsResponse();

        when(accountRepository.findByUsername(request.getUsername())).thenReturn(Optional.of(account));
        when(bulletinBoardRepository.findById(request.getBulletinBoardId())).thenReturn(Optional.of(bulletinBoard));
        when(bulletinBoardReviewsRepository.findByAccountAndBulletinBoard(account, bulletinBoard)).thenReturn(Optional.empty());
        when(bulletinBoardReviewMapper.toBulletinBoardReviews(request)).thenReturn(bulletinBoardReviews);
        when(bulletinBoardReviewMapper.toBulletinBoardReviewsResponse(bulletinBoardReviews)).thenReturn(bulletinBoardReviewsResponse);
        when(bulletinBoardReviewsRepository.save(bulletinBoardReviews)).thenReturn(bulletinBoardReviews);

        BulletinBoardReviewsResponse result = bulletinBoardReviewsService.createOrUpdateBulletinBoardReviews(request);

        assertNotNull(result);
        verify(bulletinBoardReviewsRepository, times(1)).save(bulletinBoardReviews);
    }
    
    @Test
    void testGetBulletinBoardReviewsByBulletinBoardIdAndUsername() {
        UUID bulletinBoardId = UUID.randomUUID();
        String username = "testUsername";
        Account account = new Account();
        BulletinBoard bulletinBoard = new BulletinBoard();
        BulletinBoardReviews bulletinBoardReviews = new BulletinBoardReviews();
        BulletinBoardReviewsResponse bulletinBoardReviewsResponse = new BulletinBoardReviewsResponse();

        when(accountRepository.findByUsername(username)).thenReturn(Optional.of(account));
        when(bulletinBoardRepository.findById(bulletinBoardId)).thenReturn(Optional.of(bulletinBoard));
        when(bulletinBoardReviewsRepository.findByBulletinBoardAndAccount(bulletinBoard, account)).thenReturn(bulletinBoardReviews);
        when(bulletinBoardReviewMapper.toBulletinBoardReviewsResponse(bulletinBoardReviews)).thenReturn(bulletinBoardReviewsResponse);

        BulletinBoardReviewsResponse result = bulletinBoardReviewsService.getBulletinBoardReviewsByBulletinBoardIdAndUsername(bulletinBoardId, username);

        assertNotNull(result);
        verify(bulletinBoardReviewsRepository, times(1)).findByBulletinBoardAndAccount(bulletinBoard, account);
    }

    @Test
    void testGetRatingHistoryByBulletinBoardIdAndUsername() {
        String username = "testUsername";
        Account account = new Account();
        BulletinBoardReviews review1 = new BulletinBoardReviews();
        BulletinBoardReviews review2 = new BulletinBoardReviews();
        List<BulletinBoardReviews> reviews = Arrays.asList(review1, review2);
        RatingHistoryResponse ratingHistoryResponse1 = new RatingHistoryResponse();
        RatingHistoryResponse ratingHistoryResponse2 = new RatingHistoryResponse();

        when(accountRepository.findByUsername(username)).thenReturn(Optional.of(account));
        when(bulletinBoardReviewsRepository.findAllByAccount(account)).thenReturn(reviews);
        when(bulletinBoardReviewMapper.toRatingHistoryResponse(review1)).thenReturn(ratingHistoryResponse1);
        when(bulletinBoardReviewMapper.toRatingHistoryResponse(review2)).thenReturn(ratingHistoryResponse2);

        List<RatingHistoryResponse> result = bulletinBoardReviewsService.getRatingHistoryByBulletinBoardIdAndUsername(username);

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(bulletinBoardReviewsRepository, times(1)).findAllByAccount(account);
    }

    @Test
    void testDeleteBulletinBoardReviewsByBulletinBoardReviewsId() {
        UUID bulletinBoardReviewsId = UUID.randomUUID();

        when(bulletinBoardReviewsRepository.deleteBulletinBoardReviewsByBulletinBoardReviewsId(bulletinBoardReviewsId)).thenReturn(1);

        Integer result = bulletinBoardReviewsService.deleteBulletinBoardReviewsByBulletinBoardReviewsId(bulletinBoardReviewsId);

        assertEquals(1, result);
        verify(bulletinBoardReviewsRepository, times(1)).deleteBulletinBoardReviewsByBulletinBoardReviewsId(bulletinBoardReviewsId);
    }


}

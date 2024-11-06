package com.rrms.rrms.services.servicesImp;

import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rrms.rrms.repositories.InvoiceRepository;
import com.rrms.rrms.services.IInvoiceService;

@Service
public class InvoiceService implements IInvoiceService {
    @Autowired
    InvoiceRepository invoiceRepository;

    @Autowired
    private EntityManager entityManager;

    public Double getTotalRoomPrice(String username) {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("GetTotalRoomPriceProcedure");
        query.registerStoredProcedureParameter(1, String.class, ParameterMode.IN);
        query.setParameter(1, username);
        return (Double) query.getSingleResult();
    }

    public Double getTotalServicePrice(String username) {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("GetTotalServicePriceProcedure");
        query.registerStoredProcedureParameter(1, String.class, ParameterMode.IN);
        query.setParameter(1, username);
        return (Double) query.getSingleResult();
    }

    public Double getTotalInvoice(String username) {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("GetTotalInvoiceProcedure");
        query.registerStoredProcedureParameter(1, String.class, ParameterMode.IN);
        query.setParameter(1, username);
        return (Double) query.getSingleResult();
    }
}

package com.rrms.rrms.services.servicesImp;

import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rrms.rrms.repositories.InvoiceRepository;
import com.rrms.rrms.services.IInvoiceService;

@Service
public class InvoiceServiceService implements IInvoiceService {
    @Autowired
    InvoiceRepository invoiceRepository;

    @Autowired
    private EntityManager entityManager;


}

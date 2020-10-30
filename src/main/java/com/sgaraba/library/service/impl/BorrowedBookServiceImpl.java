package com.sgaraba.library.service.impl;

import com.sgaraba.library.service.BorrowedBookService;
import com.sgaraba.library.domain.BorrowedBook;
import com.sgaraba.library.repository.BorrowedBookRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link BorrowedBook}.
 */
@Service
@Transactional
public class BorrowedBookServiceImpl implements BorrowedBookService {

    private final Logger log = LoggerFactory.getLogger(BorrowedBookServiceImpl.class);

    private final BorrowedBookRepository borrowedBookRepository;

    public BorrowedBookServiceImpl(BorrowedBookRepository borrowedBookRepository) {
        this.borrowedBookRepository = borrowedBookRepository;
    }

    @Override
    public BorrowedBook save(BorrowedBook borrowedBook) {
        log.debug("Request to save BorrowedBook : {}", borrowedBook);
        return borrowedBookRepository.save(borrowedBook);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<BorrowedBook> findAll(Pageable pageable) {
        log.debug("Request to get all BorrowedBooks");
        return borrowedBookRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<BorrowedBook> findOne(Long id) {
        log.debug("Request to get BorrowedBook : {}", id);
        return borrowedBookRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete BorrowedBook : {}", id);
        borrowedBookRepository.deleteById(id);
    }
}

package com.example.search;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SearchService {
    private final NoteRepository noteRepository;

    public SearchService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public Note searchNoteById(Long id) {
        return noteRepository.findById(id).orElse(null);
    }
}

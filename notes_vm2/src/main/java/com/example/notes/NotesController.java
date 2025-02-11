package com.example.notes;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/notes")
public class NotesController {

    private final NoteRepository noteRepository;

    public NotesController(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @PostMapping
    public Note createNote(@RequestBody Note note) {
        return noteRepository.save(note);
    }

    @GetMapping("/{id}")
    public Note getNote(@PathVariable Long id) {
        return noteRepository.findById(id).orElse(null);
    }

    @GetMapping
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }
}

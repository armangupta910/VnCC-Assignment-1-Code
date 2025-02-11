package com.example.search;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchController {
    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("/{id}")
    public Note searchNoteById(@PathVariable Long id) {
        return searchService.searchNoteById(id);
    }
}

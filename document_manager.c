#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

// Write (overwrite) a text file
void save_document(const char *filename, const char *content) {
    FILE *file = fopen(filename, "w");
    if (!file) {
        perror("Error opening file for writing");
        return;
    }
    fprintf(file, "%s", content);
    fclose(file);
}

// Read and print a text file to stdout
void import_document(const char *filename) {
    FILE *file = fopen(filename, "r");
    if (!file) {
        perror("Error opening file for reading");
        return;
    }
    char buffer[1024];
    while (fgets(buffer, sizeof(buffer), file)) {
        printf("%s", buffer);
    }
    fclose(file);
}

// General write with mode: append==true uses "a", otherwise "w"
void write_document(const char *filename, const char *content, bool append) {
    const char *mode = append ? "a" : "w";
    FILE *file = fopen(filename, mode);
    if (!file) {
        perror("Error opening file for write_document");
        return;
    }
    fprintf(file, "%s", content);
    fclose(file);
}

// Convenience: append text to a file (creates if missing)
void append_document(const char *filename, const char *content) {
    write_document(filename, content, true);
}

// Save simple CSV from an array of lines (each line already comma-separated)
void save_csv(const char *filename, const char **rows, size_t row_count) {
    FILE *file = fopen(filename, "w");
    if (!file) {
        perror("Error opening CSV file for writing");
        return;
    }
    for (size_t i = 0; i < row_count; ++i) {
        fputs(rows[i], file);
        fputc('\n', file);
    }
    fclose(file);
}

// Example usage (compile with: cc document_manager.c -o docman)
// int main() {
//     save_document("example.txt", "Hello, world!\n");
//     append_document("example.txt", "Another line\n");
//
//     const char *rows[] = {"Name,Score", "Alice,95", "Bob,88"};
//     save_csv("scores.csv", rows, 3);
//
//     import_document("example.txt");
//     return 0;
// }

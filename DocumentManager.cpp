#include <iostream>
#include <fstream>
#include <string>
#include <vector>

// Overwrite file
void saveDocument(const std::string& filename, const std::string& content) {
    std::ofstream file(filename);
    if (!file) {
        std::cerr << "Error opening file for writing: " << filename << std::endl;
        return;
    }
    file << content;
}

// Read and print file
void importDocument(const std::string& filename) {
    std::ifstream file(filename);
    if (!file) {
        std::cerr << "Error opening file for reading: " << filename << std::endl;
        return;
    }
    std::string content((std::istreambuf_iterator<char>(file)), std::istreambuf_iterator<char>());
    std::cout << "Document content:\n" << content << std::endl;
}

// Write with mode: append=true appends; otherwise overwrites
void writeDocument(const std::string& filename, const std::string& content, bool append = false) {
    std::ios_base::openmode mode = std::ios::out;
    if (append) mode |= std::ios::app;
    std::ofstream file(filename, mode);
    if (!file) {
        std::cerr << "Error opening file for writeDocument: " << filename << std::endl;
        return;
    }
    file << content;
}

// Append helper
void appendDocument(const std::string& filename, const std::string& content) {
    writeDocument(filename, content, true);
}

// Save CSV from vector of pre-formatted CSV lines
void saveCSV(const std::string& filename, const std::vector<std::string>& rows) {
    std::ofstream file(filename);
    if (!file) {
        std::cerr << "Error opening CSV file for writing: " << filename << std::endl;
        return;
    }
    for (const auto& row : rows) {
        file << row << '\n';
    }
}

// Example
// int main() {
//     saveDocument("cpp_example.txt", "First line\n");
//     appendDocument("cpp_example.txt", "Appended line\n");
//     saveCSV("table.csv", {"Name,Age", "Alice,30", "Bob,25"});
//     importDocument("cpp_example.txt");
//     return 0;
// }

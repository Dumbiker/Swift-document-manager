import Foundation

func saveDocument(filename: String, content: String) {
    do {
        try content.write(toFile: filename, atomically: true, encoding: .utf8)
    } catch {
        print("Error saving document: \(error)")
    }
}

func importDocument(filename: String) {
    do {
        let content = try String(contentsOfFile: filename, encoding: .utf8)
        print("Document content:\n\(content)")
    } catch {
        print("Error importing document: \(error)")
    }
}

// Write with append option. Creates file if missing.
func writeDocument(filename: String, content: String, append: Bool = false) {
    let url = URL(fileURLWithPath: filename)
    do {
        if append, FileManager.default.fileExists(atPath: filename) {
            let handle = try FileHandle(forWritingTo: url)
            defer { try? handle.close() }
            try handle.seekToEnd()
            if let data = content.data(using: .utf8) {
                try handle.write(contentsOf: data)
            }
        } else {
            try content.write(to: url, atomically: true, encoding: .utf8)
        }
    } catch {
        print("Error writing document: \(error)")
    }
}

func appendDocument(filename: String, content: String) {
    writeDocument(filename: filename, content: content, append: true)
}

// Save simple CSV from an array of strings (each already a CSV line)
func saveCSV(filename: String, rows: [String]) {
    let joined = rows.joined(separator: "\n") + "\n"
    do {
        try joined.write(toFile: filename, atomically: true, encoding: .utf8)
    } catch {
        print("Error saving CSV: \(error)")
    }
}

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
        print("Document content: \(content)")
    } catch {
        print("Error importing document: \(error)")
    }
}

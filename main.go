package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	// Serve static files
	fs := http.FileServer(http.Dir("."))
	http.Handle("/", fs)

	port := "3000"
	fmt.Println("🌈✨ Starting Cute Tic-Tac-Toe Web Server! ✨🌈")
	fmt.Printf("🎮 Game URL: http://localhost:%s 🎮\n", port)
	fmt.Println("💖 Open your browser and enjoy the beautiful game! 💖")
	fmt.Println("🔥 Press Ctrl+C to stop the server 🔥")

	// Try to open browser automatically
	fmt.Println("\n🚀 Starting server...")

	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal("❌ Server failed to start:", err)
	}
}

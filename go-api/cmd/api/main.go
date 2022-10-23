package main

import (
	"fmt"
	"go-api/internal/data"
	"go-api/internal/driver"
	"log"
	"net/http"
	"os"
)

type config struct {
	port int // api server port
}

type application struct {
	config   config
	infoLog  *log.Logger
	errorLog *log.Logger
	models   data.Models
}

func main() {
	var cfg config
	cfg.port = 8081

	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stdout, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)

	dsn := os.Getenv("DSN")
	db, err := driver.ConnectPostgres(dsn)

	if err != nil {
		log.Fatal("Cannot connect to database")
	}
	defer db.SQL.Close()

	app := &application{
		config:   cfg,
		infoLog:  infoLog,
		errorLog: errorLog,
		models:   data.New(db.SQL),
	}

	err = app.serve()

	if err != nil {
		log.Fatal(err)
	}
}

// serve starts the API web server
func (app *application) serve() error {

	app.infoLog.Println(fmt.Sprintf("API Listening at http://localhost:%d", app.config.port))

	srv := &http.Server{
		Addr:    fmt.Sprintf(":%d", app.config.port),
		Handler: app.routes(),
	}

	return srv.ListenAndServe()
}

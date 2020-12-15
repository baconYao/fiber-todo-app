package main

import (
	"fmt"
	"log"
	"os"

	"github.com/urfave/cli/v2"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Todo Schema for Todo item
type Todo struct {
	gorm.Model
	Name   string
	IsDone bool
	Kind   string
}

func main() {
	// Initialize DB
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	// Migrate the schema
	db.AutoMigrate(&Todo{})
	app := &cli.App{
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:    "lang",
				Aliases: []string{"l"},
				Value:   "english",
				Usage:   "Language for the greeting",
			},
			&cli.StringFlag{
				Name:    "config",
				Aliases: []string{"c"},
				Usage:   "Load configuration from `FILE`",
			},
		},
		Commands: []*cli.Command{
			
				Name:    "add",
				Aliases: []string{"a"},
				Usage:   "add a todo task to the list",
				Action: func(c *cli.Context) error {
					db.Create(&Todo{Name: c.Args().First(), IsDone: false, Kind: "Normal"})
					fmt.Println("Add new todo successfully")
					return nil
				},
			},
			{
				Name:    "get",
				Aliases: []string{"g"},
				Usage:   "get all todos",
				Action: func(c *cli.Context) error {
					// fmt.Println("added task: ", c.Args().First())
					var todos []Todo
					db.Find(&todos)

					for i := 0; i < len(todos); i++ {
						fmt.Println("=============")
						fmt.Println("ID:", todos[i].ID)
						fmt.Println("Name:", todos[i].Name)
						fmt.Println("Status:", todos[i].IsDone)
					}
					return nil
				},
			},
			{
				Name:    "done",
				Aliases: []string{"d"},
				Usage:   "mark todo as done",
				Action: func(c *cli.Context) error {
					db.Model(&Todo{}).Where("ID = ?", c.Args().First()).Update("IsDone", "true")
					fmt.Println("Mark todo:", c.Args().First(), " as done successfully")
					return nil
				},
			},
			{
				Name:    "remove",
				Aliases: []string{"r"},
				Usage:   "remove todo",
				Action: func(c *cli.Context) error {
					db.Delete(&Todo{}, c.Args().First())
					fmt.Println("Remove todo:", c.Args().First(), "successfully")
					return nil
				},
			},
		},
	}

	err = app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}

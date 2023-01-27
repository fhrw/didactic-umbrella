package models

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {

	db, err := gorm.Open(sqlite.Open("../data.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&Student{})
	db.AutoMigrate(&Teacher{})
	db.AutoMigrate(&Slot{})
	db.AutoMigrate(&Constraint{})
	db.AutoMigrate(&History{})
	db.AutoMigrate(&Lock{})

	DB = db

}

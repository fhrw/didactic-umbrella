package main

import (
	"github.com/fhrw/timetable-server/models"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	models.ConnectDatabase()

	router.Run("localhost:3000")
}

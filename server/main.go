package main

import (
	"github.com/fhrw/timetable-server/controllers"
	"github.com/fhrw/timetable-server/models"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	models.ConnectDatabase()

	router.POST("/students", controllers.CreateStudent)
	router.GET("/students", controllers.GetAllStudents)

	router.Run("localhost:3000")
}

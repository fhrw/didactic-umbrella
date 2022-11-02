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
	router.GET("/students/:student_id", controllers.GetSingleStudent)
	router.PATCH("/students/:student_id", controllers.UpdateStudent)
	router.DELETE("/students/:student_id", controllers.DeleteSingleStudent)

	router.POST("/teacher", controllers.CreateTeacher)

	router.POST("/constraints", controllers.CreateConstraint)
	router.GET("/constraints", controllers.GetAllConstraints)
	router.DELETE("/constraints/:constraint_id", controllers.DeleteSingleConstraint)

	router.POST("/history", controllers.CreateHistory)
	router.GET("/history/:history_id", controllers.GetAllHistory)
	router.DELETE("/history", controllers.DeleteSingleHistory)

	router.Run("localhost:3000")
}

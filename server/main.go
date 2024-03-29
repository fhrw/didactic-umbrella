package main

import (
	"github.com/fhrw/timetable-server/controllers"
	"github.com/fhrw/timetable-server/models"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	models.ConnectDatabase()

	router.POST("/students", controllers.CreateStudent)
	router.GET("/students", controllers.GetAllStudents)
	router.GET("/students/:student_id", controllers.GetSingleStudent)
	router.PATCH("/students/:student_id", controllers.UpdateStudent)
	router.DELETE("/students/:student_id", controllers.DeleteSingleStudent)
	router.GET("/students/teacher/:teacher_id", controllers.GetTeachersStudents)

	router.POST("/teacher", controllers.CreateTeacher)
	router.GET("/teacher", controllers.GetAllTeachers)
	router.PATCH("/teacher/:teacher_id", controllers.UpdateTeacher)
	router.GET("/teacher/:teacher_id", controllers.GetSingleTeacher)

	router.POST("/constraints", controllers.CreateConstraint)
	router.GET("/constraints", controllers.GetAllConstraints)
	router.DELETE("/constraints/:constraint_id", controllers.DeleteSingleConstraint)
	router.GET("/constraints/:week", controllers.GetWeekConstraints)

	router.POST("/history", controllers.CreateHistory)
	router.GET("/history", controllers.GetAllHistory)
	router.DELETE("/history/:history_id", controllers.DeleteSingleHistory)
	router.GET("/history/:teacher_id", controllers.GetRelevantHistory)

	router.POST("/slot", controllers.CreateSlot)
	router.DELETE("/slot/:slot_id", controllers.DeleteSingleSlot)
	router.GET("/slot", controllers.GetAllSlots)
	router.GET("/slots/:teacher_id/:week", controllers.GetWeekSlots)
	router.GET("/copyprev/:teacher_id/:week", controllers.CopyPrev)

	router.POST("/create-lock", controllers.CreateLock)
	router.POST("/get-locks", controllers.GetLocks)
	router.DELETE("/delete-lock/:lock_id", controllers.DeleteLock)

	router.GET("/timetable/:teacher_id/:week", controllers.CalculateTimetable)

	router.Run("localhost:3000")
}

package controllers

import (
	"net/http"
	"strconv"

	"github.com/fhrw/timetable-server/models"
	"github.com/gin-gonic/gin"
)

func CalculateTimetable(c *gin.Context) {

	teacherId, _ := strconv.Atoi(c.Param("teacher_id"))
	week := c.Param("week")

	var slots []models.Slot
	models.DB.Where(map[string]interface{}{"Teacher_id": teacherId, "Week": week}).Find(&slots)

	var students []models.Student
	models.DB.Where(map[string]interface{}{"Teacher_id": teacherId}).Find(&students)

	c.JSON(http.StatusOK, gin.H{"slots": slots, "students": students})

}

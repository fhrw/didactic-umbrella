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

	allConstraints := []models.Constraint{}
	for _, student := range students {
		var constraints []models.Constraint
		models.DB.Where(map[string]interface{}{"Student_id": student.Student_id, "Week": week}).Find(&constraints)
		for _, c := range constraints {
			allConstraints = append(allConstraints, c)
		}
	}

	c.JSON(http.StatusOK, gin.H{"data": allConstraints})

}

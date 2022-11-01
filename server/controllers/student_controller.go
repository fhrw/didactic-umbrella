package controllers

import (
	"net/http"

	"github.com/fhrw/timetable-server/models"
	"github.com/gin-gonic/gin"
)

type StudentInput struct {
	Teacher_id int    `json:"teacher_id" binding:"required"`
	First_name string `json:"first_name" binding:"required"`
	Last_name  string `json:"last_name" binding:"required"`
	School     string `json:"school" binding:"required"`
}

func CreateStudent(c *gin.Context) {

	var input StudentInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	student := models.Student{Teacher_id: input.Teacher_id, First_name: input.First_name, Last_name: input.Last_name, School: input.School}
	models.DB.Create(&student)

	c.JSON(http.StatusOK, gin.H{"data": student})

}

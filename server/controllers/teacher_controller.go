package controllers

import (
	"net/http"

	"github.com/fhrw/timetable-server/models"
	"github.com/gin-gonic/gin"
)

func CreateTeacher(c *gin.Context) {

	var input models.TeacherInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	teacher := models.Teacher{First_name: input.First_name, Last_name: input.Last_name, School: input.School}
	models.DB.Create(&teacher)

	c.JSON(http.StatusOK, gin.H{"data": teacher})

}

func GetAllTeachers(c *gin.Context) {
	var teachers []models.Teacher

	models.DB.Find(&teachers)

	c.JSON(http.StatusOK, gin.H{"data": teachers})
}

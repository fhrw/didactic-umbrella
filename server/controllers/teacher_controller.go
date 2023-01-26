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

	teacher := models.Teacher{First_name: input.First_name, Last_name: input.Last_name, School: input.School, Term_length: input.Term_length}
	models.DB.Create(&teacher)

	c.JSON(http.StatusOK, gin.H{"data": teacher})

}

func GetAllTeachers(c *gin.Context) {
	var teachers []models.Teacher

	models.DB.Find(&teachers)

	c.JSON(http.StatusOK, gin.H{"data": teachers})
}

func UpdateTeacher(c *gin.Context) {
	var teacher models.Teacher
	if err := models.DB.Where("ID = ?", c.Param("teacher_id")).First(&teacher).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "record not found"})
		return
	}

	var input models.TeacherUpdate
	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updatedTeacher := models.Teacher{First_name: input.First_name, Last_name: input.Last_name, School: input.School, Term_length: input.Term_length}
	models.DB.Model(&teacher).Updates(&updatedTeacher)

	c.JSON(http.StatusOK, gin.H{"data": teacher})
}

func GetSingleTeacher(c *gin.Context) {
	id := c.Param("teacher_id")

	var teacher models.Teacher

	if err := models.DB.Where("ID = ?", id).First(&teacher).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "record not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": teacher})
}

package controllers

import (
	"net/http"

	"github.com/fhrw/timetable-server/models"
	"github.com/gin-gonic/gin"
)

func CreateStudent(c *gin.Context) {

	var input models.StudentInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	student := models.Student{Teacher_id: input.Teacher_id, First_name: input.First_name, Last_name: input.Last_name, School: input.School}
	models.DB.Create(&student)

	c.JSON(http.StatusOK, gin.H{"data": student})

}

func GetAllStudents(c *gin.Context) {

	var students []models.Student

	models.DB.Find(&students)

	c.JSON(http.StatusOK, gin.H{"data": students})

}

func GetSingleStudent(c *gin.Context) {

	var student models.Student

	if err := models.DB.Where("student_id = ?", c.Param("student_id")).First(&student).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "record not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": student})

}

func GetTeachersStudents(c *gin.Context) {
	teacher := c.Param("teacher_id")
	var students []models.Student

	models.DB.Where("teacher_id = ?", teacher).Find(&students)

	c.JSON(http.StatusOK, gin.H{"data": students})
}

func UpdateStudent(c *gin.Context) {

	var student models.Student
	if err := models.DB.Where("student_id = ?", c.Param("student_id")).First(&student).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "record not found"})
		return
	}

	var input models.StudentUpdate

	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updatedStudent := models.Student{Teacher_id: input.Teacher_id, First_name: input.First_name, Last_name: input.Last_name, School: input.School}

	models.DB.Model(&student).Updates(&updatedStudent)
	c.JSON(http.StatusOK, gin.H{"data": student})

}

func DeleteSingleStudent(c *gin.Context) {

	var student models.Student
	if err := models.DB.Where("student_id = ?", c.Param("student_id")).First(&student).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "record not found"})
		return
	}

	models.DB.Delete(&student)
	c.JSON(http.StatusOK, gin.H{"data": "success!"})

}

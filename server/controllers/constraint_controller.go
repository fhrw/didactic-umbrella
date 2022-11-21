package controllers

import (
	"net/http"
	"strconv"

	"github.com/fhrw/timetable-server/models"
	"github.com/gin-gonic/gin"
)

func CreateConstraint(c *gin.Context) {

	var input models.ConstraintInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	constraint := models.Constraint{Student_id: input.Student_id, Week: input.Week, Slot: input.Slot}
	models.DB.Create(&constraint)

	c.JSON(http.StatusOK, gin.H{"data": constraint})

}

func DeleteSingleConstraint(c *gin.Context) {

	var constraint models.Constraint
	target, _ := strconv.Atoi(c.Param("constraint_id"))
	if err := models.DB.Where("constraint_id = ?", target).First(&constraint).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "record not found"})
		return
	}

	models.DB.Delete(&constraint)
	c.JSON(http.StatusOK, gin.H{"data": constraint})

}

func GetAllConstraints(c *gin.Context) {

	var constraints []models.Constraint

	models.DB.Find(&constraints)

	c.JSON(http.StatusOK, gin.H{"data": constraints})

}

func GetWeekConstraints(c *gin.Context) {
	week := c.Param("week")
	var constraints []models.Constraint

	models.DB.Where("week = ?", week).Find(&constraints)

	c.JSON(http.StatusOK, gin.H{"data": constraints})
}

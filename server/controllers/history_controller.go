package controllers

import (
	"net/http"
	"strconv"

	"github.com/fhrw/timetable-server/models"
	"github.com/gin-gonic/gin"
)

func CreateHistory(c *gin.Context) {

	var input models.HistoryInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	history := models.History{Student_id: input.Student_id, Week: input.Week, Slot: input.Slot}
	models.DB.Create(&history)

	c.JSON(http.StatusOK, gin.H{"data": history})

}

func DeleteSingleHistory(c *gin.Context) {

	var history models.History
	target, _ := strconv.Atoi(c.Param("history_id"))
	if err := models.DB.Where("history_id = ?", target).First(&history).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "record not found"})
		return
	}

	models.DB.Delete(&history)
	c.JSON(http.StatusOK, gin.H{"data": "success"})

}

func GetAllHistory(c *gin.Context) {

	var histories []models.History

	models.DB.Find(&histories)

	c.JSON(http.StatusOK, gin.H{"data": histories})

}

func GetPastHistory(c *gin.Context) {
	week := c.Param("week")
	var histories []models.History

	models.DB.Where("week = ?", week).Find(&histories)

	c.JSON(http.StatusOK, gin.H{"data": histories})
}

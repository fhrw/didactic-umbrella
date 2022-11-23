package controllers

import (
	"net/http"
	"strconv"

	"github.com/fhrw/timetable-server/models"
	"github.com/gin-gonic/gin"
)

func CreateSlot(c *gin.Context) {

	var input models.SlotInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	slot := models.Slot{Teacher_id: input.Teacher_id, Week: input.Week, Slot: input.Slot}
	models.DB.Create(&slot)

	c.JSON(http.StatusOK, gin.H{"data": slot})

}

func DeleteSingleSlot(c *gin.Context) {

	var slot models.Slot
	target, _ := strconv.Atoi(c.Param("slot_id"))
	if err := models.DB.Where("slot_id = ?", target).First(&slot).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "record not found"})
		return
	}

	models.DB.Delete(&slot)

	c.JSON(http.StatusOK, gin.H{"data": slot})

}

func GetAllSlots(c *gin.Context) {
	var slots []models.Slot
	models.DB.Find(&slots)
	c.JSON(http.StatusOK, gin.H{"data": slots})
}

func GetWeekSlots(c *gin.Context) {
	teacherId := c.Param("teacher_id")
	week := c.Param("week")

	var slots []models.Slot
	models.DB.Where(map[string]interface{}{"Teacher_id": teacherId, "Week": week}).Find(&slots)

	c.JSON(http.StatusOK, gin.H{"data": slots})
}

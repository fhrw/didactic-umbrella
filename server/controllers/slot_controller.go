package controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/fhrw/timetable-server/models"
	"github.com/gin-gonic/gin"
)

type RequestInfo struct {
	Teacher_id string `json:"teacher_id"`
	Week       int    `json:"week"`
}

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
	target := c.Param("slot_id")
	if err := models.DB.Where("id = ?", target).First(&slot).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
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

func CopyPrev(c *gin.Context) {
	teacherId := c.Param("teacher_id")
	week := c.Param("week")
	weekInt, err := strconv.Atoi(week)
	if err != nil {
		c.JSON(http.StatusBadRequest, nil)
		return
	}
	prev := fmt.Sprint(weekInt - 1)

	var old []models.Slot
	models.DB.Where(map[string]interface{}{"Teacher_id": teacherId, "Week": week}).Find(&old)
	for _, s := range old {
		models.DB.Delete(&s)
	}

	var prevSlots []models.Slot
	models.DB.Where(map[string]interface{}{"Teacher_id": teacherId, "Week": prev}).Find(&prevSlots)

	for _, p := range prevSlots {
		slot := models.Slot{Teacher_id: p.Teacher_id, Week: weekInt, Slot: p.Slot}
		models.DB.Create(&slot)
	}

	var slots []models.Slot
	models.DB.Where(map[string]interface{}{"Teacher_id": teacherId, "Week": week}).Find(&slots)

	c.JSON(http.StatusOK, gin.H{"data": slots})
}

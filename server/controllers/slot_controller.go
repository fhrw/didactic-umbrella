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

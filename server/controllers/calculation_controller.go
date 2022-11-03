package controllers

import (
	"github.com/fhrw/timetable-server/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

func CalculateTimetable(c *gin.Context) {
	teacherId := c.Param("teacher_id")
	week := c.Param("week")

	teachingSlots := models.DB.Where(&Slot{})

}

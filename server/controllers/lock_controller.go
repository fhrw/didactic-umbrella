package controllers

import (
	"go/format"
	"net/http"

	"github.com/fhrw/timetable-server/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type LockRequest struct {
	Teacher_id uuid.UUID `json:"teacher_id" binding:"required"`
	Week       int       `json:"week" binding:"required"`
}

func CreateLock(c *gin.Context) {
	var input models.LockInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	//cleanup old lock for student
	var old []models.Lock
	models.DB.Where("student_id = ?", input.Student_id).Where("week = ?", input.Week).Find(&old)
	models.DB.Delete(&old)

	lock := models.Lock{Student_id: input.Student_id, Week: input.Week, Slot: input.Slot}
	models.DB.Create(&lock)

	c.JSON(http.StatusOK, gin.H{"data": lock})
}

func GetLocks(c *gin.Context) {
	var req LockRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	var students []models.Student
	models.DB.Where("teacher_id = ?", req.Teacher_id).Find(&students)

	var locks []models.Lock
	for _, s := range students {
		var currLock models.Lock
		if err := models.DB.Where("student_id = ?", s.ID).Where("week = ?", req.Week).First(&currLock).Error; err != nil {
			break
		}
		locks = append(locks, currLock)
	}

	c.JSON(http.StatusOK, gin.H{"data": locks})
}

func DeleteLock(c *gin.Context) {
	var lock models.Lock
	if err := models.DB.Where("id = ?", c.Param("lock_id")).First(&lock).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}
	models.DB.Delete(&lock)
	c.JSON(http.StatusOK, gin.H{"data": lock})
}

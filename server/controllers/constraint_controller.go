package controllers

import (
	"net/http"
	"strconv"

	"github.com/fhrw/timetable-server/models"
	"github.com/gin-gonic/gin"
	"sort"
	"strings"
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

	dayMap := SortConsMap(CreateConsMap(constraints))
	sortedConst := ExplodeConsMap(dayMap)

	c.JSON(http.StatusOK, gin.H{"data": sortedConst})

}

func GetWeekConstraints(c *gin.Context) {
	week := c.Param("week")
	var constraints []models.Constraint

	models.DB.Where("week = ?", week).Find(&constraints)

	if len(constraints) < 1 {
		c.JSON(http.StatusOK, gin.H{"data": constraints})
		return
	}

	dayMap := SortConsMap(CreateConsMap(constraints))
	sortedConst := ExplodeConsMap(dayMap)

	c.JSON(http.StatusOK, gin.H{"data": sortedConst})
}

func SortConsArr(arr []models.Constraint) []models.Constraint {
	sort.SliceStable(arr, func(i, j int) bool {
		a := arr[i].Slot[len(arr[i].Slot)-1:]
		b := arr[j].Slot[len(arr[j].Slot)-1:]
		return a < b
	})
	return arr
}

func CreateConsMap(arr []models.Constraint) map[string][]models.Constraint {
	m := make(map[string][]models.Constraint)
	for _, h := range arr {
		key := strings.TrimSpace(h.Slot[:len(h.Slot)-1])
		_, ok := m[key]
		if ok {
			m[key] = append(m[key], h)
		} else {
			m[key] = []models.Constraint{h}
		}
	}
	return m
}

func SortConsMap(consMap map[string][]models.Constraint) map[string][]models.Constraint {
	for _, d := range consMap {
		d = SortConsArr(d)
	}
	return consMap
}

func ExplodeConsMap(m map[string][]models.Constraint) []models.Constraint {
	keys := []string{"monday", "tuesday", "wednesday", "thursday", "friday"}
	var sorted []models.Constraint
	for _, k := range keys {
		for _, v := range m[k] {
			sorted = append(sorted, v)
		}
	}
	return sorted
}

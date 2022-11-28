package controllers

import (
	"fmt"
	"net/http"
	"sort"
	"strconv"
	"strings"

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

func SortDayArr(arr []models.History) []models.History {
	fmt.Println(arr)
	sort.SliceStable(arr, func(i, j int) bool {
		a := arr[i].Slot[len(arr[i].Slot)-1:]
		b := arr[j].Slot[len(arr[j].Slot)-1:]
		return a < b
	})
	fmt.Println(arr)
	return arr
}

func CreateDayMap(arr []models.History) map[string][]models.History {
	m := make(map[string][]models.History)
	for _, h := range arr {
		key := strings.TrimSpace(h.Slot[:len(h.Slot)-1])
		_, ok := m[key]
		if ok {
			m[key] = append(m[key], h)
		} else {
			m[key] = []models.History{h}
		}
	}
	return m
}

func SortDayMap(dayMap map[string][]models.History) map[string][]models.History {
	for _, d := range dayMap {
		d = SortDayArr(d)
	}
	return dayMap
}

func ExplodeDayMap(m map[string][]models.History) []models.History {
	keys := []string{"monday", "tuesday", "wednesday", "thursday", "friday"}
	var sorted []models.History
	for _, k := range keys {
		for _, v := range m[k] {
			sorted = append(sorted, v)
		}
	}
	return sorted
}

func GetPastHistory(c *gin.Context) {
	week := c.Param("week")
	var histories []models.History

	models.DB.Where("week = ?", week).Find(&histories)

	c.JSON(http.StatusOK, gin.H{"data": histories})
}

func GetRelevantHistory(c *gin.Context) {
	teacher := c.Param("teacher_id")
	var allHistory []models.History
	var students []models.Student

	models.DB.Find(&allHistory)
	models.DB.Where("teacher_id = ?", teacher).Find(&students)

	filteredHistory := []models.History{}
	for _, hist := range allHistory {
		for _, stu := range students {
			if hist.Student_id == stu.Student_id {
				filteredHistory = append(filteredHistory, hist)
			}
		}
	}

	c.JSON(http.StatusOK, gin.H{"data": filteredHistory})
}

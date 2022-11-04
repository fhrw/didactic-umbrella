package controllers

import (
	"net/http"
	"strconv"

	"github.com/fhrw/timetable-server/models"
	"github.com/gin-gonic/gin"
)

func CalculateTimetable(c *gin.Context) {

	teacherId, _ := strconv.Atoi(c.Param("teacher_id"))
	week := c.Param("week")

	var slots []models.Slot
	models.DB.Where(map[string]interface{}{"Teacher_id": teacherId, "Week": week}).Find(&slots)

	var students []models.Student
	models.DB.Where(map[string]interface{}{"Teacher_id": teacherId}).Find(&students)

	var allConstraints []models.Constraint
	var history []models.History
	for _, student := range students {
		var constraints []models.Constraint
		models.DB.Where(map[string]interface{}{"Student_id": student.Student_id, "Week": week}).Find(&constraints)
		for _, c := range constraints {
			allConstraints = append(allConstraints, c)
		}
		var currHistory []models.History
		models.DB.Where(map[string]interface{}{"Student_id": student.Student_id}).Find(&currHistory)
		for _, h := range currHistory {
			history = append(history, h)
		}
	}

	constraintMap := makeConstraintsMap(allConstraints)
	histMap := makeHistMap(history)

	// m := [][]int{}
	// for _, student := range students {
	// 	c := constraintMap[student.Student_id]
	// 	h := histMap[student.Student_id]
	// 	weights := createWeights(slots, c, h)
	// 	m = append(m, weights)
	// }

	w := createWeights(slots, constraintMap[1], histMap[1])

	c.JSON(http.StatusOK, gin.H{"data": w})

}

func createWeights(slots []models.Slot, constraints []string, history []string) []int {
	weights := []int{}
	for _, s := range slots {
		score := 0
		if strArrIdx(constraints, s.Slot) != -1 {
			score += 100
		}
		histI := strArrIdx(history, s.Slot)
		histScore := calcHistScore(histI, len(history), 100)
		score += histScore

		weights = append(weights, score)
	}
	return weights
}

func calcHistScore(i int, l int, t int) int {
	if i == -1 {
		return 0
	}
	score := (t / l) * i
	return score
}

func strArrIdx(a []string, s string) int {
	index := -1
	for i, v := range a {
		if v == s {
			return i
		}
	}
	return index
}

func makeConstraintsMap(c []models.Constraint) map[int][]string {

	m := make(map[int][]string)
	for _, v := range c {

		student := v.Student_id
		slot := v.Slot
		_, ok := m[student]
		if !ok {
			m[student] = []string{slot}
		} else {
			m[student] = append(m[student], slot)
		}

	}
	return m

}

func makeHistMap(h []models.History) map[int][]string {

	m := make(map[int][]string)
	for _, v := range h {

		student := v.Student_id
		slot := v.Slot
		_, ok := m[student]
		if !ok {
			m[student] = []string{slot}
		} else {
			m[student] = append(m[student], slot)
		}

	}
	return m

}

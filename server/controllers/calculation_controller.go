package controllers

import (
	"net/http"
	"strconv"

	"github.com/fhrw/hungarian-algolang"
	"github.com/fhrw/timetable-server/models"
	"github.com/gin-gonic/gin"
)

func CalculateTimetable(c *gin.Context) {

	teacherId, _ := strconv.Atoi(c.Param("teacher_id"))
	week := c.Param("week")
	weekInt, err := strconv.Atoi(week)
	if err != nil {
		panic(err)
	}

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

	prevHist := reduceHist(history, weekInt)

	// this could use refactoring
	constraintMap := makeConstraintsMap(allConstraints)
	histMap := makeHistMap(prevHist)

	m := [][]int{}
	for _, student := range students {
		c := constraintMap[student.Student_id]
		h := histMap[student.Student_id]
		weights := createWeights(slots, c, h)
		m = append(m, weights)
	}

	if len(m) != len(m[0]) {
		c.JSON(http.StatusBadRequest, gin.H{"data": history})
		return
	} else {
		solve, err := hungarianAlgolang.Solve(m)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"data": history})
			return
		}

		// modify history to match output
		// create new entries
		var histUpdates []models.HistoryInput
		for i, assign := range solve {
			h := models.HistoryInput{Student_id: students[i].Student_id, Week: weekInt, Slot: slots[assign].Slot}
			histUpdates = append(histUpdates, h)
		}

		// delete old entries for the week involving curr studnets
		for _, h := range history {
			for _, stu := range students {
				if h.Student_id == stu.Student_id && h.Week == weekInt {
					models.DB.Delete(&h)
					break
				}
			}
		}

		// insert new entries
		for _, input := range histUpdates {
			hist := models.History{Student_id: input.Student_id, Week: input.Week, Slot: input.Slot}
			models.DB.Create(&hist)
		}

		// new simple but inefficient solution - get everything from DB again...
		var updatedHistory []models.History
		for _, s := range students {
			var stuHist []models.History
			models.DB.Where(map[string]interface{}{"Student_id": s.Student_id}).Find(&stuHist)
			for _, h := range stuHist {
				updatedHistory = append(updatedHistory, h)
			}
		}

		c.JSON(http.StatusOK, gin.H{"data": updatedHistory, "weights": m})
	}
}

func TestHistoryOrder(c *gin.Context) {
	tId := c.Param("teacher_id")

	var students []models.Student
	models.DB.Where(map[string]interface{}{"Teacher_id": tId}).Find(&students)

	var history []models.History
	for _, s := range students {
		var currHistory []models.History
		models.DB.Where(map[string]interface{}{"Student_id": s.Student_id}).Find(&currHistory)
		for _, h := range currHistory {
			history = append(history, h)
		}
	}

	histMap := makeHistMap(history)

	c.JSON(http.StatusOK, gin.H{"data": histMap})
}

func reduceHist(h []models.History, w int) []models.History {
	var a []models.History
	for _, v := range h {
		if v.Week < w {
			a = append(a, v)
		}
	}
	return a
}

func createWeights(slots []models.Slot, constraints []string, history []string) []int {
	weights := []int{}
	for _, s := range slots {
		score := 0
		if strArrIdx(constraints, s.Slot) != -1 {
			score += 300
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
	// not sure about this calculation...
	score := (t / l) * (i + 1)
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

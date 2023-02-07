package controllers

import (
	"net/http"
	"strconv"

	"github.com/fhrw/hungarian-algolang"
	"github.com/fhrw/timetable-server/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func CalculateTimetable(c *gin.Context) {

	teacherId := c.Param("teacher_id")
	week := c.Param("week")
	weekInt, err := strconv.Atoi(week)
	if err != nil {
		panic(err)
	}

	var allSlots []models.Slot
	models.DB.Where(map[string]interface{}{"Teacher_id": teacherId, "Week": week}).Find(&allSlots)
	var allStudents []models.Student
	models.DB.Where(map[string]interface{}{"Teacher_id": teacherId}).Find(&allStudents)

	var locks []models.Lock
	for _, student := range allStudents {
		var lock models.Lock
		models.DB.Where(map[string]interface{}{"Student_id": student.ID}).Find(&lock)
		locks = append(locks, lock)
	}

	//remove locked slots
	var openSlots []models.Slot
	for _, s := range allSlots {
		var f bool
		for _, l := range locks {
			if l.Slot == s.Slot {
				f = true
				break
			}
		}
		if !f {
			openSlots = append(openSlots, s)
		}
	}

	var unlockedStudents []models.Student
	for _, student := range allStudents {
		var found bool
		for _, lock := range locks {
			if lock.Student_id == student.ID {
				found = true
				break
			}
		}
		if !found {
			unlockedStudents = append(unlockedStudents, student)
		}
	}

	var history []models.History
	for _, s := range allStudents {
		var currHistory []models.History
		models.DB.Where(map[string]interface{}{"Student_id": s.ID}).Find(&currHistory)
		for _, h := range currHistory {
			history = append(history, h)
		}
	}

	var allConstraints []models.Constraint
	for _, student := range unlockedStudents {
		var constraints []models.Constraint
		models.DB.Where(map[string]interface{}{"Student_id": student.ID, "Week": week}).Find(&constraints)
		for _, c := range constraints {
			allConstraints = append(allConstraints, c)
		}
		var currHistory []models.History
		models.DB.Where(map[string]interface{}{"Student_id": student.ID}).Find(&currHistory)
		for _, h := range currHistory {
			history = append(history, h)
		}
	}

	prevHist := reduceHist(history, weekInt)

	// this could use refactoring
	constraintMap := makeConstraintsMap(allConstraints)
	histMap := makeHistMap(prevHist)

	m := [][]int{}
	for _, student := range unlockedStudents {
		c := constraintMap[student.ID]
		h := histMap[student.ID]
		weights := createWeights(openSlots, c, h)
		m = append(m, weights)
	}

	if len(m) != len(m[0]) {
		c.JSON(http.StatusBadRequest, gin.H{"data": history})
		return
	}

	solve, err := hungarianAlgolang.Solve(m)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"data": history})
		return
	}

	// create new entries
	var histUpdates []models.HistoryInput
	for i, assign := range solve {
		h := models.HistoryInput{Student_id: unlockedStudents[i].ID, Week: weekInt, Slot: openSlots[assign].Slot}
		histUpdates = append(histUpdates, h)
	}

	for _, l := range locks {
		h := models.HistoryInput{Student_id: l.Student_id, Week: l.Week, Slot: l.Slot}
		histUpdates = append(histUpdates, h)
	}

	// delete old entries for the week involving curr studnets
	for _, h := range history {
		for _, stu := range allStudents {
			if h.Student_id == stu.ID && h.Week == weekInt {
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
	for _, s := range allStudents {
		var stuHist []models.History
		models.DB.Where(map[string]interface{}{"Student_id": s.ID}).Find(&stuHist)
		for _, h := range stuHist {
			updatedHistory = append(updatedHistory, h)
		}
	}

	dayMap := SortDayMap(CreateDayMap(updatedHistory))
	sortedHist := ExplodeDayMap(dayMap)

	c.JSON(http.StatusOK, gin.H{"data": sortedHist, "weights": m})
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

func makeConstraintsMap(c []models.Constraint) map[uuid.UUID][]string {

	m := make(map[uuid.UUID][]string)
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

func makeHistMap(h []models.History) map[uuid.UUID][]string {

	m := make(map[uuid.UUID][]string)
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

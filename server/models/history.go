package models

type History struct {
	History_id int    `json:"history_id" gorm:"primaryKey"`
	Student_id int    `json:"student_id"`
	Week       int    `json:"week"`
	Slot       string `json:"slot"`
}

type HistoryInput struct {
	Student_id int    `json:"student_id" binding:"required"`
	Week       int    `json:"week" binding:"required"`
	Slot       string `json:"slot" binding:"required"`
}

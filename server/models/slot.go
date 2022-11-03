package models

type Slot struct {
	Slot_id    int    `json:"slot_id" gorm:"primaryKey"`
	Teacher_id int    `json:"teacher_id"`
	Week       int    `json:"week"`
	Slot       string `json:"slot"`
}

type SlotInput struct {
	Teacher_id int    `json:"teacher_id" binding:"required"`
	Week       int    `json:"week" binding:"required"`
	Slot       string `json:"slot" binding:"required"`
}

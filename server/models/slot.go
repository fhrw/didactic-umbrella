package models

import "github.com/google/uuid"

type Slot struct {
	Base
	Teacher_id uuid.UUID `json:"teacher_id"`
	Week       int       `json:"week"`
	Slot       string    `json:"slot"`
}

type SlotInput struct {
	Teacher_id uuid.UUID `json:"teacher_id" binding:"required"`
	Week       int       `json:"week" binding:"required"`
	Slot       string    `json:"slot" binding:"required"`
}

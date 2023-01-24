package models

import "github.com/google/uuid"

type Constraint struct {
	Base
	Student_id uuid.UUID `json:"student_id"`
	Week       int       `json:"week"`
	Slot       string    `json:"slot"`
}

type ConstraintInput struct {
	Student_id uuid.UUID `json:"student_id" binding:"required"`
	Week       int       `json:"week" binding:"required"`
	Slot       string    `json:"slot" binding:"required"`
}

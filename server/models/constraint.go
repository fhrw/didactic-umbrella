package models

type Constraint struct {
	Constraint_id int    `json:"constraint_id" gorm:"primaryKey"`
	Student_id    int    `json:"student_id"`
	Week          int    `json: "week"`
	Slot          string `json: "slot"`
}

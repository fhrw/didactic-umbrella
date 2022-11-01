package models

type Student struct {
	Student_id int    `json:"student_id" gorm:"primaryKey"`
	Teacher_id int    `json:"teacher_id"`
	First_name string `json:"first_name"`
	Last_name  string `json:"last_name"`
	School     string `json:"school"`
}

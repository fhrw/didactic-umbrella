package models

type Student struct {
	Student_id int    `json:"student_id" gorm:"primaryKey"`
	Teacher_id int    `json:"teacher_id"`
	First_name string `json:"first_name"`
	Last_name  string `json:"last_name"`
	School     string `json:"school"`
}

type StudentInput struct {
	Teacher_id int    `json:"teacher_id" binding:"required"`
	First_name string `json:"first_name" binding:"required"`
	Last_name  string `json:"last_name" binding:"required"`
	School     string `json:"school" binding:"required"`
}

type StudentUpdate struct {
	Teacher_id int    `json:"teacher_id"`
	First_name string `json:"first_name"`
	Last_name  string `json:"last_name"`
	School     string `json:"school"`
}

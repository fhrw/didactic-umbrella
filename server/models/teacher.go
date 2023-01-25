package models

type Teacher struct {
	Base
	First_name string `json:"first_name"`
	Last_name  string `json:"last_name"`
	School     string `json:"school"`
}

type TeacherInput struct {
	First_name string `json:"first_name" binding:"required"`
	Last_name  string `json:"last_name" binding:"required"`
	School     string `json:"school" binding:"required"`
}

type TeacherUpdate struct {
	First_name string `json:"first_name"`
	Last_name  string `json:"last_name"`
	School     string `json:"school"`
}

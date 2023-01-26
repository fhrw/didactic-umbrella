package controllers

import (
	"github.com/fhrw/timetable-server/models"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestCreateDayMap(t *testing.T) {
	t.Parallel()
	tests := []struct {
		desc  string
		input []models.History
		want  map[string][]models.History
	}{
		{
			desc:  "empty should return empty map",
			input: []models.History{},
			want:  map[string][]models.History{},
		},
	}

	for _, test := range tests {
		test := test

		t.Run(test.desc, func(t *testing.T) {
			t.Parallel()
			got := CreateDayMap(test.input)
			require.Equal(t, test.want, got)
		})

	}
}

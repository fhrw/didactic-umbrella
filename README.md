# Automatic Lesson Timetabler

## What is this all about?

This little app is designed to automate the process of scheduling music lessons! In theory, this app could save hours and hours for music teachers every week! The problem they face, is that students are not supposed to miss the same class over and over. So the conventional wisdom is to rotate the students through the available lesson slots and thus minimize the missing of the same class week in and week out.

THERE'S A BIG PROBLEM WITH THIS!

The history aspect is only one of two aspects a teacher has to juggle. The other aspect is that there are constraints imposed by each individual student's schedule. Here I'm referring to activities that the student might be beholden to attend - like the school athletics carnival or a dental appointment, or how about an important maths exam?! It is clear that these activities have no consideration for the simple rotational timetable and as such leave the teacher to attempt as best they can to patch the two opposing ideas together! Needless to say the result is quite a tedious and error-prone process for the poor teachers.

## So is there a better way?

The good news is yes! And this little program, although far from perfect, hopefully shows a glimspe of something better! It is somewhat primitive at the moment and still requires the teacher to input in the various constraints that effect each student. There is so much scope to speed up this procedure - perhaps constraints could be applied by administrative staff for things like school excursions etc. And perhaps the students could have a portal so that they could enter in constraints as they come up! But once the constraints are in however, creating the perfect timetable can happen in almost an instant!

## The Hungarian bit...

The Hungarian algorithm is the secret to this magic. By creating a 'score' for each student in each prospective slot, we can make a matrix. The worse the slot is for the student, the higher the score will be. Therefore, by picking the lowest total score from the matrix we can get the best overall timetable! Remember we can only assign one student to each lesson.

```org
|           | Lesson 1 | Lesson 2 | Lesson 3 | Lesson 4 |
| Student 1 |      100 |        0 |      200 |      400 |
| Student 2 |        0 |        0 |      100 |      100 |
| Student 3 |      200 |      100 |        0 |      300 |
| Student 4 |      200 |        0 |        0 |      100 |
```

Now on a contrived timetable of this small scale, the answer is fairly obvious just by eye-balling... You could assign like this:

    {
        Lesson 1: Student 2 (0),
        Lesson 2: Student 1 (0),
        Lesson 3: Student 3 (0),
        Lesson 4: Student 4 (100)
    }

This would get the minimum score of 100! But imagine if you had 10 students, or how about closer to 30 (like a full time teaching schedule)! It would be very difficult to do by eye. Fortunately the Hungarian Algorithm does exactly this. I won't go into the exact details here, but I implemented the Hungarian Algorithm myself for this project and learnt an awful lot along the way! Safe to say it works wonderfully for the task!

## Sounds AMAZING! Are there any drawbacks?

It's unfortunately not all completely amazing. The major drawback of this approach is that all the lessons become inter-related. In other words, if someone updates their constraints, this will likely affect the scheduling of every other person! In my computer world, this is no problem. But in real life this might cause some headaches (not to mention some last minute emails...). One approach to remedy this could be to use the tooling to generate the timetable and then if last minute things come in, the teacher can attempt to remedy them manually. This doesn't rule out a future implementation that can handle this kind of scenario.
